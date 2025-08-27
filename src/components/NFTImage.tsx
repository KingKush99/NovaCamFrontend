//
// FILE: src/components/NFTImage.tsx
//
// PURPOSE: This smart component takes a URL to an NFT's JSON metadata,
// fetches that data, finds the real image URL inside, and displays it.
//

'use client';

import React, { useState, useEffect } from 'react';

// Helper function to convert any IPFS URL to a usable HTTPS gateway URL
const toGatewayURL = (ipfsUrl: string) => {
  if (!ipfsUrl) return '';
  if (ipfsUrl.startsWith('https://')) {
    return ipfsUrl;
  }
  if (ipfsUrl.startsWith('ipfs://')) {
    const cid = ipfsUrl.substring(7);
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  }
  // Fallback for just a CID
  return `https://gateway.pinata.cloud/ipfs/${ipfsUrl}`;
};

interface NFTImageProps {
  metadataUrl: string;
  alt: string;
  className?: string;
}

const NFTImage: React.FC<NFTImageProps> = ({ metadataUrl, alt, className }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!metadataUrl) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(toGatewayURL(metadataUrl));
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        const metadata = await response.json();
        
        // Find the image URL inside the JSON and convert it to a gateway URL
        if (metadata.image) {
          setImageUrl(toGatewayURL(metadata.image));
        }
      } catch (error) {
        console.error('Could not parse NFT metadata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [metadataUrl]); // Re-run if the metadataUrl changes

  if (isLoading) {
    return <div className={`bg-gray-700 animate-pulse ${className}`}></div>; // Skeleton loader
  }

  if (!imageUrl) {
    return <div className={`bg-gray-700 text-xs text-center flex items-center justify-center ${className}`}>No Image</div>;
  }

  return (
    <img src={imageUrl} alt={alt} className={className} />
  );
};

export default NFTImage;