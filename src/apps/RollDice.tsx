import { AppDefinition, TipEvent, AppState, AppConfig } from '@/types/appEngine';

export const RollDiceApp: AppDefinition = {
    id: 'roll-dice',
    name: 'Roll the Dice',
    icon: '🎲',
    description: 'Pay to roll - random action reward',
    category: 'Games',

    defaultConfig: {
        ticketPrice: 25,
        actions: ['Flash', 'Spank', 'Squat', 'Dance', 'Kiss', 'Nothing'],
    },

    defaultState: {
        lastRoll: null,
        showResult: false,
    },

    onTip: (event: TipEvent, state: AppState, config: AppConfig): AppState => {
        if (event.amount !== config.ticketPrice) return state;

        const randomAction = config.actions[Math.floor(Math.random() * config.actions.length)];

        return {
            ...state,
            lastRoll: {
                action: randomAction,
                username: event.username,
                timestamp: event.timestamp,
            },
            showResult: true,
        };
    },

    render: (state: AppState) => {
        if (!state.showResult || !state.lastRoll) return null;

        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 shadow-2xl animate-bounce">
                <div className="text-center">
                    <div className="text-6xl mb-4">🎲</div>
                    <div className="text-white text-2xl font-black mb-2">
                        {state.lastRoll.action}!
                    </div>
                    <div className="text-gray-300 text-sm">
                        {state.lastRoll.username} rolled the dice
                    </div>
                </div>
            </div>
        );
    },
};
