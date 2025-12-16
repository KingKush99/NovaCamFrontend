'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaPlay, FaExternalLinkAlt, FaSync } from 'react-icons/fa';

// Affiliate codes
const TOUR = 'LQps';
const CAMPAIGN = 'QvtQPh';

interface Performer {
    username: string;
    thumbnail: string;
    affiliateLink: string;
}

function CamsContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'women';
    const [loading, setLoading] = useState(true);
    const [performers, setPerformers] = useState<Performer[]>([]);
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

    // Map categories to gender codes
    const genderMap: Record<string, string> = {
        'featured': '',
        'women': 'f',
        'men': 'm',
        'couples': 'c',
        'trans': 't',
    };

    const fetchPerformers = async () => {
        setLoading(true);
        setFailedImages(new Set());

        try {
            const gender = genderMap[category.toLowerCase()] || 'f';
            const res = await fetch(`/api/performers?gender=${gender}&limit=50`);
            const data = await res.json();

            if (data.performers && data.performers.length > 0) {
                setPerformers(data.performers);
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

    const handleImageError = (username: string) => {
        setFailedImages(prev => new Set([...prev, username]));
    };

    // Filter out performers whose thumbnails failed to load (offline)
    const visiblePerformers = performers.filter(p => !failedImages.has(p.username));

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
                        {visiblePerformers.length} Live Streams
                    </p>
                </div>
                <div className="flex items-center gap-4">
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

            {/* Grid */}
            {!loading && visiblePerformers.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {visiblePerformers.map((performer) => (
                        <a
                            key={performer.username}
                            href={performer.affiliateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group hover:border-fuchsia-500 transition-all hover:scale-[1.02]"
                        >
                            {/* Thumbnail */}
                            <img
                                src={performer.thumbnail}
                                alt={performer.username}
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(performer.username)}
                            />

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
                        </a>
                    ))}
                </div>
            )}

            {/* No performers - show fallback grid from Chaturbate */}
            {!loading && visiblePerformers.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-zinc-500 mb-6">Loading streams from Chaturbate...</p>
                    {/* Embed Chaturbate's widget as fallback */}
                    <div className="w-full">
                        <iframe
                            src={`https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}&track=embed`}
                            className="w-full h-[600px] border-0 rounded-lg"
                            allow="autoplay"
                        />
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="mt-6 text-center text-zinc-600 text-[10px]">
                Click any cam to watch • Powered by Chaturbate
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
