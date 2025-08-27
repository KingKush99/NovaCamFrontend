//
// FILE: src/app/collection/page.tsx (CORRECTED FINAL VERSION)
//

'use client';

import { useState, useEffect } from 'react';
import { fetchMyNfts, listItem, approveListing } from '@/lib/api'; // Import listing functions
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

interface Nft {
  id: number;
  token_id: string;
  name: string;
  image_url: string;
}

export default function MyCollectionPage() {
  const { user } = useAuth();
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [listingStatus, setListingStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadNfts = async () => {
      try {
        const response = await fetchMyNfts();
        setNfts(response.data);
      } catch (err: any) {
        setError('Failed to load your collection.');
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      loadNfts();
    }
  }, [user]);

  const handleListForSale = async (tokenId: string) => {
    const price = prompt("Please enter the listing price in NOVA:", "10");
    if (!price || isNaN(parseFloat(price))) {
      alert("Invalid price.");
      return;
    }

    try {
      setListingStatus({ ...listingStatus, [tokenId]: 'Approving...' });
      // Step 1: Approve the auction house to handle this specific NFT
      await approveListing({ tokenId });

      setListingStatus({ ...listingStatus, [tokenId]: 'Listing...' });
      // Step 2: Create the auction on the blockchain
      await listItem({ tokenId, price: parseFloat(price) });

      setListingStatus({ ...listingStatus, [tokenId]: 'Listed successfully!' });
      // Optionally, refresh the data or redirect
    } catch (err: any) {
      console.error("Listing failed:", err);
      setListingStatus({ ...listingStatus, [tokenId]: `Error: ${err.message}` });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-white mb-8">My NFT Collection</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <div key={nft.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <Image
              src={nft.image_url.replace('ipfs://', 'https://ipfs.io/ipfs/')}
              alt={nft.name || 'NFT Image'}
              width={500}
              height={500}
              className="object-cover w-full h-56"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
              <p className="text-sm text-gray-400">Token ID: {nft.token_id}</p>
              
              {/* --- THIS IS THE FIX --- */}
              <button
                onClick={() => handleListForSale(nft.token_id)}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                disabled={!!listingStatus[nft.token_id] && listingStatus[nft.token_id] !== 'Listed successfully!'}
              >
                {listingStatus[nft.token_id] || 'List for Sale'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}