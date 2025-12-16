'use client';

import { App } from '@/data/apps';
import { FaStar } from 'react-icons/fa';

interface AppCardProps {
    app: App;
}

const AppCard = ({ app }: AppCardProps) => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-fuchsia-500/50 transition-all cursor-pointer group">
            {/* App Icon & Name */}
            <div className="flex items-start gap-3 mb-3">
                <div className="text-4xl">{app.icon}</div>
                <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-fuchsia-400 transition-colors">
                        {app.name}
                    </h3>
                    <p className="text-xs text-gray-400">by {app.developer}</p>
                </div>
                {!app.isFree && (
                    <span className="text-xs bg-fuchsia-500/20 text-fuchsia-400 px-2 py-1 rounded">
                        Paid
                    </span>
                )}
            </div>

            {/* Rating & Installs */}
            <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className="font-bold text-white">{app.rating}</span>
                    <span>({app.installs.toLocaleString()})</span>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{app.description}</p>

            {/* Tags */}
            {app.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                    {app.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs bg-zinc-800 text-cyan-400 px-2 py-1 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Install Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    // Mock install
                    alert(`Installing ${app.name}... Added to your room!`);
                }}
                className="w-full bg-zinc-800 hover:bg-fuchsia-600 text-white font-bold py-2 rounded-lg transition-colors text-sm uppercase tracking-wide"
            >
                Install to My Room
            </button>
        </div>
    );
};

export default AppCard;
