'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { useUserStore } from '@/store/useUserStore';
import performersData from '@/data/performers.json';
import { FaClock, FaHeart, FaSkull, FaTrophy, FaMedal } from 'react-icons/fa';
import confetti from 'canvas-confetti';

// Leaderboard Component
function Leaderboard({ score, currentRound, countdown, isGameOver }: {
    score: number;
    currentRound: number;
    countdown: number;
    isGameOver: boolean;
}) {
    // Mock leaderboard data (in production, fetch from API)
    const leaderboard = [
        { rank: 1, name: 'ProGamer99', score: 1800 },
        { rank: 2, name: 'QuizMaster', score: 1600 },
        { rank: 3, name: 'StarFinder', score: 1400 },
        { rank: 4, name: 'You', score: score, isPlayer: true },
        { rank: 5, name: 'NovicePlayer', score: 800 },
    ].sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1 }));

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <div className="text-center mb-6">
                    <FaTrophy className="text-5xl text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-black text-white">
                        {isGameOver ? 'GAME OVER!' : 'LEADERBOARD'}
                    </h2>
                    {!isGameOver && (
                        <p className="text-zinc-400 text-sm mt-2">
                            Round {currentRound} of 10
                        </p>
                    )}
                </div>

                {/* Leaderboard List */}
                <div className="space-y-2 mb-6">
                    {leaderboard.map((player) => (
                        <div
                            key={player.name}
                            className={`flex items-center gap-3 p-3 rounded-lg ${player.isPlayer
                                    ? 'bg-fuchsia-600/20 border border-fuchsia-500'
                                    : 'bg-zinc-800'
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${player.rank === 1 ? 'bg-yellow-500 text-black' :
                                    player.rank === 2 ? 'bg-gray-400 text-black' :
                                        player.rank === 3 ? 'bg-orange-600 text-white' :
                                            'bg-zinc-700 text-white'
                                }`}>
                                {player.rank}
                            </div>
                            <span className={`flex-1 font-bold ${player.isPlayer ? 'text-fuchsia-400' : 'text-white'}`}>
                                {player.name}
                            </span>
                            <span className="text-green-400 font-mono font-bold">
                                {player.score}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Countdown or Final Score */}
                {isGameOver ? (
                    <div className="text-center">
                        <p className="text-zinc-400 mb-2">Final Score</p>
                        <p className="text-4xl font-black text-green-400">{score}</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-zinc-400 text-sm">Next round in</p>
                        <p className="text-5xl font-black text-fuchsia-500">{countdown}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

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
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [gameOver, setGameOver] = useState(false);

    // Initialize round
    useEffect(() => {
        if (currentRound > 10) {
            handleGameOver();
            return;
        }

        // Select random target
        const target = performersData[Math.floor(Math.random() * performersData.length)];
        setTargetPerformer(target);

        // Select 3 distractors
        const distractors = performersData
            .filter(p => p.id !== target.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const allOptions = [target, ...distractors].sort(() => 0.5 - Math.random());
        setOptions(allOptions);

        setRoundOver(false);
        setSelectedOption(null);
        setIsCorrect(null);
        setTimeRemaining(10);
        setShowLeaderboard(false);
        setCountdown(3);
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

    // Leaderboard countdown
    useEffect(() => {
        if (!showLeaderboard || gameOver) return;

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowLeaderboard(false);
                    nextRound();
                    return 3;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showLeaderboard, gameOver]);

    const handleTimeUp = () => {
        setIsCorrect(false);
        setRoundOver(true);
        // Show leaderboard for 3 seconds
        setTimeout(() => {
            setShowLeaderboard(true);
        }, 500);
    };

    const handleSelect = (performerId: string) => {
        if (roundOver) return;

        setSelectedOption(performerId);
        const correct = performerId === targetPerformer.id;
        setIsCorrect(correct);
        setRoundOver(true);

        if (correct) {
            updateScore(200);
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.6 }
            });
        }

        // Show leaderboard after a brief delay
        setTimeout(() => {
            setShowLeaderboard(true);
        }, 1000);
    };

    const handleGameOver = () => {
        setGameOver(true);
        setShowLeaderboard(true);
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
            {/* Leaderboard Overlay */}
            <AnimatePresence>
                {showLeaderboard && (
                    <Leaderboard
                        score={score}
                        currentRound={currentRound}
                        countdown={countdown}
                        isGameOver={gameOver}
                    />
                )}
            </AnimatePresence>

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
