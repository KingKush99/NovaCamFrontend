import { AppDefinition, TipEvent, AppState, AppConfig } from '@/types/appEngine';

export const TugOfWarApp: AppDefinition = {
    id: 'tug-of-war',
    name: 'Tug of War',
    icon: '⚔️',
    description: 'PvP tipping battle - Team A vs Team B',
    category: 'Games',

    defaultConfig: {
        teamA: { name: 'Red Team', color: 'red', emoji: '🔴' },
        teamB: { name: 'Blue Team', color: 'blue', emoji: '🔵' },
        winThreshold: 1000, // Difference needed to win
    },

    defaultState: {
        balance: 0, // Positive = Team A winning, Negative = Team B winning
        totalTipsA: 0,
        totalTipsB: 0,
        winner: null,
    },

    onTip: (event: TipEvent, state: AppState, config: AppConfig): AppState => {
        if (state.winner) return state; // Game over

        // Determine team based on note or random if not specified (for demo)
        // In real usage, users would select a team or use a specific keyword
        const isTeamA = event.note?.toLowerCase().includes('red') || Math.random() > 0.5;

        const amount = event.amount;
        const newBalance = state.balance + (isTeamA ? amount : -amount);

        let winner = null;
        if (newBalance >= config.winThreshold) winner = config.teamA.name;
        if (newBalance <= -config.winThreshold) winner = config.teamB.name;

        return {
            ...state,
            balance: newBalance,
            totalTipsA: state.totalTipsA + (isTeamA ? amount : 0),
            totalTipsB: state.totalTipsB + (!isTeamA ? amount : 0),
            winner,
        };
    },

    render: (state: AppState, config: AppConfig) => {
        const maxRange = config.winThreshold;
        const percentA = 50 + (state.balance / maxRange) * 50;
        const clampedPercent = Math.max(0, Math.min(100, percentA));

        return (
            <div className="absolute top-20 right-4 bg-zinc-900/90 backdrop-blur-sm rounded-lg p-4 min-w-[300px] border-2 border-zinc-700">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-red-500 font-bold flex items-center gap-1">
                        {config.teamA.emoji} {config.teamA.name}
                        <span className="text-xs text-white">({state.totalTipsA})</span>
                    </div>
                    <div className="text-blue-500 font-bold flex items-center gap-1">
                        <span className="text-xs text-white">({state.totalTipsB})</span>
                        {config.teamB.name} {config.teamB.emoji}
                    </div>
                </div>

                {/* Rope / Bar */}
                <div className="relative h-6 bg-zinc-800 rounded-full overflow-hidden mb-2">
                    {/* Center Marker */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white z-10 opacity-50"></div>

                    {/* Bar */}
                    <div
                        className="absolute top-0 bottom-0 left-0 bg-red-600 transition-all duration-300"
                        style={{ width: `${clampedPercent}%` }}
                    ></div>
                    <div
                        className="absolute top-0 bottom-0 right-0 bg-blue-600 transition-all duration-300"
                        style={{ width: `${100 - clampedPercent}%` }}
                    ></div>

                    {/* Knot */}
                    <div
                        className="absolute top-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-20 transition-all duration-300"
                        style={{ left: `${clampedPercent}%` }}
                    ></div>
                </div>

                {state.winner ? (
                    <div className="text-center font-black text-xl text-yellow-400 animate-pulse">
                        🏆 {state.winner} WINS! 🏆
                    </div>
                ) : (
                    <div className="text-center text-xs text-gray-400">
                        Tip to pull the rope! Target: {config.winThreshold} diff
                    </div>
                )}
            </div>
        );
    },
};
