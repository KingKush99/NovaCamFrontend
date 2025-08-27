//
// FILE: src/app/marketplace/page.tsx (CORRECTED VERSION)
//
// PURPOSE: Displays a grid of all auction listings.
// FIX: This version correctly passes the state and state setter functions
// as individual props to the <FilterControls> component.
//

'use client';

import { useState, useEffect } from 'react';
import { fetchListings } from '../../lib/api';
import AuctionCard from '../../components/AuctionCard';
import FilterControls from '../../components/FilterControls'; // Make sure this points to your .js file

type ListingSummary = {
  id: number;
  nft_name: string;
  nft_image_url: string;
  highest_bid_amount: string;
  auction_end_time: string;
};

const MarketplacePage = () => {
  const [listings, setListings] = useState<ListingSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchListings({ searchTerm, status: statusFilter });
        if (response.data && Array.isArray(response.data.data)) {
          setListings(response.data.data);
        } else {
          setListings([]);
        }
      } catch (err) {
        setError('Failed to load auction listings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Use a debounce to prevent API calls on every keystroke
    const handler = setTimeout(() => {
      loadListings();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, statusFilter]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Marketplace</h1>

      {/* This now correctly passes the props */}
      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading ? (
        <p className="text-center mt-12">Loading listings...</p>
      ) : error ? (
        <p className="text-center mt-12 text-red-500">{error}</p>
      ) : listings.length === 0 ? (
        <p className="text-center text-gray-400">No listings found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <AuctionCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </main>
  );
};

export default MarketplacePage;