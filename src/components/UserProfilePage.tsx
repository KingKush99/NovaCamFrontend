//
// FILE: src/components/UserProfilePage.tsx
//
// PURPOSE: Displays and allows editing of the user's profile.
// FIX: This version correctly handles the successful API response, populating the
// form fields and removing the false error message.
//

'use client';

import React, { useState, useEffect } from 'react';
import { getCurrentUserProfile, updateUserProfile } from '../lib/api'; // Use the unified api file
import './UserProfilePage.css';

// Define types for profile data
interface UserProfileData {
    id: number | string;
    email: string;
    username: string;
    displayName: string;
    bio: string; // Use empty string for form state
    profilePictureUrl: string; // Use empty string for form state
    walletAddress: string;
}

// Define type for the update payload
interface ProfileUpdatePayload {
    displayName: string;
    bio: string | null; // Backend might expect null for empty
    profilePictureUrl: string | null; // Backend might expect null for empty
}

function UserProfilePage() {
    const [profile, setProfile] = useState<UserProfileData>({
        id: '', email: '', username: '', displayName: '',
        bio: '', profilePictureUrl: '', walletAddress: '',
    });
    const [originalProfile, setOriginalProfile] = useState<UserProfileData | null>(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            setError('');
            try {
                // **FIX #1: Use the correct API function**
                const response = await getCurrentUserProfile();

                // **FIX #2: Check response.data, not response.user**
                if (response.data) {
                    // Map backend data (e.g., display_name) to frontend state (displayName)
                    const fetchedProfile: UserProfileData = {
                        id: response.data.id || '',
                        email: response.data.email || '',
                        username: response.data.username || '',
                        // Backend often uses snake_case, frontend uses camelCase
                        displayName: response.data.display_name || response.data.username || '',
                        bio: response.data.bio || '',
                        profilePictureUrl: response.data.profile_picture_url || '',
                        walletAddress: response.data.custodial_address || '',
                    };
                    setProfile(fetchedProfile);
                    setOriginalProfile(fetchedProfile); // Store original data for comparison
                } else {
                    setError('Failed to load profile: No user data returned from API.');
                }
            } catch (err: any) {
                console.error('Error fetching profile:', err);
                setError(err.response?.data?.message || err.message || 'Failed to load profile. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (JSON.stringify(profile) === JSON.stringify(originalProfile)) {
            setMessage('No changes were made.');
            setIsEditing(false);
            return;
        }

        try {
            // Prepare data for update: convert empty strings to null if the backend expects it
            const updatePayload: ProfileUpdatePayload = {
                displayName: profile.displayName,
                bio: profile.bio || null,
                profilePictureUrl: profile.profilePictureUrl || null,
            };
            
            const response = await updateUserProfile(updatePayload);
            
            if (response.data) {
                const updatedProfile: UserProfileData = {
                    id: response.data.id || '',
                    email: response.data.email || '',
                    username: response.data.username || '',
                    displayName: response.data.display_name || response.data.username || '',
                    bio: response.data.bio || '',
                    profilePictureUrl: response.data.profile_picture_url || '',
                    walletAddress: response.data.custodial_address || '',
                };
                setProfile(updatedProfile);
                setOriginalProfile(updatedProfile);
                setMessage('Profile updated successfully!');
                setIsEditing(false);
            } else {
                setError('Failed to update profile.');
            }
        } catch (err: any) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.message || err.message || 'Failed to update profile.');
        }
    };

    if (isLoading) return <div className="profile-container">Loading profile...</div>;
    if (error) return <div className="profile-container error-message">{error}</div>;

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            {message && <p className="success-message">{message}</p>}

            {!isEditing ? (
                <div className="profile-display">
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Display Name:</strong> {profile.displayName || 'N/A'}</p>
                    <p><strong>Bio:</strong> {profile.bio || 'N/A'}</p>
                    <p><strong>Wallet Address:</strong> {profile.walletAddress}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="displayName">Display Name:</label>
                        <input
                            type="text" id="displayName" name="displayName"
                            value={profile.displayName} onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Bio:</label>
                        <textarea
                            id="bio" name="bio"
                            value={profile.bio} onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profilePictureUrl">Profile Picture URL:</label>
                        <input
                            type="url" id="profilePictureUrl" name="profilePictureUrl"
                            value={profile.profilePictureUrl} onChange={handleChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => { setIsEditing(false); setProfile(originalProfile!); }} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default UserProfilePage;