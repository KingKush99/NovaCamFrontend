import CountdownTimer from './CountdownTimer';

const AuctionCard = ({ listing }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px' }}>
      <img src={listing.nft_image_url} alt={listing.nft_name} style={{ width: '100%', height: 'auto' }} />
      <h3>{listing.nft_name}</h3>
      <p>Current Bid: <strong>{listing.highest_bid_amount} NOVA</strong></p>
      <p>Highest Bidder: {listing.highest_bidder_username || 'None'}</p>
      <div>
        <span>Ends in: </span>
        <CountdownTimer endTime={listing.auction_end_time} />
      </div>
      <a href={`/listings/${listing.id}`}>View Details</a>
    </div>
  );
};

export default AuctionCard;