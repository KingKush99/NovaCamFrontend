import { AppDefinition, TipEvent, AppState, AppConfig } from '@/types/appEngine';

export const LovenseLushApp: AppDefinition = {
    id: 'lovense-lush',
    name: 'Lovense Lush',
    icon: '💜',
    description: 'Control vibration intensity with tips',
    category: 'Control',

    defaultConfig: {
        strengthTable: {
            low: { min: 1, max: 10 },
            medium: { min: 11, max: 50 },
            high: { min: 51, max: 100 },
            ultra: { min: 101, max: Infinity },
        },
    },

    defaultState: {
        currentLevel: 0,
        lastTip: null,
        vibeHistory: [],
    },

    onTip: (event: TipEvent, state: AppState, config: AppConfig): AppState => {
        const { amount } = event;
        const { strengthTable } = config;

        let level = 0;
        if (amount >= strengthTable.ultra.min) level = 4;
        else if (amount >= strengthTable.high.min) level = 3;
        else if (amount >= strengthTable.medium.min) level = 2;
        else if (amount >= strengthTable.low.min) level = 1;

        return {
            ...state,
            currentLevel: level,
            lastTip: event,
            vibeHistory: [...state.vibeHistory.slice(-9), { level, timestamp: event.timestamp }],
        };
    },

    render: (state: AppState) => {
        if (state.currentLevel === 0) return null;

        const levelLabels = ['Off', 'Low', 'Medium', 'High', 'Ultra'];
        const levelColors = ['gray', 'green', 'yellow', 'orange', 'red'];

        return (
            <div className="absolute top-4 right-4 bg-purple-900/90 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💜</span>
                    <span className="text-white font-bold">Lovense Lush</span>
                </div>

                <div className="mb-2">
                    <div className="text-sm text-gray-300 mb-1">Vibe Level</div>
                    <div className={`text-2xl font-bold text-${levelColors[state.currentLevel]}-400`}>
                        {levelLabels[state.currentLevel]}
                    </div>
                </div>

                <div className="flex items-end gap-1 h-16">
                    {state.vibeHistory.map((vibe: any, idx: number) => (
                        <div
                            key={idx}
                            className={`flex-1 bg-${levelColors[vibe.level]}-500 rounded-t`}
                            style={{ height: `${(vibe.level / 4) * 100}%` }}
                        />
                    ))}
                </div>
            </div>
        );
    },
};
