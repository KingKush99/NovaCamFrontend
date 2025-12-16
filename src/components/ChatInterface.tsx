'use client';

import { useState } from 'react';
import { FaPaperPlane, FaUser, FaGamepad, FaCog } from 'react-icons/fa';
import { useUserStore } from '@/store/useUserStore';
import { getTierFromXP } from '@/lib/tiers';

export default function ChatInterface() {
    const [activeTab, setActiveTab] = useState<'chat' | 'users' | 'games'>('chat');
    const [message, setMessage] = useState('');
    const { user } = useUserStore();

    // Mock messages
    const [messages, setMessages] = useState([
        { id: 1, user: 'GoonCommander99', tier: 8, text: 'This stream is fire! 🔥', type: 'chat' },
        { id: 2, user: 'System', tier: 0, text: 'NeonGoddess started a game of Name That Meme!', type: 'system' },
        { id: 3, user: 'Newbie_1', tier: 1, text: 'How do I play?', type: 'chat' },
    ]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !user) return;

        const newMsg = {
            id: Date.now(),
            user: user.username,
            tier: user.tier,
            text: message,
            type: 'chat'
        };

        setMessages(prev => [...prev, newMsg]);
        setMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-zinc-800">
                {[
                    { id: 'chat', icon: FaPaperPlane, label: 'Chat' },
                    { id: 'users', icon: FaUser, label: 'Users' },
                    { id: 'games', icon: FaGamepad, label: 'Games' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${activeTab === tab.id
                            ? 'bg-zinc-800 text-white border-b-2 border-fuchsia-500'
                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                            }`}
                    >
                        <tab.icon />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === 'chat' && (
                    <>
                        {messages.map((msg) => {
                            const tier = getTierFromXP(msg.tier * 5000); // Approximate XP for tier color

                            if (msg.type === 'system') {
                                return (
                                    <div key={msg.id} className="text-xs font-bold text-fuchsia-400 bg-fuchsia-500/10 p-2 rounded border border-fuchsia-500/20 text-center">
                                        {msg.text}
                                    </div>
                                );
                            }

                            return (
                                <div key={msg.id} className="text-sm">
                                    <span className="font-bold mr-2 cursor-pointer hover:underline" style={{ color: tier?.chatColor || '#fff' }}>
                                        {msg.user}:
                                    </span>
                                    <span className="text-zinc-300">{msg.text}</span>
                                </div>
                            );
                        })}
                    </>
                )}

                {activeTab === 'users' && (
                    <div className="text-center text-zinc-500 mt-10">User list mock...</div>
                )}

                {activeTab === 'games' && (
                    <div className="space-y-4">
                        <div className="bg-zinc-800 p-3 rounded-lg border border-zinc-700">
                            <h4 className="font-bold text-white mb-2">Challenge the Room</h4>
                            <p className="text-xs text-zinc-400 mb-3">Start a game of Name That Meme for 50 tokens.</p>
                            <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 rounded transition-colors text-sm">
                                Start Game (50 🪙)
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-zinc-800 border-t border-zinc-700 flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Say something..."
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-fuchsia-500"
                />
                <button
                    type="submit"
                    className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white p-2 rounded transition-colors"
                >
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );
}
