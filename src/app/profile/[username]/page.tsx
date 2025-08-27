//
// FILE: src/app/profile/[username]/page.tsx (CORRECTED AND FINAL)
//
'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'; // Only one React import
import { useAuth } from '../../../context/AuthContext';
import { fetchUserProfile, sendTip } from '../../../lib/api';

const UserProfilePage = () => {
  const params = useParams();
  const username = params?.username as string;
  const { user: currentUser, isAuthenticated } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      setIsLoading(true);
      fetchUserProfile(username)
        .then(res => setProfile(res.data))
        .catch(err => setError("User profile not found."))
        .finally(() => setIsLoading(false));
    }
  }, [username]);

  const handleTipClick = () => {
    const amount = prompt("Enter amount of NOVA to tip:", "1");
    if (amount && profile?.custodial_address) {
      // Ensure the amount is a string for the API
      sendTip({ recipientAddress: profile.custodial_address, amount: String(amount) })
        .then(res => alert(`Tip sent successfully! Tx: ${res.data.txHash}`))
        .catch(err => alert(`Error: ${err.response?.data?.message || err.message}`));
    }
  };

  if (isLoading) return <p className="p-8 text-center">Loading profile...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;
  if (!profile) return <p className="p-8 text-center">User not found.</p>;

  return (
    <main className="container mx-auto p-8">
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{profile.display_name || profile.username}</h1>
        <p className="mb-2 text-gray-400 break-words">Wallet: {profile.custodial_address}</p>
        <p className="mb-4">Bio: {profile.bio || 'This user has not set a bio yet.'}</p>
        
        {isAuthenticated && currentUser?.username !== profile.username && (
          <button onClick={handleTipClick} className="btn btn-secondary">
            Send 1 NOVA Tip
          </button>
        )}
      </div>
    </main>
  );
};

// Only one default export at the end of the file
export default UserProfilePage;