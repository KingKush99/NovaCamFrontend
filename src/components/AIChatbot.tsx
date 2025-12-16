'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaRobot, FaPaperPlane, FaGlobe } from 'react-icons/fa';

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [language, setLanguage] = useState('English');

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate bot response
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                text: "I'm just a demo bot right now, but I love your enthusiasm!",
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-80 bg-zinc-900 border-2 border-yellow-400 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                    >
                        {/* Header */}
                        <div className="bg-zinc-800 p-3 flex items-center justify-between border-b border-zinc-700">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
                                    <FaRobot className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">AI Assistant</h3>
                                    <div className="flex items-center gap-1 text-[10px] text-green-400">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                        Online
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    className="text-xs bg-zinc-700 hover:bg-zinc-600 text-white px-2 py-1 rounded flex items-center gap-1 transition-colors"
                                    onClick={() => setLanguage(language === 'English' ? 'Spanish' : 'English')}
                                >
                                    <FaGlobe /> {language}
                                </button>
                                <button onClick={toggleChat} className="text-zinc-400 hover:text-white bg-red-600 hover:bg-red-500 rounded-full p-1 w-6 h-6 flex items-center justify-center transition-colors">
                                    <FaTimes size={12} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-64 overflow-y-auto p-4 space-y-3 bg-zinc-900/95">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-violet-600 text-white rounded-br-none'
                                            : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Language switch notification simulation */}
                            <div className="flex justify-center my-2">
                                <span className="text-[10px] text-yellow-500 border border-yellow-500/30 bg-yellow-500/10 px-2 py-1 rounded-full">
                                    Language switched to {language}
                                </span>
                            </div>
                        </div>

                        {/* Input */}
                        <form onSubmit={sendMessage} className="p-3 bg-zinc-800 border-t border-zinc-700 flex gap-2">
                            <button type="button" className="text-zinc-400 hover:text-white p-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                            </button>
                            <button type="button" className="text-zinc-400 hover:text-white p-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-zinc-700/50 border border-zinc-600 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-violet-600 hover:bg-violet-500 text-white p-2 rounded-full transition-colors w-9 h-9 flex items-center justify-center"
                            >
                                <FaPaperPlane size={14} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleChat}
                    className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)] flex items-center justify-center overflow-hidden"
                >
                    <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center">
                        <FaRobot className="text-white text-xl" />
                    </div>
                </motion.button>
            )}
        </div>
    );
}
