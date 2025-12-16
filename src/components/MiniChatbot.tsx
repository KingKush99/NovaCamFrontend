'use client';

import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaLanguage, FaMicrophone, FaGlobe, FaImage, FaVideo, FaPaperclip } from 'react-icons/fa';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function MiniChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en', name: 'English', welcome: "Hello! I am Nova, your AI assistant. How can I help you today?" },
        { code: 'es', name: 'Español', welcome: "¡Hola! Soy Nova, tu asistente de IA. ¿Cómo puedo ayudarte hoy?" },
        { code: 'fr', name: 'Français', welcome: "Bonjour! Je suis Nova, votre assistant IA. Comment puis-je vous aider?" },
        { code: 'de', name: 'Deutsch', welcome: "Hallo! Ich bin Nova, Ihr KI-Assistent. Wie kann ich Ihnen heute helfen?" },
        { code: 'it', name: 'Italiano', welcome: "Ciao! Sono Nova, il tuo assistente IA. Come posso aiutarti oggi?" },
        { code: 'pt', name: 'Português', welcome: "Olá! Sou Nova, sua assistente de IA. Como posso ajudar você hoje?" },
        { code: 'ru', name: 'Русский', welcome: "Привет! Я Нова, ваш ИИ-помощник. Чем могу помочь?" },
        { code: 'zh', name: '中文', welcome: "你好！我是 Nova，你的 AI 助手。今天有什么可以帮你？" },
        { code: 'ja', name: '日本語', welcome: "こんにちは！私はNova、あなたのAIアシスタントです。今日はどのようなお手伝いができますか？" },
        { code: 'ko', name: '한국어', welcome: "안녕하세요! 저는 Nova, 당신의 AI 비서입니다. 무엇을 도와드릴까요?" },
    ];

    // Reset chat when language changes
    useEffect(() => {
        const lang = languages.find(l => l.name === selectedLanguage) || languages[0];
        setMessages([{ role: 'assistant', content: lang.welcome }]);
    }, [selectedLanguage]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: `[${selectedLanguage} AI Response]: I see you said "${userMessage}". As a simulated AI, I am learning!` }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center"
            >
                {isOpen ? <FaTimes className="text-white" /> : <FaRobot className="text-white text-xl" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 left-0 w-80 h-96 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
                    {/* Header */}
                    <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex items-center justify-between relative">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-bold text-white text-sm">Nova AI</span>
                        </div>

                        <button
                            onClick={() => setShowLanguages(!showLanguages)}
                            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-xs font-bold border border-zinc-800 px-2 py-1 rounded"
                        >
                            <FaGlobe /> {selectedLanguage}
                        </button>

                        {/* Language Dropdown */}
                        {showLanguages && (
                            <div className="absolute right-2 top-12 bg-zinc-900 border border-zinc-800 p-2 rounded-lg grid grid-cols-2 gap-1 z-20 shadow-xl w-64">
                                {languages.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => { setSelectedLanguage(lang.name); setShowLanguages(false); }}
                                        className={`text-left px-2 py-1 text-xs rounded hover:bg-zinc-800 ${selectedLanguage === lang.name ? 'text-cyan-400 font-bold' : 'text-zinc-400'}`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-800 rounded-2xl px-4 py-2 rounded-bl-none">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input & Uploads */}
                    <div className="bg-zinc-950 border-t border-zinc-800 p-3">
                        {/* Upload Toolbar */}
                        <div className="flex items-center gap-3 mb-2 px-1">
                            <button className="text-zinc-500 hover:text-cyan-400 transition-colors" title="Upload Audio"><FaMicrophone /></button>
                            <button className="text-zinc-500 hover:text-cyan-400 transition-colors" title="Upload Image"><FaImage /></button>
                            <button className="text-zinc-500 hover:text-cyan-400 transition-colors" title="Upload Video"><FaVideo /></button>
                            <button className="text-zinc-500 hover:text-cyan-400 transition-colors" title="Attach File"><FaPaperclip /></button>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={`Message Nova (${selectedLanguage})...`}
                                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="p-2 text-blue-500 hover:text-blue-400 disabled:opacity-50 transition-colors"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
