'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaHeart, FaShare, FaUser, FaPlay, FaExternalLinkAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

// Affiliate codes
const TOUR = 'LQps';
const CAMPAIGN = 'QvtQPh';

function SuggestionCard({ username, index }: { username: string; index: number }) {
    return (
        <Link
            href={`/cams/room/${username}`}
            className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 group hover:border-fuchsia-500 transition-all hover:scale-[1.02]"
            style={{
                background: `linear-gradient(135deg, hsl(${(index * 47) % 360}, 70%, 20%), hsl(${(index * 47 + 60) % 360}, 70%, 10%))`
            }}
        >
            {/* User icon placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
                <FaUser className="text-2xl text-white/20" />
            </div>

            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPlay className="text-white text-xl" />
            </div>

            {/* Username */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center justify-between">
                    <span className="text-white text-xs font-bold truncate">{username}</span>
                    <span className="bg-red-600 text-white text-[8px] font-bold px-1 py-0.5 rounded">LIVE</span>
                </div>
            </div>
        </Link>
    );
}

export default function ChaturbateRoomPage() {
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Official Chaturbate embed URL
    const embedUrl = `https://chaturbate.com/embed/${username}/?bgcolor=black`;

    // External link for direct Chaturbate access (with affiliate)
    const externalUrl = `https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}&track=room&room=${username}`;

    // Fetch suggestions from API
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const res = await fetch('/api/performers?gender=f&limit=12');
                const data = await res.json();
                if (data.performers) {
                    setSuggestions(
                        data.performers
                            .map((p: any) => p.username)
                            .filter((u: string) => u !== username)
                            .slice(0, 12)
                    );
                }
            } catch (e) {
                console.error('Failed to fetch suggestions');
            }
        };
        fetchSuggestions();
    }, [username]);

    return (
        <div className="min-h-screen bg-black">
            {/* Header Bar */}
            <div className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur border-b border-zinc-800 px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="text-zinc-400 hover:text-white transition-colors p-2"
                        >
                            <FaArrowLeft className="text-lg" />
                        </button>
                        <div>
                            <h1 className="text-white font-bold text-lg flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                {username}
                            </h1>
                            <p className="text-zinc-500 text-xs">Live Stream</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors">
                            <FaHeart /> Follow
                        </button>
                        <a
                            href={externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full transition-colors"
                            title="Open on Chaturbate"
                        >
                            <FaExternalLinkAlt />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Embedded Player - Full Width */}
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 mb-8">
                    <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; encrypted-media"
                    />
                </div>

                {/* Suggestions Section */}
                {suggestions.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                            <span className="text-fuchsia-500">●</span> More Like This
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {suggestions.map((model, i) => (
                                <SuggestionCard key={model} username={model} index={i} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Back to Browse */}
                <div className="text-center">
                    <Link
                        href="/cams"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                    >
                        <FaArrowLeft /> Back to All Cams
                    </Link>
                </div>
            </div>
        </div>
    );
}
