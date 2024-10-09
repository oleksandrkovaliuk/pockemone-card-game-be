const Fight = require("../../config/schemas/fightsCollectionModel");

const calculateDamage = require("../../lib/calculateDamage");

const fightAction = async (attacker, attacked, fightId, socket, io) => {
  try {
    const current_fight = await Fight.findById(fightId);
    if (!current_fight) {
      return socket.emit("error", { message: "Fight not found" });
    }

    const randomFactor = Math.random();

    const power =
      ((current_fight[attacker].base.Attack /
        current_fight[attacked].base.Defense) *
        current_fight[attacker].base.Speed) /
      2;

    const damage = calculateDamage(
      current_fight[attacker].base.HP,
      power,
      current_fight[attacker].base.Attack,
      current_fight[attacker].base.Defense,
      randomFactor
    );

    if (damage === 0) {
      return socket.emit("attack_approved", {
        attacked: attacked,
        miss: true,
      });
    }

    current_fight[attacked].base.HP -= damage;

    if (current_fight[attacked].base.HP <= 0) {
      current_fight[attacked].base.HP = 0;
      current_fight.fightStatus = "finished";
      current_fight.winner = attacker;
    }

    const action = {
      type: "attacked",
      damage,
      fromPokemon: current_fight[attacker].name,
      toPokemon: current_fight[attacked].name,
      by: attacker,
      time: new Date(),
    };

    current_fight.actions.push(action);
    current_fight.whosTurn =
      current_fight[attacked].name === "userPokemon"
        ? "userPokemon"
        : "generatedPokemon";
    await current_fight.save();

    return io.emit("attack_approved", {
      attacked: attacked,
      miss: false,
    });
  } catch (error) {
    console.error("Error processing attack:", error);
    socket.emit("error", { message: "Internal Server Error" });
  }
};

module.exports = fightAction;
