'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlay, FaUser, FaSpinner, FaSync, FaExternalLinkAlt } from 'react-icons/fa';

interface StreamGridProps {
    category?: string;
}

// Affiliate codes
const TOUR = 'LQps';
const CAMPAIGN = 'QvtQPh';

// Featured models - verified active/popular
const FEATURED_MODELS = [
    'soficb', 'angell6969', 'angelblisss', 'miihoflex', 'monika_reed1', 'malenahot525',
    'ana_maria11', 'krisskissshow', 'caramelangels', 'princess_sweety', 'livvywinters',
    'boobss', 'vika54784', 'lunarspark', 'heyskylar', 'adriana_elvis', 'blissdilley',
    'annieguzman', 'amy_queen7', 'swt_shadow', '1m_valery', 'crimsonkitten',
    'sosabless', 'anna_monik', 'sabrinajadex', 'melissalem1', 'sabrina_geek',
    'pinkncrazy', '2strangers', 'blessme_g', 'kuro_ren', 'miss_giulia',
    'ami_katana', 'mirela_silver', 'freyabyrne', 'devyale', 'yourlittlesunrise'
];

function RoomCard({ username }: { username: string }) {
    // Affiliate link for direct Chaturbate access
    const affiliateLink = `https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}&track=embed&room=${username}`;

    return (
        <Link
            href={`/cams/room/${username}`}
            className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group hover:border-fuchsia-500 transition-all hover:scale-[1.02]"
        >
            {/* Chaturbate Embed Thumbnail (works as iframe) */}
            <iframe
                src={`https://chaturbate.com/embed/${username}/?bgcolor=black`}
                className="w-full h-full pointer-events-none"
                style={{ border: 'none' }}
                allow="autoplay"
            />

            {/* Overlay (clickable area) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-3">
                <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-sm truncate">{username}</span>
                    <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
                        LIVE
                    </span>
                </div>
            </div>

            {/* Play button on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 bg-fuchsia-600/90 rounded-full flex items-center justify-center backdrop-blur">
                    <FaPlay className="text-white ml-1 text-xl" />
                </div>
            </div>
        </Link>
    );
}

export default function StreamGrid({ category = 'All' }: StreamGridProps) {
    const [streams, setStreams] = useState<string[]>(FEATURED_MODELS);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-500 text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Live Cams
                </h3>
                <div className="flex items-center gap-3">
                    <span className="text-zinc-600 text-[10px]">{streams.length} online</span>
                    <a
                        href={`https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-fuchsia-400 transition-colors text-xs flex items-center gap-1"
                    >
                        Browse All <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                </div>
            </div>

            {/* Grid of embedded mini-players */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {streams.map((username) => (
                    <RoomCard key={username} username={username} />
                ))}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-zinc-600 text-[10px]">
                Click any cam to watch in full size • Powered by Chaturbate
            </div>
        </div>
    );
}
