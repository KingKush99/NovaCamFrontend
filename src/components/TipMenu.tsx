'use client';



import { useState } from 'react';
import { FaCoins, FaBolt, FaHeart, FaGem } from 'react-icons/fa';
import { useUserStore } from '@/store/useUserStore';

export default function TipMenu() {
    const { spendTokens } = useUserStore();
    const [customAmount, setCustomAmount] = useState('');

    const handleTip = (amount: number) => {
        if (spendTokens(amount)) {
            // Trigger tip animation/notification
            console.log(`Tipped ${amount} tokens`);
        } else {
            alert("Not enough tokens!");
        }
    };

    const tipOptions = [
        { amount: 10, label: 'Nice', icon: FaHeart, color: 'text-pink-500' },
        { amount: 50, label: 'Great', icon: FaBolt, color: 'text-yellow-400' },
        { amount: 100, label: 'Amazing', icon: FaGem, color: 'text-blue-400' },
        { amount: 500, label: 'Goddess', icon: FaCoins, color: 'text-fuchsia-500' },
    ];

    return (
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">Send Tip</h3>

            <div className="grid grid-cols-4 gap-2 mb-4">
                {tipOptions.map((option) => (
                    <button
                        key={option.amount}
                        onClick={() => handleTip(option.amount)}
                        className="flex flex-col items-center justify-center p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 hover:scale-105 transition-all border border-zinc-700 hover:border-fuchsia-500/50 group"
                    >
                        <option.icon className={`text-xl mb-1 ${option.color} group-hover:animate-bounce`} />
                        <span className="font-bold text-white text-sm">{option.amount}</span>
                    </button>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Custom Amount"
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-fuchsia-500"
                />
                <button
                    onClick={() => handleTip(Number(customAmount))}
                    disabled={!customAmount}
                    className="bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-4 py-2 rounded-lg transition-colors"
                >
                    Tip
                </button>
            </div>
        </div>
    );
}
