'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { useUserStore } from '@/store/useUserStore';
import { checkMultipleAnswers } from '@/lib/fuzzyMatch';
import memesData from '@/data/memes.json';
import { FaClock, FaCheck, FaTimes, FaUsers, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import confetti from 'canvas-confetti';

// Simulated Opponents
const OPPONENTS = [
    { name: 'MemeLord69', color: 'text-red-400' },
    { name: 'DogeCoiner', color: 'text-yellow-400' },
    { name: 'PepeHands', color: 'text-green-400' },
    { name: 'RickRoller', color: 'text-blue-400' }
];

export default function NameThatMeme() {
    const {
        currentRound, score, timeRemaining, isPlaying,
        nextRound, updateScore, setTimeRemaining, endGame
    } = useGameStore();
    const { addXP, addWin, addTokens } = useUserStore();

    const [currentMeme, setCurrentMeme] = useState<any>(null);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [roundOver, setRoundOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Multiplayer State
    const [opponentScores, setOpponentScores] = useState<Record<string, number>>({});
    const [muted, setMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize round
    useEffect(() => {
        if (currentRound > 5) {
            handleGameOver();
            return;
        }

        // Select random meme
        const randomMeme = memesData[Math.floor(Math.random() * memesData.length)];
        setCurrentMeme(randomMeme);
        setRoundOver(false);
        setFeedback(null);
        setInput('');
        setTimeRemaining(15);

        // Focus input
        setTimeout(() => inputRef.current?.focus(), 100);
    }, [currentRound]);

    // Timer logic
    useEffect(() => {
        if (roundOver || !isPlaying) return;

        const timer = setInterval(() => {
            if (timeRemaining <= 0) {
                handleTimeUp();
            } else {
                setTimeRemaining(timeRemaining - 1);

                // Simulate opponent activity
                if (Math.random() > 0.8) {
                    const randomOpponent = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
                    setOpponentScores(prev => ({
                        ...prev,
                        [randomOpponent.name]: (prev[randomOpponent.name] || 0) + 50
                    }));
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, roundOver, isPlaying]);

    // Soundtrack
    useEffect(() => {
        audioRef.current = new Audio('/assets/sounds/arcade_loop.mp3'); // Placeholder path
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        if (isPlaying && !muted) {
            audioRef.current.play().catch(() => { }); // Catch autoplay errors
        }

        return () => {
            audioRef.current?.pause();
        };
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            if (muted) audioRef.current.pause();
            else if (isPlaying) audioRef.current.play().catch(() => { });
        }
    }, [muted, isPlaying]);

    const handleTimeUp = () => {
        setFeedback('wrong');
        setRoundOver(true);
        setTimeout(nextRound, 3000); // Longer delay to read answer
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (roundOver) return;

        const isCorrect = checkMultipleAnswers(input, currentMeme.answers);

        if (isCorrect) {
            const points = timeRemaining > 10 ? 100 : 50;
            updateScore(points);
            setFeedback('correct');
            setRoundOver(true);
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
            setTimeout(nextRound, 2000);
        } else {
            // Shake effect could go here
            setInput('');
        }
    };

    const handleGameOver = () => {
        endGame();
        addXP(score); // 1 XP per point
        if (score > 300) {
            addWin('meme');
            addTokens(50); // Bonus tokens for high score
        }
    };

    if (!currentMeme) return <div>Loading...</div>;

    return (
        <div className="flex gap-6 w-full max-w-6xl mx-auto p-4 flex-col lg:flex-row items-start">

            {/* Main Game Area */}
            <div className="flex-1 w-full max-w-2xl mx-auto">
                {/* Header Stats */}
                <div className="flex justify-between items-center mb-6 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
                    <div className="text-xl font-bold text-white">
                        Round <span className="text-fuchsia-500">{currentRound}/5</span>
                    </div>
                    <div className="flex items-center gap-2 text-2xl font-mono font-bold text-yellow-400">
                        <FaClock className={timeRemaining < 5 ? 'text-red-500 animate-pulse' : 'text-yellow-500'} />
                        {timeRemaining}s
                    </div>
                    <div className="text-xl font-bold text-white">
                        Score: <span className="text-green-400">{score}</span>
                    </div>
                    <button onClick={() => setMuted(!muted)} className="text-zinc-500 hover:text-white">
                        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                </div>

                {/* Game Area */}
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden mb-6 border-2 border-zinc-800 shadow-2xl">
                    <Image
                        src={currentMeme.imagePath}
                        alt="Name this meme"
                        fill
                        className="object-contain"
                        priority
                    />

                    {/* Feedback Overlay */}
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className={`absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm`}
                            >
                                <div className={`text-6xl font-black mb-4 ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                                    {feedback === 'correct' ? 'CORRECT!' : 'WRONG!'}
                                </div>
                                {feedback === 'wrong' && (
                                    <div className="text-white text-2xl font-bold text-center animate-in slide-in-from-bottom-5">
                                        The answer was:<br />
                                        <span className="text-yellow-400 text-4xl mt-2 block">{currentMeme.name}</span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={roundOver}
                        placeholder="Type the meme name - Press Enter"
                        className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-xl py-4 px-6 text-xl text-white placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all disabled:opacity-50"
                        autoComplete="off"
                    />
                </form>
            </div>

            {/* Simulated Multiplayer Sidebar */}
            <div className="w-full lg:w-72 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit shrink-0">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FaUsers className="text-cyan-400" /> Live Players
                </h3>
                <div className="space-y-4">
                    {/* User */}
                    <div className="flex justify-between items-center bg-zinc-800 p-3 rounded-lg border border-fuchsia-500/50">
                        <div className="flex items-center gap-2 font-bold text-white">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            You
                        </div>
                        <span className="font-mono text-fuchsia-400 font-bold">{score}</span>
                    </div>

                    {/* Opponents */}
                    {OPPONENTS.map(opp => (
                        <div key={opp.name} className="flex justify-between items-center p-3 rounded-lg border border-zinc-800/50">
                            <div className={`flex items-center gap-2 font-bold text-sm ${opp.color}`}>
                                {opp.name}
                            </div>
                            <span className="font-mono text-zinc-400 font-bold">
                                {opponentScores[opp.name] || 0}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
