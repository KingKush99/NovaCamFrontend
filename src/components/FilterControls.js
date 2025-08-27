//
// FILE: src/components/FilterControls.js (CORRECTED, JAVASCRIPT VERSION)
//
// PURPOSE: Provides the search and filter UI for the marketplace.
// FIX: This version correctly uses the individual props (searchTerm, setSearchTerm, etc.)
// passed down from the parent page, and makes the input text visible.
//

'use client';

import React from 'react';

const FilterControls = ({
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
          // Added text-black to make the text visible
          className="input input-bordered w-full text-black"
        />
      </div>
      <div className="w-full md:w-auto">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          // Added text-black to make the text visible
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