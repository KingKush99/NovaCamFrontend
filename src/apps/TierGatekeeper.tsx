import { AppDefinition, TipEvent, AppState, AppConfig } from '@/types/appEngine';

export const TierGatekeeperApp: AppDefinition = {
    id: 'tier-gatekeeper',
    name: 'Tier Gatekeeper',
    icon: '🔐',
    description: 'Dynamic pricing based on user tier',
    category: 'Tip Menu',

    defaultConfig: {
        tiers: {
            bronze: { discount: 0, color: 'orange' },
            silver: { discount: 0.1, color: 'gray' },
            gold: { discount: 0.2, color: 'yellow' },
            platinum: { discount: 0.5, color: 'cyan' },
        },
        menuItems: [
            { name: 'Flash', basePrice: 100 },
            { name: 'Spank', basePrice: 200 },
            { name: 'Oil', basePrice: 500 },
        ],
    },

    defaultState: {
        userTier: 'gold', // Mocked current user tier
        recentUnlocks: [],
    },

    onTip: (event: TipEvent, state: AppState, config: AppConfig): AppState => {
        // In a real app, we would check if the tip matches a discounted price
        // For now, we just record the unlock
        return {
            ...state,
            recentUnlocks: [
                ...state.recentUnlocks.slice(-4),
                { username: event.username, amount: event.amount, timestamp: new Date() }
            ],
        };
    },

    render: (state: AppState, config: AppConfig) => {
        const currentTierConfig = config.tiers[state.userTier];

        return (
            <div className="absolute top-20 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 min-w-[250px] border border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🔐</span>
                    <div>
                        <div className="text-white font-bold text-sm">Tier Gatekeeper</div>
                        <div className={`text-${currentTierConfig.color}-400 text-xs font-bold uppercase`}>
                            {state.userTier} Status ({currentTierConfig.discount * 100}% OFF)
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    {config.menuItems.map((item: any, idx: number) => {
                        const discountedPrice = Math.round(item.basePrice * (1 - currentTierConfig.discount));

                        return (
                            <div key={idx} className="flex justify-between items-center text-sm bg-slate-800/50 p-2 rounded">
                                <span className="text-gray-300">{item.name}</span>
                                <div className="flex flex-col items-end">
                                    <span className="text-gray-500 line-through text-xs">{item.basePrice}</span>
                                    <span className="text-white font-bold text-yellow-500">{discountedPrice} tk</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {state.recentUnlocks.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-700">
                        <div className="text-xs text-gray-500 mb-1">Recent Unlocks</div>
                        {state.recentUnlocks.map((unlock: any, idx: number) => (
                            <div key={idx} className="text-xs text-green-400">
                                {unlock.username} unlocked item!
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    },
};
