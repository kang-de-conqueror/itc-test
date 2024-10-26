'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Type {
  name: string;
  url: string;
}

interface PokemonTypeFilterProps {
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
  loading: boolean;
}

export default function PokemonTypeFilter({ selectedTypes, onTypeChange, loading }: PokemonTypeFilterProps) {
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    async function fetchTypes() {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    }
    fetchTypes();
  }, []);

  const handleTypeClick = (typeName: string) => {
    if (!loading) {
      if (selectedTypes.includes(typeName)) {
        onTypeChange(selectedTypes.filter(type => type !== typeName));
      } else {
        onTypeChange([...selectedTypes, typeName]);
      }
    }
  };

  return (
    <div className="text-center mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Pokémon Type</h3>
      <div
        className="grid gap-2 justify-center"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        }}
      >
        {types.map((typeOption) => (
          <button
            key={typeOption.name}
            className={`p-2 text-base font-medium border-2 rounded-lg ${
              selectedTypes.includes(typeOption.name)
                ? 'bg-blue-500 text-white border-blue-700'
                : 'bg-gray-200 text-gray-800 border-transparent hover:bg-gray-300'
            } transition-colors duration-300 ease-in-out ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={() => handleTypeClick(typeOption.name)}
            disabled={loading}
          >
            {typeOption.name}
          </button>
        ))}
      </div>
    </div>
  );
}
