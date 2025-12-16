export type SubscriptionTierType = 'Gold' | 'Diamond' | 'Platinum';
export type GenderVariant = 'Men' | 'Women' | 'Unisex';

export interface MonthlyReward {
    month: number | string; // 1, 2, "7-12", etc.
    description: string;
    isDigital?: boolean;
    image?: string; // Path to product image
}

export interface SubscriptionTier {
    id: string;
    name: SubscriptionTierType;
    price: number; // Placeholder price
    variants: GenderVariant[];
    rewards: MonthlyReward[];
    yearlyPerks: string;
    color: string;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
    {
        id: 'gold',
        name: 'Gold',
        price: 9.99,
        variants: ['Men', 'Women'],
        color: 'from-yellow-400 to-yellow-600',
        rewards: [
            { month: 1, description: 'Tier Badge', isDigital: true, image: '/products/vip-badge.png' },
            { month: 2, description: 'Gold Shirt', image: '/products/tshirt-gold.png' },
            { month: 5, description: 'Black Shorts with Gold Stripe', image: '/products/shorts-black-gold.png' },
            { month: 7, description: 'Wristband ("OnlyBands" / "Golden Gripper")', image: '/products/wristband-gold.png' },
            { month: 12, description: 'Gold Sweater with “GOLD TIER” on back', image: '/products/sweater-gold.png' }
        ],
        yearlyPerks: 'All items at once + sweater included immediately at a 15% discount'
    },
    {
        id: 'diamond',
        name: 'Diamond',
        price: 19.99,
        variants: ['Men', 'Women'],
        color: 'from-cyan-400 to-blue-600',
        rewards: [
            { month: 1, description: 'Tier Badge', isDigital: true, image: '/products/vip-badge-diamond.png' },
            { month: 2, description: 'Wristband (“Diamond Daddy” / “Golden Gripper")', image: '/products/wristband-diamond.png' },
            { month: 3, description: 'Shorts', image: '/products/shorts-diamond.png' },
            { month: 4, description: 'Pants', image: '/products/pants-diamond.png' },
            { month: 5, description: 'Hoodie', image: '/products/hoodie-diamond.png' },
            { month: 6, description: 'Diamond Chain', image: '/products/chain-diamond.png' },
            { month: '7-12', description: '12 Avatars total (1/month). 1-8: Static 2D, 9-12: Animated 2D', isDigital: true, image: '/products/avatar-pack.png' }
        ],
        yearlyPerks: 'All physical items + 12 avatars unlocked at once + Exclusive Auction Access'
    },
    {
        id: 'platinum',
        name: 'Platinum',
        price: 29.99,
        variants: ['Unisex'],
        color: 'from-slate-300 to-slate-500',
        rewards: [
            { month: 1, description: 'Platinum Socks', image: '/products/socks-platinum.png' },
            { month: 2, description: 'Platinum Shorts', image: '/products/shorts-platinum.png' },
            { month: 3, description: 'Platinum Pants', image: '/products/pants-platinum.png' },
            { month: 4, description: 'Platinum Shirt', image: '/products/shirt-platinum.png' },
            { month: 5, description: 'Sweater', image: '/products/sweater-platinum.png' },
            { month: 6, description: 'Swimming Shorts', image: '/products/swim-platinum.png' },
            { month: 7, description: '3D Avatar 1', isDigital: true, image: '/products/avatar-3d.png' },
            { month: 8, description: 'Host Auction Access', isDigital: true, image: '/products/auction-hammer.png' },
            { month: 9, description: 'Exclusive Auctions', isDigital: true },
            { month: 10, description: 'Premium Avatars', isDigital: true },
            { month: 11, description: 'Custom Shoes', image: '/products/shoes-custom.png' },
            { month: 12, description: 'Prime Novelty Features', isDigital: true }
        ],
        yearlyPerks: 'All physical + digital items unlocked at signup + Avatar Evolution + Battle Arena Access'
    }
];
