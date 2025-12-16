//
// FILE: src/components/Header.tsx (CORRECTED FINAL VERSION)
//

'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

// We use a dynamic import for AuthLinks with server-side rendering (SSR) turned off.
// This is best practice for components that rely on browser-only state like authentication.
const AuthLinks = dynamic(
  () => import('./AuthLinks').then((mod) => mod.AuthLinks),
  { ssr: false }
);

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300">
          Nova Cam
        </Link>
        <div className="flex items-center space-x-4 h-8">
          <Link href="/marketplace" className="hover:text-gray-300">Marketplace</Link>
          <Link href="/cams" className="hover:text-fuchsia-400 font-bold text-fuchsia-300">Novelty Cams</Link>

          {/* This will now correctly render our intelligent AuthLinks component */}
          <AuthLinks />
        </div>
      </nav>
    </header>
  );
}