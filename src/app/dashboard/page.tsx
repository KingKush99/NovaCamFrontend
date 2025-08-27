// src/app/dashboard/page.tsx

'use client'; // This component uses client-side hooks

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getNewUserProfile } from '@/api/auth'; // <--- IMPORTANT: Changed import to getNewUserProfile

// Define a type for the user profile data displayed on the dashboard
interface DashboardUserProfile {
  email: string;
  username: string;
  display_name: string; // From backend's user.display_name
  custodial_address: string;
  // Add other fields you might want to display from the profile
}

export default function DashboardPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<DashboardUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, redirect to login page
        router.push('/login');
        return;
      }

      try {
        // Use the new getNewUserProfile function to fetch profile data
        const response = await getNewUserProfile(token); 
        if (response.user) {
          setUserProfile({
            email: response.user.email,
            username: response.user.username,
            display_name: response.user.display_name,
            custodial_address: response.user.custodial_address,
          });
        } else {
          setError(response.message || 'Failed to fetch user profile data.');
          // Optionally, redirect to login if profile fetch fails
          router.push('/login');
        }
      } catch (err: any) {
        console.error("Dashboard profile fetch error:", err);
        setError(err.message || 'Error fetching profile. Please re-login.');
        // Clear token and redirect to login on API error
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]); // Add router to dependency array

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  // Add functionality for 'Create Blockchain Profile' and 'Send 0.1 NOVA Tip' buttons if needed
  // This example only implements the profile fetch and logout.

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-white text-lg">Loading user data...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-red-500 text-lg">{error}</p>
        <button onClick={() => router.push('/login')} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Login
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {userProfile && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-white text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome, {userProfile.display_name || userProfile.username}!</h1>
          <div className="text-left space-y-2 mb-6">
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Username:</strong> {userProfile.username}</p>
            <p><strong>Wallet Address:</strong> {userProfile.custodial_address}</p>
          </div>
          {/* Example placeholder buttons */}
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
            Create Blockchain Profile
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Send 0.1 NOVA Tip
          </button>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      )}
    </main>
  );
}