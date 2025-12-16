'use client';

import { useState } from 'react';
import { FaTimes, FaGift, FaPlayCircle } from 'react-icons/fa';

interface SimpleModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

function SimpleModal({ isOpen, onClose, title, children }: SimpleModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex justify-between items-center">
                    <h3 className="font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white"><FaTimes /></button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function WatchAdsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <SimpleModal isOpen={isOpen} onClose={onClose} title="Watch Ads & Earn">
            <div className="text-center space-y-4">
                <FaPlayCircle className="text-5xl text-yellow-500 mx-auto animate-pulse" />
                <p className="text-zinc-300 text-sm">Watch a short video to earn <strong>5 Free Tokens</strong>!</p>
                <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition-colors">
                    Watch Video
                </button>
            </div>
        </SimpleModal>
    );
}
