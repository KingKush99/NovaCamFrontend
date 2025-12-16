'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaHeart, FaShare, FaUser, FaPlay } from 'react-icons/fa';
import { useState } from 'react';

// Featured models pool for suggestions
const MODEL_POOL = [
    'soficb', 'angell6969', 'angelblisss', 'miihoflex', 'monika_reed1', 'malenahot525',
    'ana_maria11', 'krisskissshow', 'caramelangels', 'princess_sweety', 'livvywinters',
    'boobss', 'vika54784', 'lunarspark', 'heyskylar', 'adriana_elvis', 'blissdilley',
    'annieguzman', 'amy_queen7', 'swt_shadow', '1m_valery', 'crimsonkitten',
    'sosabless', 'anna_monik', 'sabrinajadex', 'melissalem1', 'sabrina_geek',
    'pinkncrazy', '2strangers', 'blessme_g', 'kuro_ren', 'miss_giulia',
    'ami_katana', 'mirela_silver', 'freyabyrne', 'devyale', 'yourlittlesunrise'
];

function SuggestionCard({ username }: { username: string }) {
    const [imgError, setImgError] = useState(false);
    const thumbnailUrl = `https://roomimg.stream.highwebmedia.com/ri/${username}.jpg`;

    return (
        <Link
            href={`/cams/room/${username}`}
            className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group hover:border-fuchsia-500 transition-all"
        >
            {!imgError ? (
                <img
                    src={thumbnailUrl}
                    alt={username}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
                    <FaUser className="text-3xl text-zinc-600" />
                </div>
            )}

            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPlay className="text-white text-2xl" />
            </div>

            {/* Username */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-white text-xs font-bold truncate block">{username}</span>
            </div>
        </Link>
    );
}

export default function ChaturbateRoomPage() {
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;

    // Official Chaturbate embed URL
    const embedUrl = `https://chaturbate.com/embed/${username}/?bgcolor=black`;

    // Get suggestions (exclude current model)
    const suggestions = MODEL_POOL.filter(m => m !== username).slice(0, 12);

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
                        <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full transition-colors">
                            <FaShare />
                        </button>
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
                <div className="mb-8">
                    <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                        <span className="text-fuchsia-500">●</span> More Like This
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {suggestions.map(model => (
                            <SuggestionCard key={model} username={model} />
                        ))}
                    </div>
                </div>

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
