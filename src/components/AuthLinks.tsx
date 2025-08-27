//
// FILE: src/components/AuthLinks.tsx (NEW FILE - CRITICAL)
//

'use client'; // This directive is ESSENTIAL for this component to work.

import Link from 'next/link';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

export const AuthLinks = () => {
  // Get the global authentication state from the context
  const { isAuthenticated, user, logout } = useAuth();

  // 1. Handle the initial loading state
  // While isAuthenticated is null, we don't know if the user is logged in yet.
  // Show a placeholder to prevent the wrong links from flashing on screen.
  if (isAuthenticated === null) {
    return <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>;
  }

  // 2. Handle the authenticated state
  // If isAuthenticated is true, show the user-specific links.
  if (isAuthenticated) {
    return (
      <>
        <Link href="/collection" className="hover:text-gray-300">My Collection</Link>
        <Link href="/profile" className="hover:text-gray-300">Profile</Link>
        {/* Optional: Show an admin link if the user's role is 'admin' */}
        {user?.role === 'admin' && (
          <Link href="/admin" className="text-yellow-400 hover:text-yellow-200">Admin</Link>
        )}
        <button onClick={logout} className="hover:text-gray-300">Logout</button>
      </>
    );
  }

  // 3. Handle the unauthenticated state
  // If isAuthenticated is false, show the public links.
  return (
    <>
      <Link href="/login" className="hover:text-gray-300">Login</Link>
    </>
  );
};