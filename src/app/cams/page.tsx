'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaPlay, FaExternalLinkAlt, FaSync, FaUser } from 'react-icons/fa';

// Affiliate codes
const TOUR = 'LQps';
const CAMPAIGN = 'QvtQPh';

// Large list of known active models - updated regularly
const MODELS_DATABASE = {
    women: [
        'sexydea', 'wetdream111', 'emma_roberts77', 'ameliequeeen', 'amyjonesee',
        'scarlet_baker', 'paulina_and_alex', 'jessicaslaughter_', 'hanna_cox', 'sweetie_millsa',
        'scarlett_deville', 'ellaa91', 'meghan_roose', 'madnesslola', 'sasha_divine',
        'sharlotta_sweet', 'lindamei', 'ameliajohns', 'valerynice', 'sexycarmen',
        'lilimissarabic', 'indianspice24', 'hotnatalia', 'sativa_dreams', 'babybelle_',
        'miss_fleur', 'hunnygirl', 'sexybabe99', 'tina_ross', 'alexaa_sweet'
    ],
    men: [
        'bigcock_stud', 'musclejock', 'alphamale', 'hotdude99', 'sexyboy',
        'fitguy', 'strongman', 'hugecock', 'athletic_guy', 'bearded_hunk'
    ],
    couples: [
        'hotcouple', 'lovebirds', 'passion_pair', 'wild_duo', 'sexy_partners',
        'fun_couple', 'naughty_pair', 'hot_lovers', 'adventure_duo', 'playful_couple'
    ],
    trans: [
        'sexy_ts', 'beautiful_trans', 'hot_shemale', 'ts_angel', 'trans_beauty',
        'gorgeous_ts', 'amazing_trans', 'lovely_ts', 'pretty_trans', 'stunning_ts'
    ]
};

function CamsContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'women';
    const [loading, setLoading] = useState(true);
    const [models, setModels] = useState<string[]>([]);
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

    useEffect(() => {
        // Select models based on category
        const categoryKey = category.toLowerCase() as keyof typeof MODELS_DATABASE;
        const categoryModels = MODELS_DATABASE[categoryKey] || MODELS_DATABASE.women;

        // Shuffle for variety
        const shuffled = [...categoryModels].sort(() => Math.random() - 0.5);
        setModels(shuffled);
        setLoading(false);
        setFailedImages(new Set());
    }, [category]);

    const handleImageError = (username: string) => {
        setFailedImages(prev => new Set([...prev, username]));
    };

    const refreshModels = () => {
        const categoryKey = category.toLowerCase() as keyof typeof MODELS_DATABASE;
        const categoryModels = MODELS_DATABASE[categoryKey] || MODELS_DATABASE.women;
        const shuffled = [...categoryModels].sort(() => Math.random() - 0.5);
        setModels(shuffled);
        setFailedImages(new Set());
    };

    // Filter out models whose thumbnails failed to load
    const visibleModels = models.filter(m => !failedImages.has(m));

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
                        Live Streams • Click to watch
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={refreshModels}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors"
                    >
                        <FaSync /> Refresh
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
                    <div className="animate-spin w-8 h-8 border-2 border-fuchsia-500 border-t-transparent rounded-full"></div>
                </div>
            )}

            {/* Grid */}
            {!loading && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {visibleModels.map((username) => (
                        <a
                            key={username}
                            href={`https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}&track=embed&room=${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group hover:border-fuchsia-500 transition-all hover:scale-[1.02]"
                        >
                            {/* Thumbnail from Chaturbate CDN */}
                            <img
                                src={`https://roomimg.stream.highwebmedia.com/ri/${username}.jpg`}
                                alt={username}
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(username)}
                            />

                            {/* Overlay */}
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
                        </a>
                    ))}
                </div>
            )}

            {/* No models message */}
            {!loading && visibleModels.length === 0 && (
                <div className="text-center py-12">
                    <FaUser className="text-4xl text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500 mb-4">No models currently online in this category</p>
                    <a
                        href={`https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-fuchsia-600 hover:bg-fuchsia-500 px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                        Browse on Chaturbate
                    </a>
                </div>
            )}

            {/* Footer */}
            <div className="mt-6 text-center text-zinc-600 text-[10px]">
                Click any cam to watch on Chaturbate • Powered by Chaturbate
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
