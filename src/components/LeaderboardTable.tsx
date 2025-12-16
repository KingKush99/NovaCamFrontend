'use client';

import { FaTrophy, FaUser, FaMedal } from 'react-icons/fa';
import { MASTER_BAITER_TIERS } from '@/lib/tiers';

const MOCK_LEADERBOARD_USERS = [
    { rank: 1, username: 'GoonKing99', xp: 1250000, tierId: 10 },
    { rank: 2, username: 'SpeedRunner', xp: 950000, tierId: 9 },
    { rank: 3, username: 'JerkMasterFlex', xp: 820000, tierId: 9 },
    { rank: 4, username: 'PalmPilotPro', xp: 550000, tierId: 8 },
    { rank: 5, username: 'SoloLeveling', xp: 480000, tierId: 7 },
    { rank: 6, username: 'TheWatcher', xp: 320000, tierId: 6 },
    { rank: 7, username: 'TipToWin', xp: 210000, tierId: 6 },
    { rank: 8, username: 'LurkerNoMore', xp: 150000, tierId: 5 },
    { rank: 9, username: 'ChatSpammer', xp: 95000, tierId: 4 },
    { rank: 10, username: 'NewbieOne', xp: 45000, tierId: 3 },
];

export default function LeaderboardTable() {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="font-black text-xl text-white flex items-center gap-2">
                    <FaTrophy className="text-yellow-500" />
                    The Master-Baiter Rankings
                </h3>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded">
                    Resets: 1st of Month @ 12:00 AM
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-zinc-900/50 text-zinc-400 border-b border-zinc-800">
                            <th className="px-6 py-3 font-bold uppercase tracking-wider w-16">Rank</th>
                            <th className="px-6 py-3 font-bold uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 font-bold uppercase tracking-wider">Tier</th>
                            <th className="px-6 py-3 font-bold uppercase tracking-wider text-right">XP Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {MOCK_LEADERBOARD_USERS.map((user) => {
                            const tier = MASTER_BAITER_TIERS.find(t => t.id === user.tierId);

                            return (
                                <tr key={user.rank} className="hover:bg-zinc-800/50 transition-colors">
                                    <td className="px-6 py-4 font-black">
                                        {user.rank === 1 && <span className="text-2xl">🥇</span>}
                                        {user.rank === 2 && <span className="text-2xl">🥈</span>}
                                        {user.rank === 3 && <span className="text-2xl">🥉</span>}
                                        {user.rank > 3 && <span className="text-zinc-500">#{user.rank}</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                                                <FaUser className="text-zinc-400 text-xs" />
                                            </div>
                                            <span className="font-bold text-white">{user.username}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {tier && (
                                            <div className="flex items-center gap-2">
                                                {tier.icon && (
                                                    <img
                                                        src={tier.icon}
                                                        alt={tier.name}
                                                        className="w-6 h-6 object-contain"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                        }}
                                                    />
                                                )}
                                                <span
                                                    className="px-2 py-1 rounded text-xs font-bold uppercase tracking-wide border border-current/20"
                                                    style={{ color: tier.color.includes('gradient') ? '#FFD700' : tier.color }}
                                                >
                                                    {tier.name}
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-cyan-400 font-bold">
                                        {user.xp.toLocaleString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
