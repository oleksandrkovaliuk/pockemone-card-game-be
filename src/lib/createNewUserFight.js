const Fight = require("../config/schemas/fightsCollectionModel");

const createNewUserFight = async (userPokemon, generatedPokemon) => {
  const newFight = await Fight.create({
    userPokemon: userPokemon,
    generatedPokemon: generatedPokemon,
    fightStatus: "In progress",
    whosTurn:
      userPokemon.base.Speed > generatedPokemon.base.Speed
        ? "userPokemon"
        : "generatedPokemon",
  });

  await newFight.save();
  return newFight;
};

module.exports = createNewUserFight;
