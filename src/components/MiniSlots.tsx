'use client';

import { useState } from 'react';
import { FaDice, FaTimes, FaCoins, FaCog, FaChevronDown } from 'react-icons/fa';

export default function MiniSlots() {
    const [isOpen, setIsOpen] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [numReels, setNumReels] = useState(3);
    const [betAmount, setBetAmount] = useState(10);
    const [result, setResult] = useState<string[]>(Array(3).fill('🍒'));
    const [credits, setCredits] = useState(1000);
    const [showSettings, setShowSettings] = useState(false);

    const symbols = ['🍒', '🍋', '🍇', '💎', '7️⃣', '🎰', '🔔', '⭐'];
    const bets = [10, 25, 50, 100, 250];
    const reelOptions = [3, 4, 5, 6];

    // Update result array when numReels changes
    const handleReelChange = (n: number) => {
        setNumReels(n);
        setResult(Array(n).fill('7️⃣'));
        setShowSettings(false);
    };

    const spin = () => {
        if (credits < betAmount) {
            alert("Not enough credits!");
            return;
        }

        setCredits(prev => prev - betAmount);
        setSpinning(true);

        const spinInterval = setInterval(() => {
            setResult(prev => prev.map(() => symbols[Math.floor(Math.random() * symbols.length)]));
        }, 80);

        setTimeout(() => {
            clearInterval(spinInterval);
            const finalResult = Array(numReels).fill(0).map(() => symbols[Math.floor(Math.random() * symbols.length)]);
            setResult(finalResult);
            setSpinning(false);
            checkWin(finalResult);
        }, 2000);
    };

    const checkWin = (res: string[]) => {
        const allMatch = res.every(val => val === res[0]);
        if (allMatch) {
            const winAmount = betAmount * (numReels * 5); // Huge jackpot for more reels
            setCredits(prev => prev + winAmount);
            // alert(`JACKPOT! Won ${winAmount} credits!`);
        } else {
            // Simple pair check for 3 reels (legacy logic), expanded for N reels could be complex
            // For now, keep it simple: match first 2 or last 2
            // Or just basic "Any 2 match" logic?
            // Let's stick to "All Match" for big wins to keep it simple for a mini-game
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 hover:scale-110 transition-transform shadow-[0_0_15px_rgba(251,191,36,0.5)] flex items-center justify-center animate-bounce-slow"
            >
                {isOpen ? <FaTimes className="text-white" /> : <FaDice className="text-white text-xl" />}
            </button>

            {/* Slots Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 bg-zinc-900/95 backdrop-blur-md border border-yellow-500/30 rounded-2xl shadow-2xl flex overflow-hidden animate-in slide-in-from-bottom-5 duration-200">

                    {/* Main Game Area */}
                    <div className="flex-1 flex flex-col">
                        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-3 text-center border-b border-yellow-500/20 relative">
                            <h3 className="font-black text-white italic tracking-wider">MINI SLOTS</h3>
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                            >
                                <FaCog />
                            </button>
                        </div>

                        {/* Settings Overlay */}
                        {showSettings && (
                            <div className="absolute inset-x-0 top-12 bottom-0 bg-zinc-900/95 z-20 p-4 flex flex-col gap-4 animate-in fade-in">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Reels</label>
                                    <div className="flex gap-2">
                                        {reelOptions.map(n => (
                                            <button
                                                key={n}
                                                onClick={() => handleReelChange(n)}
                                                className={`flex-1 py-1 rounded border ${numReels === n ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-gray-400 border-zinc-700'}`}
                                            >
                                                {n}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Bet Amount</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {bets.map(b => (
                                            <button
                                                key={b}
                                                onClick={() => { setBetAmount(b); setShowSettings(false); }}
                                                className={`py-1 rounded border text-sm ${betAmount === b ? 'bg-green-600 text-white border-green-500' : 'bg-transparent text-gray-400 border-zinc-700'}`}
                                            >
                                                {b}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="p-4 flex flex-col gap-4 items-center">
                            {/* Display */}
                            <div className="flex gap-1 bg-black/50 p-3 rounded-xl border border-yellow-500/20 shadow-inner overflow-x-auto max-w-full">
                                {result.map((symbol, i) => (
                                    <div key={i} className="w-10 h-10 bg-white rounded-lg flex-shrink-0 flex items-center justify-center text-xl shadow-lg">
                                        {symbol}
                                    </div>
                                ))}
                            </div>

                            {/* Controls */}
                            <div className="w-full flex flex-col gap-3">
                                <div className="flex justify-between items-center bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-2">
                                        <FaCoins className="text-yellow-400" />
                                        <span className="font-mono font-bold text-yellow-400">{credits}</span>
                                    </div>
                                    <div className="text-xs font-bold text-zinc-500">
                                        BET: <span className="text-white">{betAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lever Handle Section */}
                    <div className="w-8 bg-zinc-800 border-l border-zinc-700 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-1 bg-zinc-950 rounded-full"></div>

                        {/* The Knob */}
                        <div
                            onClick={!spinning ? spin : undefined}
                            className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-600 border-2 border-red-800 shadow-lg cursor-pointer transition-all duration-300 ${spinning ? 'top-[80%]' : 'top-[10%]'} hover:bg-red-500`}
                        >
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
