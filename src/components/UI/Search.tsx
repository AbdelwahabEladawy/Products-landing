"use client";

import { useState, useEffect } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  value?: string;
}

export const Search = ({ onSearch, placeholder = "Search products...", className = "", value = "" }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState(value);

  // Update internal state when external value changes
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, onSearch]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-400 text-lg">🔍</span>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm"
      />
      {searchQuery && (
        <button
          onClick={handleClearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          ✕
        </button>
      )}
    </div>
  );
}; 