//
// FILE: next.config.js
//

/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- THIS IS THE FIX ---
  // We are adding this 'images' configuration block.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
  // --- END OF FIX ---
};

module.exports = nextConfig;