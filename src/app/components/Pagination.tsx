'use client';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  isEndOfList: boolean;
  limit: number;
  onLimitChange: (limit: number) => void;
  loading: boolean;
}

export default function Pagination({
  currentPage,
  onPageChange,
  isEndOfList,
  limit,
  onLimitChange,
  loading,
}: PaginationProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        <label htmlFor="limit" className="text-gray-700">
          Items per page:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="px-3 py-2 rounded-md border border-gray-300 text-base focus:outline-none focus:ring focus:border-blue-500"
          disabled={loading}
        >
          {[10, 25, 50, 100].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className={`bg-blue-500 text-white py-2 px-4 w-24 rounded-lg hover:bg-blue-600 shadow-md transition-all ${
            loading || currentPage <= 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={loading || currentPage <= 1}
        >
          Previous
        </button>

        <span className="text-lg font-semibold text-gray-800 w-10 text-center">
          {currentPage}
        </span>

        <button
          className={`bg-blue-500 text-white py-2 px-4 w-24 rounded-lg hover:bg-blue-600 shadow-md transition-all ${
            loading || isEndOfList ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={loading || isEndOfList}
        >
          Next
        </button>
      </div>
    </div>
  );
}
