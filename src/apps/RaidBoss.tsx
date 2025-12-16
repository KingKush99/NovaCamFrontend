import { AppDefinition, TipEvent, AppState, AppConfig } from '@/types/appEngine';

export const RaidBossApp: AppDefinition = {
    id: 'raid-boss',
    name: 'Raid Boss',
    icon: '🐲',
    description: 'Global boss battle - Tip to deal damage',
    category: 'Games',

    defaultConfig: {
        bossName: 'Cyber Dragon',
        maxHp: 10000,
        lootTable: ['Rare Skin', '1000 Tokens', 'VIP Badge', 'Nothing'],
    },

    defaultState: {
        currentHp: 10000,
        isDead: false,
        topDamagers: [], // { username, damage }
        lastAttacker: null,
    },

    onTip: (event: TipEvent, state: AppState, config: AppConfig): AppState => {
        if (state.isDead) return state;

        const damage = event.amount;
        const newHp = Math.max(0, state.currentHp - damage);
        const isDead = newHp === 0;

        // Update top damagers
        const topDamagers = [...state.topDamagers];
        const existingIndex = topDamagers.findIndex(d => d.username === event.username);

        if (existingIndex >= 0) {
            topDamagers[existingIndex].damage += damage;
        } else {
            topDamagers.push({ username: event.username, damage });
        }

        // Sort and keep top 3
        topDamagers.sort((a, b) => b.damage - a.damage);

        return {
            ...state,
            currentHp: newHp,
            isDead,
            topDamagers: topDamagers.slice(0, 3),
            lastAttacker: { username: event.username, damage },
        };
    },

    render: (state: AppState, config: AppConfig) => {
        const hpPercent = (state.currentHp / config.maxHp) * 100;

        return (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-950/90 backdrop-blur-sm rounded-xl p-4 min-w-[500px] border-2 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl">🐲</span>
                        <div className="text-red-100 font-black text-xl uppercase tracking-widest">{config.bossName}</div>
                    </div>
                    <div className="text-red-400 font-mono font-bold">
                        {state.currentHp.toLocaleString()} / {config.maxHp.toLocaleString()} HP
                    </div>
                </div>

                {/* HP Bar */}
                <div className="w-full bg-red-900/50 h-6 rounded-full overflow-hidden border border-red-800 mb-3 relative">
                    <div
                        className="h-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 transition-all duration-200"
                        style={{ width: `${hpPercent}%` }}
                    ></div>
                    {/* Glitch effect overlay */}
                    <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/3o7qE1YN7aQfVOWvks/giphy.gif')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                </div>

                {state.isDead ? (
                    <div className="text-center py-2">
                        <div className="text-yellow-400 font-black text-2xl animate-bounce">BOSS DEFEATED!</div>
                        <div className="text-white text-sm">Loot is being distributed...</div>
                    </div>
                ) : (
                    <div className="flex justify-between items-start">
                        {/* Last Attacker */}
                        <div className="text-xs">
                            <div className="text-red-400 uppercase font-bold mb-1">Last Hit</div>
                            {state.lastAttacker ? (
                                <div className="text-white">
                                    {state.lastAttacker.username} <span className="text-red-500">-{state.lastAttacker.damage}</span>
                                </div>
                            ) : (
                                <div className="text-gray-500">Waiting for challenger...</div>
                            )}
                        </div>

                        {/* Top Damagers */}
                        <div className="text-xs text-right">
                            <div className="text-yellow-500 uppercase font-bold mb-1">Top DPS</div>
                            {state.topDamagers.map((d: any, idx: number) => (
                                <div key={idx} className="text-white">
                                    {idx + 1}. {d.username} <span className="text-gray-400">({d.damage})</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    },
};
