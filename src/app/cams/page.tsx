'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaPlay, FaExternalLinkAlt, FaSync, FaUser } from 'react-icons/fa';

// Affiliate codes
const TOUR = 'LQps';
const CAMPAIGN = 'QvtQPh';

interface Performer {
    username: string;
    affiliateLink: string;
}

// Known active performers - these will show with placeholder styling
// Images are not reliable due to Chaturbate CDN SSL issues
const PERFORMERS = {
    f: ['lindamei', 'anna_monik', 'monika_reed1', 'melissa_lins', 'kira_making', 'sara_croft_', 'hollyextra', 'jessicaxq', 'yourkarma', 'candy_sweet_xxx', 'foxandfoxy', 'missani', 'katy_sweet', 'meowhatever', 'cutie_girl', 'daisy_doll_', 'sweet_kattie', 'julia_angel', 'nataly_gold', 'angel_eyes88'],
    m: ['damianfit', 'alphafit', 'hotguy_x', 'sexyboy99', 'musclehunk', 'bigcock_guy', 'ryan_hot', 'athletic_man', 'strongboy', 'bearded_hunk'],
    c: ['hotcouple_xxx', 'lovebirds_x', 'passion_couple', 'wild_duo', 'kinky_pair', 'fun_lovers', 'naughty_two', 'hot_partners', 'sexy_couple', 'playful_duo'],
    t: ['ts_angel', 'trans_queen', 'sexy_ts', 'beautiful_shemale', 'hot_trans', 'gorgeous_ts', 'amazing_trans', 'lovely_tgirl', 'pretty_trans', 'stunning_ts']
};

function CamsContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'women';
    const [performers, setPerformers] = useState<Performer[]>([]);

    const genderMap: Record<string, keyof typeof PERFORMERS> = {
        'featured': 'f',
        'women': 'f',
        'men': 'm',
        'couples': 'c',
        'trans': 't',
    };

    useEffect(() => {
        const gender = genderMap[category.toLowerCase()] || 'f';
        const usernames = PERFORMERS[gender];

        // Shuffle for variety
        const shuffled = [...usernames].sort(() => Math.random() - 0.5);

        setPerformers(shuffled.map(username => ({
            username,
            affiliateLink: `https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}&track=embed&room=${username}`
        })));
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
                        Click to watch on Chaturbate
                    </p>
                </div>
                <a
                    href={`https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                >
                    Browse All <FaExternalLinkAlt className="text-xs" />
                </a>
            </div>

            {/* Grid - Styled cards without thumbnails (due to CDN SSL issues) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {performers.map((performer, i) => (
                    <a
                        key={performer.username}
                        href={performer.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
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
                    </a>
                ))}
            </div>

            {/* Info Banner */}
            <div className="mt-8 bg-gradient-to-r from-fuchsia-900/30 to-purple-900/30 border border-fuchsia-500/30 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2">🎥 Want to see live previews?</h3>
                <p className="text-zinc-400 text-sm mb-4">
                    Click any cam above to watch live on Chaturbate!
                </p>
                <a
                    href={`https://chaturbate.com/in/?tour=${TOUR}&campaign=${CAMPAIGN}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-fuchsia-600 hover:bg-fuchsia-500 px-6 py-3 rounded-lg font-bold transition-colors"
                >
                    Browse All Live Cams
                </a>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-zinc-600 text-[10px]">
                All cams redirect to Chaturbate • Affiliate Program
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
