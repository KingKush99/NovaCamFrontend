'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaPlay, FaExternalLinkAlt, FaSync, FaUser } from 'react-icons/fa';

// Affiliate codes (for "Browse All" external link)
const TOUR = 'LQps';
const CAMPAIGN = 'QvtQPh';

interface Performer {
    username: string;
}

function CamsContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'women';
    const [performers, setPerformers] = useState<Performer[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPerformers = async () => {
        setLoading(true);
        try {
            const genderMap: Record<string, string> = {
                'featured': 'f',
                'women': 'f',
                'men': 'm',
                'couples': 'c',
                'trans': 't',
            };
            const gender = genderMap[category.toLowerCase()] || 'f';
            const res = await fetch(`/api/performers?gender=${gender}&limit=40`);
            const data = await res.json();

            if (data.performers && data.performers.length > 0) {
                setPerformers(data.performers.map((p: any) => ({ username: p.username })));
            }
        } catch (error) {
            console.error('Failed to fetch performers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPerformers();
    }, [category]);

    return (
        <div className="text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                        {category.charAt(0).toUpperCase() + category.slice(1)} Cams
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        {performers.length} Live Streams • Click to watch
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchPerformers}
                        disabled={loading}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors disabled:opacity-50"
                    >
                        <FaSync className={loading ? 'animate-spin' : ''} /> Refresh
                    </button>
                    <a
                        href={`https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                        Browse All <FaExternalLinkAlt className="text-xs" />
                    </a>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-fuchsia-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-zinc-500">Loading live cams...</p>
                    </div>
                </div>
            )}

            {/* Grid - Links to internal room pages (same window) */}
            {!loading && performers.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {performers.map((performer, i) => (
                        <Link
                            key={performer.username}
                            href={`/cams/room/${performer.username}`}
                            className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 group hover:border-fuchsia-500 transition-all hover:scale-[1.02]"
                            style={{
                                background: `linear-gradient(135deg, hsl(${(i * 37) % 360}, 70%, 20%), hsl(${(i * 37 + 60) % 360}, 70%, 10%))`
                            }}
                        >
                            {/* User icon placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaUser className="text-4xl text-white/20" />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-bold text-sm truncate">{performer.username}</span>
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
                    ))}
                </div>
            )}

            {/* No performers message */}
            {!loading && performers.length === 0 && (
                <div className="text-center py-12">
                    <FaUser className="text-4xl text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500 mb-4">Loading performers...</p>
                    <button
                        onClick={fetchPerformers}
                        className="bg-fuchsia-600 hover:bg-fuchsia-500 px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Footer */}
            <div className="mt-6 text-center text-zinc-600 text-[10px]">
                Click any cam to watch • Streams embedded from Chaturbate
            </div>
        </div>
    );
}

export default function CamsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center text-white h-64">
                <div className="animate-spin w-8 h-8 border-2 border-fuchsia-500 border-t-transparent rounded-full"></div>
            </div>
        }>
            <CamsContent />
        </Suspense>
    );
}
