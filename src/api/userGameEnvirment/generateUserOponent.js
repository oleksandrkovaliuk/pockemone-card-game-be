const Pokemon = require("../../config/schemas/pokemonCollectionModel");

const {
  formatPokemonsCollection,
} = require("../../lib/formatPokemonsCollection");
const { typeWeaknesses } = require("../../lib/weaknessType");

const generateUserOponent = async (req, res) => {
  const { userSelection } = req.body;
  try {
    const weaknesses = typeWeaknesses[userSelection.type.main_type] || [];

    if (!weaknesses.length) {
      return res
        .status(400)
        .json({ message: "No weaknesses found for this type" });
    }

    const pokemons = await Pokemon.find({
      "type.0": { $in: weaknesses },
    });

    const formattedPokemon = formatPokemonsCollection(pokemons);

    const randomPokemonBasedOnWeakness =
      formattedPokemon[Math.floor(Math.random() * formattedPokemon.length)];

    if (!formattedPokemon) {
      return res
        .status(400)
        .json({ message: "No pokemons found for this type" });
    }

    return res.status(200).json(randomPokemonBasedOnWeakness);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = generateUserOponent;
