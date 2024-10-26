'use client';

import { useState } from 'react';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';
import PokemonTypeFilter from '../components/PokemonTypeFilter';

export default function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
  const initialPage = parseInt(searchParams.page || '1');
  const initialTypes = searchParams.type ? searchParams.type.split(',') : [];
  const initialLimit = parseInt(searchParams.limit || '10');

  const [page, setPage] = useState(initialPage);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);
  const [limit, setLimit] = useState(initialLimit);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (types: string[]) => {
    setSelectedTypes(types);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-full mx-auto px-6">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-4">Pokémon Explorer</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/5 flex flex-col gap-2 h-fit lg:sticky top-4">
            <PokemonTypeFilter selectedTypes={selectedTypes} onTypeChange={handleTypeChange} loading={loading} />
            <Pagination
              currentPage={page}
              onPageChange={handlePageChange}
              isEndOfList={isEndOfList}
              limit={limit}
              onLimitChange={handleLimitChange}
              loading={loading}
            />
          </aside>

          <section className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-4/5 h-full">
            <PokemonList
              page={page}
              selectedTypes={selectedTypes}
              limit={limit}
              onEndOfListChange={setIsEndOfList}
              loading={loading}
              setLoading={setLoading}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
