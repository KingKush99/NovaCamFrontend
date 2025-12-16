'use client';

import Link from 'next/link';
import { FaUser, FaRegEye, FaHeart, FaPlay } from 'react-icons/fa';
import { useState } from 'react';
import StreamPlayerModal from './StreamPlayerModal';

interface ChaturbateStream {
    username: string;
    image_url: string;
    num_users: number; // Viewers
    room_subject: string;
    gender: 'f' | 'm' | 'c' | 's';
    tags: string[];
    is_hd: boolean;
    location?: string;
    display_name?: string;
    age?: number;
}

interface StreamCardProps {
    stream: ChaturbateStream;
}

export default function StreamCard({ stream }: StreamCardProps) {
    const [isOffline, setIsOffline] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    // CRITICAL: We normally hide offline cards. 
    // BUT for this user (with SSL/Date issues), we must SHOW them with a fallback, 
    // otherwise the grid is empty.
    // if (isOffline) return null; // Disabled to force visibility

    return (
        <>
            <div
                className="group relative block bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-fuchsia-500/50 hover:shadow-lg hover:shadow-fuchsia-500/10 transition-all cursor-pointer"
                onClick={() => setShowPlayer(true)}
            >
                {/* Thumbnail */}
                <div className="aspect-video bg-zinc-800 relative overflow-hidden flex items-center justify-center">
                    <img
                        src={stream.image_url}
                        alt={stream.username}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={() => setIsOffline(true)}
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-fuchsia-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <FaPlay className="text-white ml-0.5" />
                        </div>
                    </div>

                    {/* LIVE Badge */}
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
                    </div>

                    {/* HD Badge */}
                    {stream.is_hd && (
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-white/20">
                            HD
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="p-3">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm truncate max-w-[80%] text-white group-hover:text-fuchsia-400 transition-colors">
                            {stream.display_name || stream.username}
                        </h3>
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-1 mb-2" title={stream.room_subject}>
                        {stream.room_subject}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 h-5 overflow-hidden">
                        {stream.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Player Modal */}
            {showPlayer && (
                <StreamPlayerModal
                    username={stream.username}
                    onClose={() => setShowPlayer(false)}
                />
            )}
        </>
    );
}
