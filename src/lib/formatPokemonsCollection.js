const formatPokemonsCollection = (pokemons) => {
  return pokemons.reduce((acc, pockemon) => {
    if (acc && pockemon) {
      acc.push({
        id: pockemon.id,
        name: pockemon.name.english,
        type: {
          main_type: pockemon.type[0],
          sub_type: pockemon.type[1] || null,
        },
        base: {
          HP: pockemon.base.HP,
          Attack: pockemon.base.Attack,
          Defense: pockemon.base.Defense,
          Speed: pockemon.base.Speed,
        },

        description: pockemon.description,
        species: pockemon.species,
        img: pockemon.image.hires,
      });
    }

    return acc;
  }, []);
};

const formatSinglePokemon = (pockemon) => {
  if (!pockemon) {
    return;
  }

  return {
    id: pockemon.id,
    name: pockemon.name.english,
    type: {
      main_type: pockemon.type[0],
      sub_type: pockemon.type[1] || null,
    },
    base: {
      HP: pockemon.base.HP,
      Attack: pockemon.base.Attack,
      Defense: pockemon.base.Defense,
      Speed: pockemon.base.Speed,
    },

    description: pockemon.description,
    species: pockemon.species,
    img: pockemon.image.hires,
  };
};
module.exports = { formatPokemonsCollection, formatSinglePokemon };
