export interface TierRequirement {
    tips?: number;
    timeInRoom?: number; // in minutes
    chatsSent?: number;
    friends?: number;
}

export interface Tier {
    id: number;
    name: string;
    description: string;
    requirements: TierRequirement;
    requirementsToMeet: number; // How many of the requirements must be met
    color: string;
    chatColor: string;
    icon?: string; // Path to tier icon image
}

export const MASTER_BAITER_TIERS: Tier[] = [
    {
        id: 1,
        name: "The Palm Pilot",
        description: "The entry-level lurker. Just figuring out how the buttons work.",
        requirements: {
            tips: 1,
            timeInRoom: 30,
            chatsSent: 5,
            friends: 1
        },
        requirementsToMeet: 1, // Complete ANY 1
        color: "#6B7280",
        chatColor: "#9CA3AF",
        icon: "/assets/tiers/tier1.png"
    },
    {
        id: 2,
        name: "The Lonely Stoner",
        description: "A solo act. They hang around in the background.",
        requirements: {
            tips: 25,
            timeInRoom: 120,
            chatsSent: 25,
            friends: 2
        },
        requirementsToMeet: 1, // Complete ANY 1
        color: "#10B981",
        chatColor: "#34D399",
        icon: "/assets/tiers/tier2.png"
    },
    {
        id: 3,
        name: "Hand Solo",
        description: "A rogue warrior. Starting to become a familiar face.",
        requirements: {
            tips: 50,
            timeInRoom: 300,
            chatsSent: 50,
            friends: 5
        },
        requirementsToMeet: 2, // Complete ANY 2
        color: "#3B82F6",
        chatColor: "#60A5FA",
        icon: "/assets/tiers/tier3.png"
    },
    {
        id: 4,
        name: "Beat-hoven",
        description: "Conducting business. They have a rhythm now.",
        requirements: {
            tips: 100,
            timeInRoom: 600,
            chatsSent: 100,
            friends: 10
        },
        requirementsToMeet: 2, // Complete ANY 2
        color: "#8B5CF6",
        chatColor: "#A78BFA",
        icon: "/assets/tiers/tier4.png"
    },
    {
        id: 5,
        name: "Faptain America",
        description: "Doing their patriotic duty. A solid, reliable community member.",
        requirements: {
            tips: 250,
            timeInRoom: 900,
            chatsSent: 200,
            friends: 15
        },
        requirementsToMeet: 3, // Complete 3 out of 4
        color: "#EC4899",
        chatColor: "#F472B6",
        icon: "/assets/tiers/tier5.png"
    },
    {
        id: 6,
        name: "Obi-Wank Kenobi",
        description: "The teacher. They have been around long enough to know the lore.",
        requirements: {
            tips: 500,
            timeInRoom: 1200,
            chatsSent: 350,
            friends: 20
        },
        requirementsToMeet: 3, // Complete 3 out of 4
        color: "#F59E0B",
        chatColor: "#FBBF24",
        icon: "/assets/tiers/tier6.png"
    },
    {
        id: 7,
        name: "Macaulay Jerkin",
        description: "Home alone and up to no good. High activity, high energy.",
        requirements: {
            tips: 750,
            timeInRoom: 1800,
            chatsSent: 500,
            friends: 30
        },
        requirementsToMeet: 3, // Complete 3 out of 4
        color: "#EF4444",
        chatColor: "#F87171",
        icon: "/assets/tiers/tier7.png"
    },
    {
        id: 8,
        name: "Yank Sinatra",
        description: "Classy. They do it their way. A well-known regular.",
        requirements: {
            tips: 1000,
            timeInRoom: 2400,
            chatsSent: 750,
            friends: 40
        },
        requirementsToMeet: 3, // Complete 3 out of 4
        color: "#14B8A6",
        chatColor: "#2DD4BF",
        icon: "/assets/tiers/tier8.png"
    },
    {
        id: 9,
        name: "Luke Skywanker",
        description: "The Chosen One. The force is strong with this one.",
        requirements: {
            tips: 2500,
            timeInRoom: 3000,
            chatsSent: 1000,
            friends: 50
        },
        requirementsToMeet: 3, // Complete ALL 4 (or miss only 1)
        color: "#A855F7",
        chatColor: "#C084FC",
        icon: "/assets/tiers/tier9.png"
    },
    {
        id: 10,
        name: "Edward Penishands",
        description: "The Apex Predator. A mythical creature of pure speed and danger.",
        requirements: {
            tips: 5000,
            timeInRoom: 3600,
            chatsSent: 1500,
            friends: 75
        },
        requirementsToMeet: 4, // Must Complete ALL 4 (The Perfect Month)
        color: "linear-gradient(135deg, #FFD700, #FFA500, #FF69B4)",
        chatColor: "#FFD700",
        icon: "/assets/tiers/tier10.png"
    }
];

export function getTierFromStats(stats: TierRequirement): Tier {
    // Start from highest tier and work down
    for (let i = MASTER_BAITER_TIERS.length - 1; i >= 0; i--) {
        const tier = MASTER_BAITER_TIERS[i];
        let metRequirements = 0;

        if (stats.tips !== undefined && stats.tips >= (tier.requirements.tips || 0)) metRequirements++;
        if (stats.timeInRoom !== undefined && stats.timeInRoom >= (tier.requirements.timeInRoom || 0)) metRequirements++;
        if (stats.chatsSent !== undefined && stats.chatsSent >= (tier.requirements.chatsSent || 0)) metRequirements++;
        if (stats.friends !== undefined && stats.friends >= (tier.requirements.friends || 0)) metRequirements++;

        if (metRequirements >= tier.requirementsToMeet) {
            return tier;
        }
    }

    return MASTER_BAITER_TIERS[0]; // Default to lowest tier
}

export function getTierProgress(stats: TierRequirement, currentTier: Tier): number {
    const nextTier = MASTER_BAITER_TIERS[currentTier.id]; // Next tier (id is 1-indexed)
    if (!nextTier) return 100; // Already at max tier

    let metRequirements = 0;
    if (stats.tips !== undefined && stats.tips >= (nextTier.requirements.tips || 0)) metRequirements++;
    if (stats.timeInRoom !== undefined && stats.timeInRoom >= (nextTier.requirements.timeInRoom || 0)) metRequirements++;
    if (stats.chatsSent !== undefined && stats.chatsSent >= (nextTier.requirements.chatsSent || 0)) metRequirements++;
    if (stats.friends !== undefined && stats.friends >= (nextTier.requirements.friends || 0)) metRequirements++;

    return (metRequirements / nextTier.requirementsToMeet) * 100;
}

// Backwards compatibility
export const TIERS = MASTER_BAITER_TIERS;
export function getTierFromXP(xp: number) {
    // Convert XP to approximate stats for backwards compatibility
    return getTierFromStats({ tips: Math.floor(xp / 10) });
}

export function getXPProgress(xp: number) {
    const stats = { tips: Math.floor(xp / 10) };
    const currentTier = getTierFromStats(stats);
    return getTierProgress(stats, currentTier);
}
