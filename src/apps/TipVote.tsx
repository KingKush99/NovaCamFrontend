import { AppDefinition, TipEvent, AppState, AppConfig } from '@/types/appEngine';

export const TipVoteApp: AppDefinition = {
    id: 'tip-vote',
    name: 'Tip Multi-Choice',
    icon: '🗳️',
    description: 'Vote with tips - keyword based',
    category: 'Voting',

    defaultConfig: {
        options: [
            { keyword: 'red', label: 'Red Lingerie', color: '#ef4444' },
            { keyword: 'black', label: 'Black Lingerie', color: '#1f2937' },
            { keyword: 'white', label: 'White Lingerie', color: '#f3f4f6' },
        ],
    },

    defaultState: {
        votes: {},
        totalVotes: 0,
    },

    onTip: (event: TipEvent, state: AppState, config: AppConfig): AppState => {
        if (!event.note) return state;

        const note = event.note.toLowerCase();
        const matchedOption = config.options.find((opt: any) =>
            note.includes(opt.keyword)
        );

        if (!matchedOption) return state;

        const votes = { ...state.votes };
        votes[matchedOption.keyword] = (votes[matchedOption.keyword] || 0) + event.amount;

        return {
            ...state,
            votes,
            totalVotes: state.totalVotes + event.amount,
        };
    },

    render: (state: AppState, config: AppConfig) => {
        if (state.totalVotes === 0) return null;

        return (
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/90 backdrop-blur-sm rounded-lg p-4 min-w-[250px]">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🗳️</span>
                    <span className="text-white font-bold">Results</span>
                </div>

                <div className="space-y-2">
                    {config.options.map((option: any) => {
                        const voteCount = state.votes[option.keyword] || 0;
                        const percentage = state.totalVotes > 0 ? (voteCount / state.totalVotes) * 100 : 0;

                        return (
                            <div key={option.keyword}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white">{option.label}</span>
                                    <span className="text-gray-400">{Math.round(percentage)}%</span>
                                </div>
                                <div className="w-full bg-zinc-800 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${percentage}%`,
                                            backgroundColor: option.color,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-3 text-xs text-gray-400 text-center">
                    Total: {state.totalVotes} tokens
                </div>
            </div>
        );
    },
};
