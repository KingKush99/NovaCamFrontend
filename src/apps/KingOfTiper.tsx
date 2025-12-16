import { AppDefinition, TipEvent, AppState, AppConfig } from '@/types/appEngine';

export const KingOfTiperApp: AppDefinition = {
    id: 'king-of-tiper',
    name: 'King of the Tiper',
    icon: '👑',
    description: 'Bidding war - highest tipper becomes the King',
    category: 'Games',

    defaultConfig: {
        resetMinutes: 20,
    },

    defaultState: {
        currentKing: null,
        highestTip: 0,
        resetTime: null,
    },

    onTip: (event: TipEvent, state: AppState, config: AppConfig): AppState => {
        const { amount, username } = event;

        if (amount > state.highestTip) {
            return {
                ...state,
                currentKing: username,
                highestTip: amount,
                resetTime: new Date(Date.now() + config.resetMinutes * 60 * 1000),
            };
        }

        return state;
    },

    render: (state: AppState) => {
        if (!state.currentKing) return null;

        return (
            <div className="absolute top-4 left-4 bg-yellow-900/90 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">👑</span>
                    <div>
                        <div className="text-yellow-400 font-bold text-sm">KING OF THE ROOM</div>
                        <div className="text-white text-lg font-black">{state.currentKing}</div>
                    </div>
                </div>

                <div className="text-sm text-gray-300">
                    Highest Tip: <span className="text-yellow-400 font-bold">{state.highestTip} tokens</span>
                </div>
            </div>
        );
    },
};
