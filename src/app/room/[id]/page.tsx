'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import VideoPlayer from '@/components/VideoPlayer';
import ChatInterface from '@/components/ChatInterface';
import TipMenu from '@/components/TipMenu';
import TokenRain from '@/components/TokenRain';
import UserBioComponent from '@/components/UserBio';
import AppOverlay from '@/components/AppOverlay';
import { useAppEngine } from '@/hooks/useAppEngine';
import {
    LovenseLushApp, KingOfTiperApp, MultiGoalApp, TipVoteApp, RollDiceApp, EvolutionPetApp,
    TierGatekeeperApp, TugOfWarApp, QuestBoardApp, RaidBossApp
} from '@/apps';
import mockStreams from '@/data/mockStreams.json';
import { mockUserBio } from '@/data/userBio';
import { FaUser, FaHeart, FaBolt, FaCoins } from 'react-icons/fa';

export default function RoomPage() {
    const params = useParams();
    const roomId = params.id as string;
    const stream = mockStreams.find(s => s.id === roomId) || mockStreams[0];
    const [isRainActive, setIsRainActive] = useState(false);
    const [activeTab, setActiveTab] = useState<'bio' | 'pics' | 'rooms' | 'share'>('bio');
    const [userTokens, setUserTokens] = useState(25);

    // Initialize app engine with active apps
    const activeApps = [
        MultiGoalApp, KingOfTiperApp, EvolutionPetApp,
        TierGatekeeperApp, TugOfWarApp, QuestBoardApp, RaidBossApp
    ];
    const { appStates, appConfigs, simulateTip } = useAppEngine({ roomId, apps: activeApps });

    const triggerRain = () => setIsRainActive(true);

    const tabs = [
        { id: 'bio' as const, label: 'Bio' },
        { id: 'pics' as const, label: 'Pics & Videos' },
        { id: 'rooms' as const, label: 'More Rooms Like This' },
        { id: 'share' as const, label: 'Share' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            {/* Main Content (Video + Info + Bio) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
                {/* Video Player */}
                <div className="relative">
                    <VideoPlayer streamId={roomId} />

                    {/* App Overlays */}
                    <AppOverlay apps={activeApps} appStates={appStates} appConfigs={appConfigs} />

                    {/* Goal Bar Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-bold">Goal: White see-thru bra set</span>
                            <span className="text-cyan-400 text-sm font-bold">71% (3148/4400)</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 h-2 rounded-full" style={{ width: '71%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Stream Info */}
                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">{stream.username}</h1>
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                <span className="bg-zinc-800 px-2 py-0.5 rounded text-white">{stream.age}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <FaUser size={12} /> {stream.viewers.toLocaleString()} Viewers
                                </span>
                            </div>
                        </div>

                        <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 transition-colors">
                            <FaHeart /> Follow
                        </button>
                    </div>

                    <div className="flex gap-2 mb-3 flex-wrap">
                        {stream.tags.map(tag => (
                            <span key={tag} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">
                                #{tag}
                            </span>
                        ))}
                        <button onClick={triggerRain} className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full hover:bg-yellow-500/30 transition-colors flex items-center gap-1">
                            <FaBolt /> Test Rain
                        </button>
                        {/* Test Tip Buttons */}
                        <button onClick={() => simulateTip(50)} className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full hover:bg-green-500/30 transition-colors">
                            Tip 50
                        </button>
                        <button onClick={() => simulateTip(500)} className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full hover:bg-blue-500/30 transition-colors">
                            Tip 500
                        </button>
                        <button onClick={() => simulateTip(2000)} className="text-xs bg-purple-500/20 text-purple-500 px-2 py-1 rounded-full hover:bg-purple-500/30 transition-colors">
                            Tip 2000
                        </button>
                    </div>

                    {/* Token Count & Send Tip */}
                    <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>You currently have:</span>
                            <span className="flex items-center gap-1 font-bold text-yellow-500">
                                <FaCoins /> {userTokens} tokens
                            </span>
                        </div>
                        <button className="ml-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded font-bold transition-all">
                            SEND TIP
                        </button>
                    </div>
                </div>

                <TokenRain isActive={isRainActive} onComplete={() => setIsRainActive(false)} />

                {/* Tabs */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="flex border-b border-zinc-800">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 px-4 py-3 text-sm font-bold transition-colors ${activeTab === tab.id
                                    ? 'bg-zinc-800 text-white border-b-2 border-fuchsia-500'
                                    : 'text-gray-400 hover:text-white hover:bg-zinc-800/50'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-4">
                        {activeTab === 'bio' && <UserBioComponent bio={mockUserBio} />}
                        {activeTab === 'pics' && (
                            <div className="text-center text-gray-400 py-8">
                                <p>No pics & videos available</p>
                            </div>
                        )}
                        {activeTab === 'rooms' && (
                            <div className="text-center text-gray-400 py-8">
                                <p>Similar rooms coming soon</p>
                            </div>
                        )}
                        {activeTab === 'share' && (
                            <div className="text-center text-gray-400 py-8">
                                <p>Share options coming soon</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tip Menu (Mobile/Tablet only) */}
                <div className="lg:hidden">
                    <TipMenu />
                </div>
            </div>

            {/* Sidebar (Chat + Tips) */}
            <div className="flex flex-col gap-4 h-full">
                <div className="hidden lg:block">
                    <TipMenu />
                </div>
                <div className="flex-1 min-h-0">
                    <ChatInterface />
                </div>
            </div>
        </div>
    );
}
