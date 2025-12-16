'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CamsContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'featured';

    // Affiliate params
    const TOUR = 'LQps';
    const CAMPAIGN = 'QvtQPh';

    // Map categories to Chaturbate gender codes
    const genderMap: Record<string, string> = {
        'featured': '',
        'women': 'f',
        'men': 'm',
        'couples': 'c',
        'trans': 't',
    };

    const gender = genderMap[category.toLowerCase()] || '';

    // Build the Chaturbate affiliate embed URL
    // This is the official Chaturbate affiliate iframe that shows dynamic live cams
    const embedUrl = `https://chaturbate.com/affiliates/in/?tour=${TOUR}&campaign=${CAMPAIGN}&track=embed&bgcolor=black&disable_sound=0&embed_video_only=0${gender ? `&gender=${gender}` : ''}`;

    return (
        <div className="w-full">
            {/* Chaturbate's Full Embed - Exact same as their site */}
            <iframe
                src={embedUrl}
                className="w-full border-0 rounded-lg"
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ minHeight: 'calc(100vh - 200px)', height: '100%' }}
            />
        </div>
    );
}

export default function CamsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center text-white h-64">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-fuchsia-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-zinc-500">Loading cams...</p>
                </div>
            </div>
        }>
            <CamsContent />
        </Suspense>
    );
}
