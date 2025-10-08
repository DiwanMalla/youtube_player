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
          className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-300 rounded-full 
                     focus:outline-none focus:border-red-500 transition-colors
                     disabled:bg-gray-100 disabled:cursor-not-allowed
                     shadow-md hover:shadow-lg"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchTerm.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-red-600 
                     text-white rounded-full hover:bg-red-700 transition-colors
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     shadow-md hover:shadow-lg"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
