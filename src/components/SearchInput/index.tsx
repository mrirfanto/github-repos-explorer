import { useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface SearchInputProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export const SearchInput = ({ onSearch, loading }: SearchInputProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        disabled={loading}
        type="text"
        placeholder="Enter username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search GitHub users"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
      />
      <button
        disabled={loading}
        onClick={handleSearch}
        aria-label="Search"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex gap-2 items-center justify-center"
      >
        {loading && <LoadingSpinner />}
        Search
      </button>
    </div>
  );
};
