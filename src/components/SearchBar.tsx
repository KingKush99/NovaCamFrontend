'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // Check for game shortcuts
            if (query.toLowerCase().includes('meme')) {
                router.push('/arcade?game=meme');
            } else if (query.toLowerCase().includes('quiz') || query.toLowerCase().includes('trivia')) {
                router.push('/arcade');
            } else {
                router.push(`/search?q=${encodeURIComponent(query)}`);
            }
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search models, games, or tags..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
            </div>
        </form>
    );
}
