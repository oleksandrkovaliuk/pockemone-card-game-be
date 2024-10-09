const mongoose = require("mongoose");

// Define the schema for the Pokémon model
const pokemonSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  id: { type: Number, required: true },
  name: {
    english: { type: String, required: true },
    japanese: { type: String, required: true },
    chinese: { type: String, required: true },
    french: { type: String, required: true },
  },
  type: [{ type: String, required: true }],
  base: {
    HP: { type: Number, required: true },
    Attack: { type: Number, required: true },
    Defense: { type: Number, required: true },
    "Sp. Attack": { type: Number, required: true },
    "Sp. Defense": { type: Number, required: true },
    Speed: { type: Number, required: true },
  },
  description: { type: String, required: true },
  species: { type: String, required: true },

  evolution: {
    next: [
      {
        id: { type: String, required: true },
        condition: { type: String, required: true },
      },
    ],
  },
  profile: {
    height: { type: String, required: true },
    weight: { type: String, required: true },
  },
  egg: [{ type: String, required: true }],
  ability: [
    {
      name: { type: String, required: true },
      hidden: { type: Boolean, required: true },
    },
  ],
  gender: { type: String, required: true },
  image: {
    sprite: { type: String, required: true },
    thumbnail: { type: String, required: true },
    hires: { type: String, required: true },
  },
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
