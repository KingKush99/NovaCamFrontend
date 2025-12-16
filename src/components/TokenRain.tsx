'use client';



import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { FaCoins } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

export default function TokenRain({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShowBanner(true);

            // Fire confetti coins
            const duration = 5000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FFD700', '#FFA500'] // Gold colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FFD700', '#FFA500']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                } else {
                    setShowBanner(false);
                    onComplete();
                }
            };

            frame();
        }
    }, [isActive, onComplete]);

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-20 left-0 right-0 z-50 flex justify-center pointer-events-none"
                >
                    <div className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-black font-black text-2xl px-8 py-4 rounded-full shadow-[0_0_50px_rgba(234,179,8,0.8)] flex items-center gap-4 animate-bounce">
                        <FaCoins className="text-4xl" />
                        TOKEN RAIN EVENT!
                        <FaCoins className="text-4xl" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
