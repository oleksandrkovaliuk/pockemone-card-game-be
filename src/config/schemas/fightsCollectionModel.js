const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionSchema = new Schema({
  type: { type: String, required: true },
  time: { type: Date, default: Date.now },
  damage: { type: Number, required: true },
  fromPokemon: { type: String, required: true },
  toPokemon: { type: String, required: true },
  by: { type: String, required: true },
});

const pokemonSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  type: {
    main_type: { type: String, required: true },
    sub_type: { type: String, default: null },
  },
  base: {
    HP: { type: Number, required: true },
    Attack: { type: Number, required: true },
    Defense: { type: Number, required: true },
    Speed: { type: Number, required: true },
  },
  description: { type: String, required: true },
  species: { type: String, required: true },
  img: { type: String, required: true },
});

const fightSchema = new Schema({
  userPokemon: { type: pokemonSchema, required: true },
  generatedPokemon: { type: pokemonSchema, required: true },
  actions: { type: [actionSchema], required: false },
  fightStatus: { type: String, required: true },
  winner: { type: String, required: false },
  whosTurn: { type: String, required: true },
});

const Fight = mongoose.model("Fight", fightSchema);

module.exports = Fight;
