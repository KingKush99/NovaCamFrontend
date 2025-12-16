'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { useUserStore } from '@/store/useUserStore';
import performersData from '@/data/performers.json';
import { FaClock, FaHeart, FaSkull } from 'react-icons/fa';
import confetti from 'canvas-confetti';

export default function NameThatPornstar() {
    const {
        currentRound, score, timeRemaining, isPlaying,
        nextRound, updateScore, setTimeRemaining, endGame
    } = useGameStore();
    const { addXP, addWin, addTokens } = useUserStore();

    const [targetPerformer, setTargetPerformer] = useState<any>(null);
    const [options, setOptions] = useState<any[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [roundOver, setRoundOver] = useState(false);

    // Initialize round
    useEffect(() => {
        if (currentRound > 10) { // 10 rounds for this game
            handleGameOver();
            return;
        }

        // Select random target
        const target = performersData[Math.floor(Math.random() * performersData.length)];
        setTargetPerformer(target);

        // Select 3 distractors (ensure unique)
        const distractors = performersData
            .filter(p => p.id !== target.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        // Shuffle options
        const allOptions = [target, ...distractors].sort(() => 0.5 - Math.random());
        setOptions(allOptions);

        setRoundOver(false);
        setSelectedOption(null);
        setIsCorrect(null);
        setTimeRemaining(10);
    }, [currentRound]);

    // Timer logic
    useEffect(() => {
        if (roundOver || !isPlaying) return;

        const timer = setInterval(() => {
            if (timeRemaining <= 0) {
                handleTimeUp();
            } else {
                setTimeRemaining(timeRemaining - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, roundOver, isPlaying]);

    const handleTimeUp = () => {
        setIsCorrect(false);
        setRoundOver(true);
        setTimeout(nextRound, 3000);
    };

    const handleSelect = (performerId: string) => {
        if (roundOver) return;

        setSelectedOption(performerId);
        const correct = performerId === targetPerformer.id;
        setIsCorrect(correct);
        setRoundOver(true);

        if (correct) {
            updateScore(200); // 200 points per correct answer
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.6 }
            });
            setTimeout(nextRound, 1500);
        } else {
            // Delay for wrong answer to see correction
            setTimeout(nextRound, 3000);
        }
    };

    const handleGameOver = () => {
        endGame();
        addXP(score);
        if (score >= 1500) {
            addWin('pornstar');
            addTokens(100);
        }
    };

    if (!targetPerformer) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 w-full">
            {/* Header Stats */}
            <div className="flex justify-between items-center mb-8 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
                <div className="text-xl font-bold text-white">
                    Round <span className="text-fuchsia-500">{currentRound}/10</span>
                </div>
                <div className="flex items-center gap-2 text-3xl font-mono font-bold text-yellow-400">
                    <FaClock className={timeRemaining < 3 ? 'text-red-500 animate-pulse' : 'text-yellow-500'} />
                    {timeRemaining}s
                </div>
                <div className="text-xl font-bold text-white">
                    Score: <span className="text-green-400">{score}</span>
                </div>
            </div>

            {/* The Prompt */}
            <div className="text-center mb-8">
                <h2 className="text-zinc-400 text-lg uppercase tracking-widest mb-2">Find</h2>
                <h1 className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    {targetPerformer.name}
                </h1>
                {/* Answer Reveal Hint */}
                {roundOver && !isCorrect && (
                    <div className="mt-4 text-red-500 font-bold animate-pulse">
                        Time's up! Look for the green match!
                    </div>
                )}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
                {options.map((performer) => {
                    const isSelected = selectedOption === performer.id;
                    const isTarget = performer.id === targetPerformer.id;

                    let borderClass = "border-zinc-800 hover:border-white/50";
                    if (roundOver) {
                        if (isTarget) borderClass = "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] ring-4 ring-green-500/20";
                        else if (isSelected && !isTarget) borderClass = "border-red-500 opacity-50 ring-4 ring-red-500/20";
                        else borderClass = "border-zinc-800 opacity-30 grayscale";
                    }

                    return (
                        <motion.button
                            key={performer.id}
                            whileHover={!roundOver ? { scale: 1.02 } : {}}
                            whileTap={!roundOver ? { scale: 0.98 } : {}}
                            onClick={() => handleSelect(performer.id)}
                            disabled={roundOver}
                            className={`relative aspect-[3/4] rounded-xl overflow-hidden border-4 transition-all ${borderClass}`}
                        >
                            <Image
                                src={performer.imagePath}
                                alt="Performer option"
                                fill
                                className="object-cover"
                            />

                            {/* Result Overlay */}
                            {roundOver && isTarget && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-500/40 backdrop-blur-sm">
                                    <FaHeart className="text-6xl text-white drop-shadow-lg animate-bounce mb-2" />
                                    <span className="text-white font-black text-2xl drop-shadow-md">CORRECT</span>
                                </div>
                            )}
                            {roundOver && isSelected && !isTarget && (
                                <div className="absolute inset-0 flex items-center justify-center bg-red-500/40 backdrop-blur-sm">
                                    <FaSkull className="text-6xl text-white drop-shadow-lg" />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
