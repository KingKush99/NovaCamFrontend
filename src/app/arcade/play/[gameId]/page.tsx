'use client';



import { useParams } from 'next/navigation';
import NameThatMeme from '@/components/games/NameThatMeme';
import NameThatPornstar from '@/components/games/NameThatPornstar';
import { useGameStore } from '@/store/useGameStore';
import { useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function GamePage() {
    const params = useParams();
    const gameId = params.gameId as string;
    const { startGame, resetGame } = useGameStore();

    useEffect(() => {
        if (gameId === 'meme') {
            startGame('meme');
        } else if (gameId === 'pornstar') {
            startGame('pornstar');
        }

        return () => resetGame();
    }, [gameId, startGame, resetGame]);

    const renderGame = () => {
        switch (gameId) {
            case 'meme':
                return <NameThatMeme />;
            case 'pornstar':
                return <NameThatPornstar />;
            default:
                return <div className="text-center text-red-500">Game not found</div>;
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col">
            <div className="mb-4">
                <Link href="/arcade" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <FaArrowLeft /> Back to Arcade
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center">
                {renderGame()}
            </div>
        </div>
    );
}
