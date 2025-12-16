import { AppDefinition, TipEvent, AppState, AppConfig } from '@/types/appEngine';

export const MultiGoalApp: AppDefinition = {
    id: 'multi-goal',
    name: 'Multi-Goal',
    icon: '🎯',
    description: 'Progress bar with sequential goals',
    category: 'Goal',

    defaultConfig: {
        goals: [
            { amount: 1000, description: 'Topless' },
            { amount: 2000, description: 'Oil Show' },
            { amount: 3000, description: 'Toy Play' },
            { amount: 4000, description: 'Finale' },
        ],
    },

    defaultState: {
        totalTips: 0,
        currentGoalIndex: 0,
        completedGoals: [],
    },

    onTip: (event: TipEvent, state: AppState, config: AppConfig): AppState => {
        const newTotal = state.totalTips + event.amount;
        const goals = config.goals;

        let currentGoalIndex = state.currentGoalIndex;
        const completedGoals = [...state.completedGoals];

        while (
            currentGoalIndex < goals.length &&
            newTotal >= goals[currentGoalIndex].amount
        ) {
            completedGoals.push(goals[currentGoalIndex]);
            currentGoalIndex++;
        }

        return {
            ...state,
            totalTips: newTotal,
            currentGoalIndex,
            completedGoals,
        };
    },

    render: (state: AppState, config: AppConfig) => {
        const goals = config.goals;
        const currentGoal = goals[state.currentGoalIndex];

        if (!currentGoal) {
            return (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-green-900/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-white font-bold text-center">
                        🎉 All Goals Completed! 🎉
                    </div>
                </div>
            );
        }

        const progress = (state.totalTips / currentGoal.amount) * 100;

        return (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg p-4 min-w-[400px]">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold">Goal: {currentGoal.description}</span>
                    <span className="text-cyan-400 font-bold">
                        {Math.round(progress)}% ({state.totalTips}/{currentGoal.amount})
                    </span>
                </div>

                <div className="w-full bg-zinc-800 rounded-full h-3">
                    <div
                        className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>

                <div className="mt-3 flex gap-2 text-xs">
                    {goals.map((goal: any, idx: number) => (
                        <div
                            key={idx}
                            className={`px-2 py-1 rounded ${idx < state.currentGoalIndex
                                    ? 'bg-green-500/20 text-green-400 line-through'
                                    : idx === state.currentGoalIndex
                                        ? 'bg-cyan-500/20 text-cyan-400'
                                        : 'bg-zinc-800 text-gray-500'
                                }`}
                        >
                            {goal.description}
                        </div>
                    ))}
                </div>
            </div>
        );
    },
};
