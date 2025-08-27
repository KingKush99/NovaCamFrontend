// M:\Desktop\NOVA-CAM-FRONTEND\src\app\profile\page.tsx

// Import the UserProfilePage component without the .tsx extension
import UserProfilePage from '../../components/UserProfilePage'; // <--- CORRECTED IMPORT PATH
import React from 'react';

// This is a Next.js Page component for the /profile route
const ProfilePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Render your UserProfilePage component here */}
      <UserProfilePage />
    </main>
  );
};

export default ProfilePage; // Ensure this is a default export