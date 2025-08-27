// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/api/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await registerUser({ email, password, username, display_name: displayName });
      setMessage(response.message || 'Registration successful!');
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        router.push('/dashboard');
      } else {
        router.push('/login?registered=true'); 
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during registration.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-10">
      <h2 className="text-3xl font-bold mb-6 text-white">Register</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-gray-700 p-8 rounded-lg shadow-md">
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        {message && <p className="text-green-400 mb-4 text-center">{message}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="displayName" className="block text-gray-300 text-sm font-bold mb-2">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-600 border-gray-500"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
          <Link href="/login" className="inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}