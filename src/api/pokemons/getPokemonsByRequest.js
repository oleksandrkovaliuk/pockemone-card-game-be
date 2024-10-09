const Pokemon = require("../../config/schemas/pokemonCollectionModel");

const {
  formatPokemonsCollection,
} = require("../../lib/formatPokemonsCollection");

const getPokemonsByRequest = async (req, res) => {
  const params = req.query;
  try {
    const pokemons = await Pokemon.find();

    const formattedPokemonsCollection = formatPokemonsCollection(pokemons);

    const filteredPokemons =
      params.searched_name === ""
        ? formattedPokemonsCollection.splice(
            0,
            JSON.parse(params.limit || "10")
          )
        : formattedPokemonsCollection.filter((pockemon) =>
            pockemon.name
              .toLowerCase()
              .startsWith(params.searched_name.toLowerCase())
          );

    if (!filteredPokemons.length) {
      return res.status(404).json("No pockemons found");
    }

    return res.status(200).json(filteredPokemons);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = getPokemonsByRequest;
