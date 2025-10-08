'use client';

import { useState, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="relative max-w-3xl mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for videos..."
          disabled={isLoading}
          className="w-full px-6 py-4 pr-14 text-lg text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-2 border-white/40 dark:border-gray-700/40 rounded-2xl 
                     focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 focus:bg-white/70 dark:focus:bg-gray-800/70 transition-all
                     disabled:bg-gray-100/50 dark:disabled:bg-gray-900/50 disabled:cursor-not-allowed
                     placeholder:text-gray-500 dark:placeholder:text-gray-400
                     shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 hover:shadow-xl hover:bg-white/60 dark:hover:bg-gray-800/60"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchTerm.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-blue-500 to-purple-600
                     text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all
                     disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed
                     shadow-lg hover:shadow-xl hover:scale-105"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
