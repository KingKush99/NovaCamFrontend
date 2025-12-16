'use client';

import { useState } from 'react';
import { APPS, CATEGORIES, getPopularApps, getFreeApps, App } from '@/data/apps';
import { useAppStore } from '@/store/useAppStore';
import GlobalHeader from '@/components/GlobalHeader';
import Footer from '@/components/Footer';
import { FaDownload, FaCheck, FaStar, FaCrown, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

function AppCard({ app }: { app: App }) {
    const { installedApps, installApp, uninstallApp } = useAppStore();
    const isInstalled = installedApps.includes(app.id);

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-fuchsia-500/50 transition-all"
        >
            <div className="flex items-start gap-4">
                <div className="text-4xl w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center">
                    {app.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white truncate">{app.name}</h3>
                        {app.isPremium && <FaCrown className="text-yellow-500 text-xs" />}
                        {app.popular && <FaStar className="text-fuchsia-500 text-xs" />}
                    </div>
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{app.description}</p>
                    <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${app.price === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                            {app.price === 0 ? 'FREE' : `${app.price} tokens`}
                        </span>
                        <button
                            onClick={() => isInstalled ? uninstallApp(app.id) : installApp(app.id)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${isInstalled
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white'
                                }`}
                        >
                            {isInstalled ? <><FaCheck /> Installed</> : <><FaDownload /> Install</>}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function AppsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { installedApps } = useAppStore();

    const filteredApps = APPS.filter((app) => {
        const matchesCategory = !selectedCategory || app.category === selectedCategory;
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const popularApps = getPopularApps();
    const freeApps = getFreeApps().slice(0, 6);

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <GlobalHeader />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                        App Store
                    </h1>
                    <p className="text-gray-400">
                        50+ apps to supercharge your streams. Lovense integration, games, goals, and more!
                    </p>
                    <div className="mt-2 text-sm">
                        <span className="text-fuchsia-400 font-bold">{installedApps.length}</span>
                        <span className="text-zinc-500"> apps installed</span>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-6 relative max-w-xl">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search apps..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500"
                    />
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${!selectedCategory
                                ? 'bg-fuchsia-500 text-white'
                                : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                            }`}
                    >
                        All Apps
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === cat.id
                                    ? 'bg-fuchsia-500 text-white'
                                    : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                                }`}
                        >
                            <span>{cat.icon}</span> {cat.name}
                        </button>
                    ))}
                </div>

                {/* Popular Section (when no category selected) */}
                {!selectedCategory && !searchQuery && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FaStar className="text-fuchsia-500" /> Popular Apps
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {popularApps.map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Free Apps Section (when no category selected) */}
                {!selectedCategory && !searchQuery && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold mb-4 text-green-400">
                            🆓 Free Apps
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {freeApps.map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </div>
                )}

                {/* All Apps / Filtered Results */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold mb-4">
                        {selectedCategory
                            ? CATEGORIES.find(c => c.id === selectedCategory)?.name
                            : searchQuery
                                ? 'Search Results'
                                : 'All Apps'
                        }
                        <span className="text-zinc-500 font-normal ml-2">({filteredApps.length})</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredApps.map((app) => (
                            <AppCard key={app.id} app={app} />
                        ))}
                    </div>
                </div>

                {/* No Results */}
                {filteredApps.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <p>No apps found matching your criteria.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
