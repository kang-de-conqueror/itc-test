import axios from 'axios';
import { Pokemon } from '../types/pokemon.type';

export const fetchPokemon = async (
  selectedTypes: string[],
  page: number,
  limit: number
): Promise<Pokemon[]> => {
  const offset = (page - 1) * limit;

  try {
    if (selectedTypes.length > 0) {
      const requests = selectedTypes.map((type) =>
        axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      );
      const responses = await Promise.all(requests);

      const allPokemonByType = responses.map((response) =>
        response.data?.pokemon.map((p: any) => p.pokemon) ?? []
      );

      const filteredPokemon =
        selectedTypes.length > 1
          ? allPokemonByType.reduce((common, typePokemon) =>
              common.filter((pokemon: Pokemon) =>
                typePokemon.some((p: Pokemon) => p.name === pokemon.name)
              )
            )
          : allPokemonByType[0];

      const paginatedPokemon = filteredPokemon.slice(offset, offset + limit);

      return await Promise.all(
        paginatedPokemon.map(async (pokemon: Pokemon) => {
          if (!pokemon.url) return { name: pokemon.name, url: '', image: '' };

          const pokemonDetail = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            url: pokemon.url,
            image: pokemonDetail.data?.sprites?.front_default || '',
          };
        })
      );
    }

    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: { limit, offset },
    });
    const fetchedPokemon = data?.results || [];

    return await Promise.all(
      fetchedPokemon.map(async (pokemon: Pokemon) => {
        if (!pokemon.url) return { name: pokemon.name, url: '', image: '' };

        const pokemonDetail = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          url: pokemon.url,
          image: pokemonDetail.data?.sprites?.front_default || '',
        };
      })
    );
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return [];
  }
};
