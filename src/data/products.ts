export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
    reviews: number;
}

export const mockProducts: Product[] = [
    { id: '101', name: '500 Nova Tokens', price: 49.99, description: 'Purchase tokens to tip your favorite models and play games.', image: '/products/tokens-pile.png', category: 'Tokens', rating: 5.0, reviews: 892 },
    { id: '102', name: 'Custom Profile Frame', price: 4.99, description: 'Stand out in the chat with a unique animated profile frame.', image: '/products/frame-gold.png', category: 'Customization', rating: 4.5, reviews: 56 },
    { id: '103', name: 'Interactive Tip Toy', price: 89.99, description: 'Syncs with the games. Vibrate on win!', image: '/products/toy.png', category: 'Merch', rating: 4.9, reviews: 12 },
    // Gold Collection
    { id: 'g1', name: 'Gold Sweater', price: 49.99, description: 'Premium cotton blend gold sweater. 10/12 Limited Edition.', image: '/products/ManSweater2.png', category: 'Merch', rating: 4.8, reviews: 24 },
    { id: 'g2', name: 'Gold Shorts', price: 34.99, description: 'Comfort fit gold shorts for lounging in luxury.', image: '/products/GoldMenShorts.png', category: 'Merch', rating: 4.7, reviews: 18 },
    { id: 'g3', name: 'Gold Shorts (W)', price: 34.99, description: 'Womens cut gold shorts.', image: '/products/WomansShortsGold.png', category: 'Merch', rating: 4.9, reviews: 30 },
    { id: 'g4', name: 'Gold Tier Sweater (W)', price: 49.99, description: 'Gold Collection exclusive sweater for her.', image: '/products/WomanSweater1.png', category: 'Merch', rating: 5.0, reviews: 42 },
    // Diamond Collection
    { id: 'd1', name: 'Diamond Hoodie', price: 59.99, description: 'Heavyweight diamond hoodie. Shine bright.', image: '/products/DiamondSweaterFront.png', category: 'Merch', rating: 4.9, reviews: 55 },
    { id: 'd2', name: 'Diamond Shorts', price: 39.99, description: 'Diamond pattern shorts.', image: '/products/DiamondShortsMen.png', category: 'Merch', rating: 4.6, reviews: 22 },
    { id: 'd3', name: 'Diamond Chain', price: 129.99, description: 'iced out diamond chain accessory.', image: '/products/NewDiamondChain.png', category: 'Merch', rating: 5.0, reviews: 8 },
    { id: 'd4', name: 'Bracelet', price: 24.99, description: 'Diamond accent bracelet.', image: '/products/DiamondBraceletMan.png', category: 'Merch', rating: 4.5, reviews: 15 },
    { id: 'd5', name: 'Diamond Hoodie (W)', price: 59.99, description: 'Womens diamond hoodie.', image: '/products/DiamondSweaterFrontWoman.png', category: 'Merch', rating: 4.9, reviews: 40 },
    { id: 'd6', name: 'Diamond Shorts (W)', price: 39.99, description: 'Womens diamond shorts.', image: '/products/WomanDiamondShorts.png', category: 'Merch', rating: 4.7, reviews: 25 },
    { id: 'd7', name: 'Chain (W)', price: 129.99, description: 'Elegant diamond chain for her.', image: '/products/WomanDiamondChain2.png', category: 'Merch', rating: 5.0, reviews: 12 },
    { id: 'd8', name: 'Pouch', price: 29.99, description: 'Diamond collection accessory pouch.', image: '/products/sam_chain_pouch_cleaned.png', category: 'Merch', rating: 4.4, reviews: 35 },
    // Platinum Collection
    { id: 'p1', name: 'Platinum Shirt', price: 44.99, description: 'Platinum thread tee.', image: '/products/PlatinumShirtFrontMale.png', category: 'Merch', rating: 4.8, reviews: 19 },
    { id: 'p2', name: 'Platinum Shorts', price: 39.99, description: 'Platinum athletic shorts.', image: '/products/PlatinumShortsMale.png', category: 'Merch', rating: 4.7, reviews: 14 },
    { id: 'p3', name: 'Platinum Pants', price: 69.99, description: 'Platinum joggers.', image: '/products/PlatinumPantsMan.jpg', category: 'Merch', rating: 4.9, reviews: 28 },
    { id: 'p4', name: 'Platinum Socks', price: 14.99, description: 'Performance socks.', image: '/products/PlatinumSocksMale.png', category: 'Merch', rating: 4.5, reviews: 100 },
    { id: 'p5', name: 'Sweater (W)', price: 64.99, description: 'Women\'s Platinum sweater.', image: '/products/WomanPlatinumSweaterFront.png', category: 'Merch', rating: 5.0, reviews: 33 },
    { id: 'p6', name: 'Shorts (W)', price: 39.99, description: 'Women\'s Platinum shorts.', image: '/products/PlatinumShortsWoman.png', category: 'Merch', rating: 4.8, reviews: 21 },
    { id: 'p7', name: 'Runners (W)', price: 89.99, description: 'Platinum series running shoes.', image: '/products/WomanPlatinumRunners.png', category: 'Merch', rating: 4.9, reviews: 9 },
    { id: 'p8', name: 'Heels (W)', price: 99.99, description: 'Evening heels.', image: '/products/WomanPlatinumHeels.png', category: 'Merch', rating: 5.0, reviews: 5 }
];
