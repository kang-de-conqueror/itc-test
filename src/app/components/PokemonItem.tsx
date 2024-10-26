'use client';

import Link from 'next/link';
import { Pokemon } from '../types/pokemon.type';

export default function PokemonItem({ name, image, url }: Pokemon) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:rotate-y-10 hover:rotate-x-10 hover:translate-z-10 transition-all cursor-pointer">
      <Link href={url} target="_blank">
        <div className="p-5 flex flex-col items-center text-center">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 object-cover mb-4"
          />
          <p className="text-lg font-semibold text-gray-800">{name}</p>
        </div>
      </Link>
    </div>
  );
}
