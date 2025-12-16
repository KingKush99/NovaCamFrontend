import { AppDefinition, TipEvent, AppState, AppConfig } from '@/types/appEngine';

export const QuestBoardApp: AppDefinition = {
    id: 'quest-board',
    name: 'Quest Board',
    icon: '📜',
    description: 'RPG-style quests with XP rewards',
    category: 'Games',

    defaultConfig: {
        quests: [
            { id: 1, title: 'The First Tip', description: 'Tip 100 tokens', target: 100, xp: 50 },
            { id: 2, title: 'Generous Soul', description: 'Tip 500 tokens in one go', target: 500, xp: 300 },
            { id: 3, title: 'Whale Watch', description: 'Accumulate 5000 tokens', target: 5000, xp: 2000 },
        ],
    },

    defaultState: {
        userProgress: {}, // Map of username -> { questId -> amount }
        completedQuests: [], // List of { username, questId, timestamp }
    },

    onTip: (event: TipEvent, state: AppState, config: AppConfig): AppState => {
        const { username, amount } = event;
        const userProgress = { ...state.userProgress };
        const completedQuests = [...state.completedQuests];

        if (!userProgress[username]) {
            userProgress[username] = {};
        }

        config.quests.forEach((quest: any) => {
            // Check if already completed
            const alreadyCompleted = completedQuests.some(
                (c) => c.username === username && c.questId === quest.id
            );
            if (alreadyCompleted) return;

            // Update progress
            const currentAmount = userProgress[username][quest.id] || 0;
            const newAmount = currentAmount + amount;
            userProgress[username][quest.id] = newAmount;

            // Check completion
            // For "one go" quests, we check the single tip amount
            // For accumulation, we check the total
            let isComplete = false;
            if (quest.description.includes('one go')) {
                if (amount >= quest.target) isComplete = true;
            } else {
                if (newAmount >= quest.target) isComplete = true;
            }

            if (isComplete) {
                completedQuests.push({
                    username,
                    questId: quest.id,
                    timestamp: new Date(),
                    xp: quest.xp,
                });
            }
        });

        return {
            ...state,
            userProgress,
            completedQuests: completedQuests.slice(-5), // Keep last 5 completions
        };
    },

    render: (state: AppState, config: AppConfig) => {
        return (
            <div className="absolute bottom-20 right-4 bg-amber-900/90 backdrop-blur-sm rounded-lg p-4 min-w-[250px] border-2 border-amber-700">
                <div className="flex items-center gap-2 mb-3 border-b border-amber-800 pb-2">
                    <span className="text-2xl">📜</span>
                    <div className="text-amber-100 font-bold font-serif">Daily Quests</div>
                </div>

                <div className="space-y-3">
                    {config.quests.map((quest: any) => (
                        <div key={quest.id} className="bg-amber-950/50 p-2 rounded border border-amber-800/50">
                            <div className="flex justify-between items-start">
                                <div className="text-amber-200 font-bold text-sm">{quest.title}</div>
                                <div className="text-amber-400 text-xs font-bold">{quest.xp} XP</div>
                            </div>
                            <div className="text-amber-400/70 text-xs">{quest.description}</div>
                        </div>
                    ))}
                </div>

                {state.completedQuests.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-amber-800">
                        {state.completedQuests.map((c: any, idx: number) => {
                            const quest = config.quests.find((q: any) => q.id === c.questId);
                            return (
                                <div key={idx} className="text-xs text-green-400 animate-pulse">
                                    ✨ {c.username} completed {quest?.title}!
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    },
};
