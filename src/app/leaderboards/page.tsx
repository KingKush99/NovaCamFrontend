'use client';

import { useState, useEffect } from 'react';
import { FaTrophy, FaInfoCircle, FaClock, FaCommentDots, FaCoins, FaUserFriends, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import GlobalHeader from '@/components/GlobalHeader';
import Footer from '@/components/Footer';
import LeaderboardTable from '@/components/LeaderboardTable';
import { MASTER_BAITER_TIERS } from '@/lib/tiers';

export default function LeaderboardsPage() {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            // Find next month's 1st at 00:00
            const nextReset = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const diff = nextReset.getTime() - now.getTime();

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <GlobalHeader />

            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-black mb-4 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent filter drop-shadow-lg">
                        The Master-Baiter Tier List
                    </h1>

                    {/* Countdown Timer */}
                    <div className="flex flex-col items-center gap-2 mb-8">
                        <div className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Season Ends In</div>
                        <div className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                            <span className="font-mono text-3xl font-black text-white">{timeLeft}</span>
                        </div>
                    </div>
                </div>

                {/* Horizontal Tier Scroll */}
                <div className="mb-12 relative">
                    <h2 className="text-2xl font-black mb-6 px-4 flex items-center gap-2">
                        <FaInfoCircle className="text-cyan-400" /> Tier Requirements
                    </h2>

                    <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 px-4">
                        <div className="flex gap-4 min-w-max">
                            {MASTER_BAITER_TIERS.map((tier) => (
                                <div
                                    key={tier.id}
                                    className="w-80 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex-shrink-0 hover:border-zinc-600 transition-colors relative"
                                >
                                    <div
                                        className="h-1 w-full"
                                        style={{ background: tier.color }}
                                    />
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3
                                                className="text-lg font-black uppercase"
                                                style={{ color: tier.color.includes('gradient') ? '#FFD700' : tier.color }}
                                            >
                                                {tier.name}
                                            </h3>
                                            <span className="text-zinc-700 font-bold text-2xl">#{tier.id}</span>
                                        </div>
                                        <p className="text-zinc-400 text-xs mb-4 min-h-[40px]">{tier.description}</p>

                                        <div className="bg-zinc-950/50 rounded p-3 space-y-2">
                                            <div className="text-[10px] font-bold text-zinc-500 uppercase">
                                                Complete {tier.requirementsToMeet}:
                                            </div>
                                            {tier.requirements.tips && (
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-zinc-400">Tips</span>
                                                    <strong className="text-white">{tier.requirements.tips}+</strong>
                                                </div>
                                            )}
                                            {tier.requirements.timeInRoom && (
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-zinc-400">Time</span>
                                                    <strong className="text-white">{Math.round(tier.requirements.timeInRoom / 60)}h</strong>
                                                </div>
                                            )}
                                            {tier.requirements.chatsSent && (
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-zinc-400">Chats</span>
                                                    <strong className="text-white">{tier.requirements.chatsSent}+</strong>
                                                </div>
                                            )}
                                            {tier.requirements.friends && (
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-zinc-400">Friends</span>
                                                    <strong className="text-white">{tier.requirements.friends}+</strong>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Current Leaderboard */}
                <div className="mb-20">
                    <h2 className="text-2xl font-black mb-6 px-4 flex items-center gap-2">
                        <FaTrophy className="text-yellow-500" /> Current Standings
                    </h2>
                    <LeaderboardTable />
                </div>
            </main>

            <Footer />
        </div>
    );
}
