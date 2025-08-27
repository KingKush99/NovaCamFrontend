// src/app/login/page.tsx (CORRECTED AND FINAL VERSION)
'use client';

import { useState } from 'react';
import Link from 'next/link';
// We don't need useRouter here anymore because the AuthContext handles redirection.
import { loginUser } from '@/api/auth';
import { useAuth } from '@/context/AuthContext'; // 1. Import the useAuth hook

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // 2. Get the global login function from our context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUser({ email, password });
      
      if (response.token) {
        // 3. THE FIX IS HERE:
        // Instead of manually setting localStorage and redirecting,
        // we call the single 'login' function from our context.
        // This function handles everything: saving the token, updating the
        // application state, and redirecting the user.
        login(response.token);
        
      } else {
        setError('Login successful, but no token received.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during login.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-10">
      <h2 className="text-3xl font-bold mb-6">Login</h2> {/* Removed text-white to use body color */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
        {error && <p className="text-red-500 dark:text-red-400 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
          <Link href="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}