//
// FILE: src/components/FilterControls.tsx
// FIX: Adds the 'text-black' class to the search input to make text visible.
//

'use client';

import React from 'react';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4 items-center p-4 bg-gray-800 rounded-lg">
      <div className="flex-grow w-full md:w-auto">
        <input
          type="search"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // --- THIS IS THE FIX for the invisible text ---
          className="input input-bordered w-full text-black"
        />
      </div>
      <div className="w-full md:w-auto">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          // --- Also apply the fix here for consistency ---
          className="select select-bordered w-full text-black"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="sold">Sold</option>
          <option value="ended">Ended</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;