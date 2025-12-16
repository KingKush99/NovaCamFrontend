'use client';

import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

interface StreamPlayerModalProps {
    username: string;
    onClose: () => void;
}

export default function StreamPlayerModal({ username, onClose }: StreamPlayerModalProps) {
    const TOUR_CODE = 'LQps';
    const CAMPAIGN_CODE = 'QvtQPh';

    // The official Embed URL
    const embedUrl = `https://chaturbate.com/embed/${username}/?bgcolor=black`;
    const fullLink = `https://chaturbate.com/in/?tour=${TOUR_CODE}&campaign=${CAMPAIGN_CODE}&track=embed_player&room=${username}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-zinc-900 border-b border-zinc-800">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        {username}
                    </h3>
                    <div className="flex items-center gap-3">
                        <a
                            href={fullLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 font-semibold"
                        >
                            Open Full Site <FaExternalLinkAlt />
                        </a>
                        <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* Player Iframe */}
                <div className="aspect-video w-full bg-black relative group">
                    {/* Overlay to prevent clickjacking blocks? No, Chaturbate embed usually allows interaction. */}
                    <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        allowFullScreen
                        sandbox="allow-same-origin allow-scripts allow-forms"
                        frameBorder="0"
                    />
                </div>
            </div>
        </div>
    );
}
