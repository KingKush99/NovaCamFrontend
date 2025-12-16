'use client';

import { useState } from 'react';
import { mockApps, appCategories } from '@/data/apps';
import AppCard from '@/components/AppCard';
import GlobalHeader from '@/components/GlobalHeader';
import Footer from '@/components/Footer';

export default function AppsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All in one');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredApps = mockApps.filter((app) => {
        const matchesCategory =
            selectedCategory === 'All in one' || app.category === selectedCategory;
        const matchesSearch = app.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getAppsByTag = (tag: string) => {
        return mockApps.filter((app) => app.tags.includes(tag));
    };

    const topEarning = getAppsByTag('Top Earning');
    const trending = getAppsByTag('Trending');
    const popularFree = getAppsByTag('Popular Free');
    const recentlyUpdated = getAppsByTag('Recently Updated');

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <GlobalHeader />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                        Unleash the Power of Chat
                    </h1>
                    <p className="text-gray-400">
                        Supercharge room engagement with tip menus, overlays, and fun games.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search stuffs or app name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500"
                    />
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {appCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === category
                                    ? 'bg-fuchsia-500 text-white'
                                    : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Top Earning Section */}
                {selectedCategory === 'All in one' && topEarning.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Top Earning</h2>
                            <button className="text-cyan-400 text-sm hover:underline">
                                See All →
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {topEarning.slice(0, 6).map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Trending Section */}
                {selectedCategory === 'All in one' && trending.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Trending</h2>
                            <button className="text-cyan-400 text-sm hover:underline">
                                See All →
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {trending.slice(0, 6).map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Popular Free Section */}
                {selectedCategory === 'All in one' && popularFree.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Popular Free</h2>
                            <button className="text-cyan-400 text-sm hover:underline">
                                See All →
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {popularFree.slice(0, 6).map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Recently Updated Section */}
                {selectedCategory === 'All in one' && recentlyUpdated.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Recently Updated</h2>
                            <button className="text-cyan-400 text-sm hover:underline">
                                See All →
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentlyUpdated.slice(0, 6).map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Filtered Results */}
                {selectedCategory !== 'All in one' && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold mb-4">
                            {selectedCategory} ({filteredApps.length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredApps.map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </div>
                )}

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
