//
// FILE: src/components/AuctionCard.tsx (CORRECTED AND FINAL)
//
'use client';

import React from 'react';
import Link from 'next/link';
import NFTImage from './NFTImage';
import CountdownTimer from './CountdownTimer';

const AuctionCard = ({ listing }: { listing: any }) => {
  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800 flex flex-col justify-between">
      <div>
        <NFTImage 
          metadataUrl={listing.nft_image_url} 
          alt={listing.nft_name}
          className="w-full h-48 object-cover rounded-md mb-4" 
        />
        <h3 className="font-bold text-lg mb-2 break-words">{listing.nft_name || `Item #${listing.id}`}</h3>
        <p>Current Bid: <strong className="text-green-400">{listing.highest_bid_amount} NOVA</strong></p>
        
        {/* Make Seller Username a link */}
        <p className="text-sm text-gray-400">
          Seller: 
          <Link href={`/profile/${listing.seller_username}`} className="text-blue-400 hover:underline ml-1">
            {listing.seller_username}
          </Link>
        </p>

        <p>
          Highest Bidder: 
          {listing.highest_bidder_username ? (
            <Link href={`/profile/${listing.highest_bidder_username}`} className="text-blue-400 hover:underline ml-1">
              {listing.highest_bidder_username}
            </Link>
          ) : (
            <span className="ml-1">No bids yet</span>
          )}
        </p>
        <div className="mt-2">
          <span>Ends in: </span>
          <CountdownTimer endTime={listing.auction_end_time} />
        </div>
      </div>
      <div className="mt-4">
        <Link href={`/listings/${listing.id}`} className="btn btn-primary w-full">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AuctionCard;