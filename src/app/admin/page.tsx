//
// FILE: src/app/admin/page.tsx (COMPLETE AND FINAL VERSION)
//
'use client';

import { useState } from 'react';
import { adminMintNft, adminMintTokens } from '@/lib/api'; // Assuming these exist in your api.js

export default function AdminDashboard() {
  // State for the NFT minting form
  const [nftAddress, setNftAddress] = useState('');
  const [nftUsername, setNftUsername] = useState('');
  const [nftDescription, setNftDescription] = useState('');

  // State for the token minting form
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  // State for displaying messages to the user
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleMintNft = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await adminMintNft({ targetAddress: nftAddress, username: nftUsername, description: nftDescription });
      setMessage(response.data.message || 'NFT minted successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while minting the NFT.');
    }
  };

  const handleMintTokens = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await adminMintTokens({ targetAddress: tokenAddress, amount: tokenAmount });
      // --- THIS IS THE FIX ---
      // We now correctly access the transactionHash from the structured response.
      const txHash = response.data.transactionHash;
      setMessage(`Tokens minted successfully! Tx: ${txHash}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while minting tokens.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

      {message && <div className="bg-green-500 text-white p-3 rounded-md mb-6">{message}</div>}
      {error && <div className="bg-red-500 text-white p-3 rounded-md mb-6">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mint Profile NFT Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Mint Profile NFT</h2>
          <form onSubmit={handleMintNft}>
            <div className="mb-4">
              <label htmlFor="nftAddress" className="block text-gray-300 mb-2">Target Wallet Address</label>
              <input
                id="nftAddress"
                type="text"
                value={nftAddress}
                onChange={(e) => setNftAddress(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nftUsername" className="block text-gray-300 mb-2">Username</label>
              <input
                id="nftUsername"
                type="text"
                value={nftUsername}
                onChange={(e) => setNftUsername(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nftDescription" className="block text-gray-300 mb-2">Description</label>
              <textarea
                id="nftDescription"
                value={nftDescription}
                onChange={(e) => setNftDescription(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Mint NFT
            </button>
          </form>
        </div>

        {/* Mint NOVA Tokens Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Mint NOVA Tokens</h2>
          <form onSubmit={handleMintTokens}>
            <div className="mb-4">
              <label htmlFor="tokenAddress" className="block text-gray-300 mb-2">Target Wallet Address</label>
              <input
                id="tokenAddress"
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tokenAmount" className="block text-gray-300 mb-2">Amount</label>
              <input
                id="tokenAmount"
                type="text"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            <button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
              Mint Tokens
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}