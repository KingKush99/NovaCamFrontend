'use client';

import { useState } from 'react';
import mockStreams from '@/data/mockStreams.json';

interface VideoPlayerProps {
    streamId: string;
}

export default function VideoPlayer({ streamId }: VideoPlayerProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Get stream data to find the actual Chaturbate username
    const stream = mockStreams.find(s => s.id === streamId);
    const chaturbateUsername = stream?.username || 'default_room';

    // Chaturbate iframe embed URL
    // Format: https://chaturbate.com/in/?tour=YOUR_TOUR&campaign=YOUR_CAMPAIGN&track=embed&room=USERNAME&bgcolor=black
    const embedUrl = `https://chaturbate.com/in/?tour=LQps&campaign=QvtQPh&track=embed&room=${chaturbateUsername}&bgcolor=black`;

    return (
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
            {/* Loading Placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white text-sm">Loading stream...</p>
                    </div>
                </div>
            )}

            {/* Chaturbate Embed */}
            <iframe
                src={embedUrl}
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                onLoad={() => setIsLoaded(true)}
                title={`${chaturbateUsername} live stream`}
            />

            {/* LIVE Indicator Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-xs font-bold text-white pointer-events-none z-10">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
            </div>
        </div>
    );
}
