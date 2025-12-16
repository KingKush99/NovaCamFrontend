import { AppDefinition, TipEvent, AppState, AppConfig } from '@/types/appEngine';

export const EvolutionPetApp: AppDefinition = {
    id: 'evolution-pet',
    name: 'Evolution Pet',
    icon: '🦖',
    description: 'Tamagotchi creature that evolves with tips',
    category: 'Games',

    defaultConfig: {
        stages: [
            { name: 'Egg', emoji: '🥚', threshold: 0 },
            { name: 'Lizard', emoji: '🦎', threshold: 1000 },
            { name: 'Raptor', emoji: '🦅', threshold: 5000 },
            { name: 'T-Rex', emoji: '🦖', threshold: 10000 },
        ],
    },

    defaultState: {
        totalFed: 0,
        currentStage: 0,
    },

    onTip: (event: TipEvent, state: AppState, config: AppConfig): AppState => {
        const newTotal = state.totalFed + event.amount;
        const stages = config.stages;

        let currentStage = 0;
        for (let i = stages.length - 1; i >= 0; i--) {
            if (newTotal >= stages[i].threshold) {
                currentStage = i;
                break;
            }
        }

        return {
            ...state,
            totalFed: newTotal,
            currentStage,
        };
    },

    render: (state: AppState, config: AppConfig) => {
        const stage = config.stages[state.currentStage];
        const nextStage = config.stages[state.currentStage + 1];

        return (
            <div className="absolute bottom-4 right-4 bg-green-900/90 backdrop-blur-sm rounded-lg p-4">
                <div className="text-center">
                    <div className="text-6xl mb-2">{stage.emoji}</div>
                    <div className="text-white font-bold">{stage.name}</div>
                    <div className="text-sm text-gray-300 mt-2">
                        Fed: {state.totalFed} tokens
                    </div>
                    {nextStage && (
                        <div className="text-xs text-gray-400 mt-1">
                            Next: {nextStage.name} at {nextStage.threshold}
                        </div>
                    )}
                </div>
            </div>
        );
    },
};
