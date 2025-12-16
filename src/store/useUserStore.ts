import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    username: string;
    tokens: number;
    xp: number;
    tier: number;
    wins: {
        meme: number;
        pornstar: number;
    };
    inventory: string[];
    achievements: string[];
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    addTokens: (amount: number) => void;
    spendTokens: (amount: number) => boolean;
    addXP: (amount: number) => void;
    addWin: (gameType: 'meme' | 'pornstar') => void;
    addInventoryItem: (item: string) => void;
    addAchievement: (achievement: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: {
                id: 'demo-user-1',
                username: 'DemoUser',
                tokens: 1000,
                xp: 0,
                tier: 1,
                wins: {
                    meme: 0,
                    pornstar: 0
                },
                inventory: [],
                achievements: []
            },

            setUser: (user) => set({ user }),

            addTokens: (amount) => set((state) => ({
                user: state.user ? { ...state.user, tokens: state.user.tokens + amount } : null
            })),

            spendTokens: (amount) => {
                const { user } = get();
                if (!user || user.tokens < amount) return false;

                set({ user: { ...user, tokens: user.tokens - amount } });
                return true;
            },

            addXP: (amount) => set((state) => {
                if (!state.user) return state;

                const newXP = state.user.xp + amount;
                // Calculate new tier based on XP
                let newTier = state.user.tier;
                if (newXP >= 1000001) newTier = 10;
                else if (newXP >= 500001) newTier = 9;
                else if (newXP >= 200001) newTier = 8;
                else if (newXP >= 100001) newTier = 7;
                else if (newXP >= 60001) newTier = 6;
                else if (newXP >= 30001) newTier = 5;
                else if (newXP >= 15001) newTier = 4;
                else if (newXP >= 5001) newTier = 3;
                else if (newXP >= 1001) newTier = 2;
                else newTier = 1;

                return {
                    user: { ...state.user, xp: newXP, tier: newTier }
                };
            }),

            addWin: (gameType) => set((state) => {
                if (!state.user) return state;
                return {
                    user: {
                        ...state.user,
                        wins: {
                            ...state.user.wins,
                            [gameType]: state.user.wins[gameType] + 1
                        }
                    }
                };
            }),

            addInventoryItem: (item) => set((state) => {
                if (!state.user) return state;
                return {
                    user: {
                        ...state.user,
                        inventory: [...state.user.inventory, item]
                    }
                };
            }),

            addAchievement: (achievement) => set((state) => {
                if (!state.user) return state;
                if (state.user.achievements.includes(achievement)) return state;
                return {
                    user: {
                        ...state.user,
                        achievements: [...state.user.achievements, achievement]
                    }
                };
            }),

            logout: () => set({ user: null })
        }),
        {
            name: 'novelty-cams-user'
        }
    )
);
