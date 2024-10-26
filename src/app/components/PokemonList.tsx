"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPokemon } from "../services/pokemon.service";
import { Pokemon } from "../types/pokemon.type";
import PokemonItem from "../components/PokemonItem";

interface PokemonListProps {
  page: number;
  selectedTypes: string[];
  limit: number;
  onEndOfListChange: (isEnd: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function PokemonList({
  page,
  selectedTypes,
  limit,
  onEndOfListChange,
  loading,
  setLoading,
}: PokemonListProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getPokemonData = async () => {
      setLoading(true);

      const minimumLoadingTime = new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );
      const pokemonDataPromise = fetchPokemon(selectedTypes, page, limit);
      const [pokemonWithImages] = await Promise.all([
        pokemonDataPromise,
        minimumLoadingTime,
      ]);

      setPokemonList(pokemonWithImages);
      onEndOfListChange(pokemonWithImages.length < limit);
      setLoading(false);
    };

    getPokemonData();
  }, [page, selectedTypes, limit]);

  useEffect(() => {
    if (page > 1 && pokemonList.length === 0) {
      router.replace(
        `/pokemon?type=${selectedTypes.join(",")}&page=1&limit=${limit}`
      );
    }
  }, [page, pokemonList, router, selectedTypes, limit]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center flex-col h-64">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-transparent border-t-blue-500 border-b-green-500"></div>
          <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
            Fetching Pokémon data...
          </p>
        </div>
      ) : (
        <>
          {pokemonList.length === 0 ? (
            <p className="text-center text-lg font-medium text-gray-700">
              No results found
            </p>
          ) : (
            <div>
              <p className="text-right text-gray-500 text-sm mb-4">
                Showing {pokemonList.length} Pokémon
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6 p-4">
                {pokemonList.map((pokemon) => (
                  <PokemonItem
                    key={pokemon.name}
                    name={pokemon.name}
                    image={pokemon.image}
                    url={pokemon.url}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
