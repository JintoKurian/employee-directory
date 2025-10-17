'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { IoIosSearch } from "react-icons/io";
// import { Search } from 'lucide-react';

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Add your search logic here
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const gradientStyle = {
    borderImage: 'linear-gradient(135deg, hsl(221 83% 53%), hsl(221 83% 63%)) 1',
    borderWidth: '2px',
    borderStyle: 'solid'
  };

  const focusGradientStyle = {
    borderImage: 'linear-gradient(135deg, hsl(221 83% 43%), hsl(221 83% 53%)) 1'
  };

  return (
    <form onSubmit={handleSubmit} className="w-fullz">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoIosSearch className="w-4 h-4 text-gray-500" aria-hidden="true" />
        </div>
        <input
          type="search"
          id="default-search"
          value={searchQuery}
          onChange={handleChange}
          className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-blue-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
        />
      </div>
    </form>
  );
}