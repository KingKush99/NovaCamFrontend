//
// FILE: src/lib/api.js
//
// PURPOSE: This file centralizes all frontend communication with the backend API.
// This is the complete, final version with all functions for new features.
//

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9020/api',
});

// --- LISTING FUNCTIONS ---
export const fetchListings = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.searchTerm) { params.append('searchTerm', filters.searchTerm); }
  if (filters.status && filters.status !== 'all') { params.append('status', filters.status); }
  const queryString = params.toString();
  const url = queryString ? `/nfts/auctions?${queryString}` : '/nfts/auctions';
  return apiClient.get(url);
};

export const fetchListingById = (id) => {
  return apiClient.get(`/nfts/auctions/${id}`);
};

// --- USER & AUTH FUNCTIONS ---
export const getCurrentUserProfile = () => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No auth token found.'));
  return apiClient.get('/users/profile', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const fetchUserProfile = (username) => {
  return apiClient.get(`/users/profile/${username}`);
};

export const fetchMyNfts = () => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No auth token found.'));
  return apiClient.get('/users/my-nfts', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const updateUserProfile = (profileData) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No auth token found.'));
  return apiClient.put('/users/profile', profileData, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

// --- AUCTION FUNCTIONS ---
export const placeBid = (auctionContractId, amount) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No auth token found.'));
  return apiClient.post('/nfts/auctions/bid', { auctionContractId, amount }, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const endAuction = (auctionContractId) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No auth token found.'));
  return apiClient.post('/nfts/auctions/end', { auctionContractId }, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const approveListing = (data) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No auth token found.'));
  return apiClient.post('/nfts/approve-listing', data, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const listItem = (data) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No auth token found.'));
  return apiClient.post('/nfts/list-item', data, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const sendTip = (data) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No auth token found.'));
  return apiClient.post('/nfts/tip', data, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

// --- ADMIN FUNCTIONS ---
export const adminMintNft = (data) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No auth token found.'));
  const payload = { ...data, ipfsCid: 'QmXv2Y3tQxWcZqY9KcxkoRsXgcAV4H9SHgiiQme5ej3jUy' };
  return apiClient.post('/nfts/admin/mint-nft', payload, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const adminMintTokens = (data) => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No auth token found.'));
  return apiClient.post('/nfts/admin/mint-tokens', data, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};