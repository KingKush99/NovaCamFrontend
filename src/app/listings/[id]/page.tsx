//
// FILE: src/app/listings/[id]/page.tsx
//
// FINAL VERSION: This now uses the smart <NFTImage> component to correctly display the image.
//

'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchListingById, placeBid, endAuction, getCurrentUserProfile } from '../../../lib/api';
import CountdownTimer from '../../../components/CountdownTimer';
import { useAuth } from '../../../context/AuthContext';
import NFTImage from '../../../components/NFTImage'; // <-- Import the new component

// Define types for your data structures
type Listing = {
  id: number;
  nft_name: string;
  nft_image_url: string; // This is actually the metadata URL
  highest_bid_amount: string;
  highest_bidder_username: string | null;
  auction_end_time: string;
  auction_contract_id: string;
  seller_id: number;
  status: 'active' | 'sold' | 'ended';
  winner_username: string | null;
  winning_amount: string | null;
  winner_id: number | null;
};

type User = {
  id: number;
};

const ListingPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const { isAuthenticated } = useAuth();

  const [listing, setListing] = useState<Listing | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This effect runs when the page ID or user's auth status changes.
  useEffect(() => {
    const loadPageData = async () => {
      if (!id) {
        setLoading(false);
        setError("Invalid listing ID.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const listingResponse = await fetchListingById(parseInt(id));
        setListing(listingResponse.data);

        if (isAuthenticated) {
          const userProfileResponse = await getCurrentUserProfile();
          setCurrentUser(userProfileResponse.data);
        } else {
          setCurrentUser(null);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load page data.');
      } finally {
        setLoading(false);
      }
    };
    loadPageData();
  }, [id, isAuthenticated]);
  
  // This function handles the bid submission.
  const handlePlaceBid = async () => {
    if (!listing || !bidAmount) return;
    if (parseFloat(bidAmount) <= parseFloat(listing.highest_bid_amount)) {
      setError('Your bid must be higher than the current bid.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await placeBid(listing.auction_contract_id, bidAmount);
      alert('Bid placed successfully!');
      // Refetch listing data to show the new bid
      const updatedListing = await fetchListingById(parseInt(id));
      setListing(updatedListing.data);
      setBidAmount('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to place bid.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // This function handles ending the auction.
  const handleEndAuction = async () => {
    if (!listing) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await endAuction(listing.auction_contract_id);
      alert('Auction ended successfully!');
      const updatedListing = await fetchListingById(parseInt(id));
      setListing(updatedListing.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to end auction.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render loading/error/not-found states first.
  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!listing) return <div className="text-center p-8">Listing not found.</div>;

  // Determine UI state based on the fetched data.
  const isSeller = currentUser?.id === listing.seller_id;
  const isAuctionOver = new Date() > new Date(listing.auction_end_time);
  const minBid = (parseFloat(listing.highest_bid_amount) || 0) + 0.01;
  const isInputDisabled = !isAuthenticated || isSubmitting;

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{listing.nft_name}</h1>
        
        {/* --- THIS IS THE FIX --- */}
        {/* Instead of a plain <img> tag, we use our new smart component. */}
        {/* It takes the metadata URL and handles fetching the real image URL. */}
        <NFTImage 
          metadataUrl={listing.nft_image_url} 
          alt={listing.nft_name}
          className="w-full h-auto rounded-lg shadow-lg mb-4"
        />
        {/* --- END OF FIX --- */}

        <div className="bg-gray-800 p-4 rounded-lg space-y-2">
            <p>Current Bid: <strong className="text-2xl text-green-400">{listing.highest_bid_amount} NOVA</strong></p>
            <p>Highest Bidder: {listing.highest_bidder_username || 'No bids yet'}</p>
            <div>
                <span>Ends in: </span>
                <CountdownTimer endTime={listing.auction_end_time} />
            </div>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Bidding Form for Buyers */}
        {!isSeller && !isAuctionOver && listing.status === 'active' && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Place Your Bid</h3>
            <div className="flex items-center space-x-2">
                <input
                    type="number"
                    min={minBid}
                    step="0.01"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder={`Bid (e.g., ${minBid.toFixed(2)})`}
                    disabled={isInputDisabled}
                    className="input input-bordered w-full text-white"
                />
                <button onClick={handlePlaceBid} disabled={isInputDisabled} className="btn btn-primary">
                    {isSubmitting ? 'Submitting...' : 'Place Bid'}
                </button>
            </div>
            {!isAuthenticated && <p className="text-yellow-500 mt-2">Please log in to place a bid.</p>}
          </div>
        )}

        {/* End Auction Button for Seller */}
        {isSeller && isAuctionOver && listing.status === 'active' && (
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold mb-2">Manage Your Auction</h3>
            <button onClick={handleEndAuction} disabled={isSubmitting} className="btn btn-secondary">
              {isSubmitting ? 'Ending...' : 'End Auction'}
            </button>
          </div>
        )}
        
        {/* Final Status Messages */}
        {listing.status === 'sold' && <h3 className="text-2xl font-bold text-green-500">Sold to {listing.winner_username} for {listing.winning_amount} NOVA!</h3>}
        {listing.status === 'ended' && !listing.winner_id && <h3 className="text-xl text-yellow-500">Auction ended with no winner.</h3>}
      </div>
    </main>
  );
};

export default ListingPage;