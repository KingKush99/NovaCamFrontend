import { create } from 'zustand';

interface GameState {
    currentGame: 'meme' | 'pornstar' | null;
    isPlaying: boolean;
    currentRound: number;
    maxRounds: number; // New: Limit rounds
    score: number;
    opponentScore: number;
    timeRemaining: number;
    wagerAmount: number;
    matchId: string | null;
    elo: number; // New: Elo Rating

    startGame: (gameType: 'meme' | 'pornstar', wager?: number, rounds?: number) => void;
    endGame: () => void;
    nextRound: () => void;
    updateScore: (points: number) => void;
    updateOpponentScore: (points: number) => void;
    setTimeRemaining: (time: number) => void;
    resetGame: () => void;
    updateElo: (result: 'win' | 'loss' | 'draw') => void; // New: Elo update
}

export const useGameStore = create<GameState>((set) => ({
    currentGame: null,
    isPlaying: false,
    currentRound: 1,
    maxRounds: 5, // Default rounds
    score: 0,
    opponentScore: 0,
    timeRemaining: 15,
    wagerAmount: 0,
    matchId: null,
    elo: 1000, // Starting Elo

    startGame: (gameType, wager = 0, rounds = 5) => set({
        currentGame: gameType,
        isPlaying: true,
        currentRound: 1,
        maxRounds: rounds,
        score: 0,
        opponentScore: 0,
        timeRemaining: gameType === 'meme' ? 15 : 10,
        wagerAmount: wager,
        matchId: `match-${Date.now()}`
    }),

    endGame: () => set({
        isPlaying: false,
        currentGame: null,
        matchId: null
    }),

    nextRound: () => set((state) => {
        // Auto-end if rounds exceeded
        if (state.currentRound >= state.maxRounds) {
            return {
                isPlaying: false,
                currentRound: state.currentRound, // Keep final round logic for display
                matchId: null // or keep matchId to show summary?
            };
        }
        return {
            currentRound: state.currentRound + 1,
            timeRemaining: state.currentGame === 'meme' ? 15 : 10
        };
    }),

    updateScore: (points) => set((state) => ({
        score: state.score + points
    })),

    updateOpponentScore: (points) => set((state) => ({
        opponentScore: state.opponentScore + points
    })),

    setTimeRemaining: (time) => set({ timeRemaining: time }),

    updateElo: (result) => set((state) => {
        let change = 0;
        if (result === 'win') change = 15;
        if (result === 'loss') change = -10;
        if (result === 'draw') change = 2;
        return { elo: state.elo + change };
    }),

    resetGame: () => set({
        currentGame: null,
        isPlaying: false,
        currentRound: 1,
        score: 0,
        opponentScore: 0,
        timeRemaining: 15,
        wagerAmount: 0,
        matchId: null
    })
}));
