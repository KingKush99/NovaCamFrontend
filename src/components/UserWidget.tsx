'use client';

import { useUserStore } from '@/store/useUserStore';
import { getXPProgress, getTierFromXP } from '@/lib/tiers';
import { FaCoins, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from 'react';

export default function UserWidget() {
    const { data: session } = useSession();
    const { user, setUser } = useUserStore();

    useEffect(() => {
        if (session?.user && !user) {
            // Initialize store user from session
            setUser({
                username: session.user.name || 'User',
                xp: 0,
                tier: 1,
                tokens: 100, // Starting tokens
                wins: { meme: 0, pornstar: 0 },
                achievements: []
            });
        }
    }, [session, user, setUser]);

    if (!session) {
        return (
            <button
                onClick={() => signIn('google')}
                className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 px-6 rounded-full transition-colors shadow-[0_0_15px_rgba(217,70,239,0.4)]"
            >
                Login / Sign Up
            </button>
        );
    }

    if (!user) return null;

    const tier = getTierFromXP(user.xp);
    const progress = getXPProgress(user.xp);

    return (
        <div className="flex items-center gap-4">
            {/* Token Balance */}
            <div className="hidden md:flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-700">
                <FaCoins className="text-yellow-500" />
                <span className="font-bold text-white">{user.tokens.toLocaleString()}</span>
                <button className="text-xs bg-yellow-500 text-black font-bold px-2 py-0.5 rounded hover:bg-yellow-400 transition-colors">
                    BUY
                </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
                <div className="text-right hidden sm:block">
                    <Link href={`/profile/${user.username}`} className="block font-bold text-sm text-white hover:text-fuchsia-400 transition-colors">
                        {user.username}
                    </Link>
                    <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: tier.color }}>
                        {tier.name}
                    </div>
                </div>

                <div className="relative group cursor-pointer">
                    {/* Avatar Ring with Progress */}
                    <div className="w-10 h-10 rounded-full p-[2px] bg-zinc-800 relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full w-full bg-zinc-800"
                        />
                        <motion.div
                            className="absolute top-0 left-0 h-full rounded-full"
                            style={{ backgroundColor: tier.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-zinc-900 bg-zinc-800">
                            {session.user?.image ? (
                                <img src={session.user.image} alt={user.username} className="w-full h-full object-cover" />
                            ) : (
                                <FaUserCircle className="w-full h-full text-zinc-500" />
                            )}
                        </div>
                    </div>

                    {/* Dropdown (Simple) */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                        <Link href={`/profile/${user.username}`} className="block px-4 py-3 hover:bg-zinc-800 text-sm font-bold text-zinc-300 hover:text-white">
                            My Profile
                        </Link>
                        <Link href="/settings" className="block px-4 py-3 hover:bg-zinc-800 text-sm font-bold text-zinc-300 hover:text-white">
                            Settings
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="w-full text-left px-4 py-3 hover:bg-red-500/10 text-sm font-bold text-red-400 hover:text-red-300 flex items-center gap-2"
                        >
                            <FaSignOutAlt /> Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
