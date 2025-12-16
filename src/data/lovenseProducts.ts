export interface LovenseProduct {
    id: string;
    name: string;
    affiliateLink: string;
    price: number;
    description: string;
    category: 'Toys';
    image: string;
    rating: number;
    reviews: number;
}

// Lovense CDN image base
const IMG = 'https://www.lovense.com/files/images/products';

export const lovenseProducts: LovenseProduct[] = [
    // ========== SINGLE PRODUCTS ==========
    { id: 'lush-3', name: 'Lush 3', affiliateLink: 'https://www.lovense.com/r/jcxsru', price: 139.00, description: 'The most popular Bluetooth remote control egg vibrator.', category: 'Toys', image: `${IMG}/lush3/lush3-cover.jpg`, rating: 5.0, reviews: 2450 },
    { id: 'lush-4', name: 'Lush 4', affiliateLink: 'https://www.lovense.com/r/kq2x0q', price: 149.00, description: 'Next gen bluetooth remote control egg.', category: 'Toys', image: `${IMG}/lush4/lush4-cover.jpg`, rating: 5.0, reviews: 500 },
    { id: 'nora', name: 'Nora', affiliateLink: 'https://www.lovense.com/r/uj0pgi', price: 139.00, description: 'Bluetooth rabbit vibrator with rotating head.', category: 'Toys', image: `${IMG}/nora/nora-cover.jpg`, rating: 4.8, reviews: 1200 },
    { id: 'ferri', name: 'Ferri', affiliateLink: 'https://www.lovense.com/r/dunwn5', price: 129.00, description: 'App controlled panty vibrator with magnetic clip.', category: 'Toys', image: `${IMG}/ferri/ferri-cover.jpg`, rating: 4.7, reviews: 890 },
    { id: 'domi-2', name: 'Domi 2', affiliateLink: 'https://www.lovense.com/r/vp9acg', price: 139.00, description: 'Powerful Bluetooth wand vibrator.', category: 'Toys', image: `${IMG}/domi2/domi2-cover.jpg`, rating: 4.9, reviews: 1500 },
    { id: 'domi', name: 'Domi', affiliateLink: 'https://www.lovense.com/r/f4lrmy', price: 119.00, description: 'Original Bluetooth wand vibrator.', category: 'Toys', image: `${IMG}/domi/domi-cover.jpg`, rating: 4.7, reviews: 800 },
    { id: 'max-2', name: 'Max 2', affiliateLink: 'https://www.lovense.com/r/uy82bn', price: 139.00, description: 'The ultimate male masturbator with air-vent technology.', category: 'Toys', image: `${IMG}/max2/max2-cover.jpg`, rating: 4.8, reviews: 1100 },
    { id: 'edge-2', name: 'Edge 2', affiliateLink: 'https://www.lovense.com/r/rl6ygk', price: 139.00, description: 'Adjustable prostate massager for extended pleasure.', category: 'Toys', image: `${IMG}/edge2/edge2-cover.jpg`, rating: 4.9, reviews: 950 },
    { id: 'solace-pro', name: 'Solace Pro', affiliateLink: 'https://www.lovense.com/r/5mmtyx', price: 179.00, description: 'Automatic hands-free stroker.', category: 'Toys', image: `${IMG}/solace-pro/solace-pro-cover.jpg`, rating: 4.7, reviews: 400 },
    { id: 'solace', name: 'Solace', affiliateLink: 'https://www.lovense.com/r/qsuzrf', price: 149.00, description: 'App controlled stroker.', category: 'Toys', image: `${IMG}/solace/solace-cover.jpg`, rating: 4.6, reviews: 350 },
    { id: 'hush-2', name: 'Hush 2', affiliateLink: 'https://www.lovense.com/r/dn8x7s', price: 139.00, description: 'Teledildonic butt plug for all-day wear.', category: 'Toys', image: `${IMG}/hush2/hush2-cover.jpg`, rating: 4.6, reviews: 800 },
    { id: 'gush-2', name: 'Gush 2', affiliateLink: 'https://www.lovense.com/r/p7hyv8', price: 129.00, description: 'Glans massager for intense pleasure.', category: 'Toys', image: `${IMG}/gush2/gush2-cover.jpg`, rating: 4.5, reviews: 300 },
    { id: 'gush', name: 'Gush', affiliateLink: 'https://www.lovense.com/r/zbxavg', price: 99.00, description: 'Original glans massager.', category: 'Toys', image: `${IMG}/gush/gush-cover.jpg`, rating: 4.4, reviews: 200 },
    { id: 'diamo', name: 'Diamo', affiliateLink: 'https://www.lovense.com/r/37hzwd', price: 159.00, description: 'Wearable cock ring vibrator.', category: 'Toys', image: `${IMG}/diamo/diamo-cover.jpg`, rating: 4.8, reviews: 200 },
    { id: 'calor', name: 'Calor', affiliateLink: 'https://www.lovense.com/r/y6esdn', price: 99.00, description: 'Heating masturbator.', category: 'Toys', image: `${IMG}/calor/calor-cover.jpg`, rating: 4.7, reviews: 150 },
    { id: 'mission-2', name: 'Mission 2', affiliateLink: 'https://www.lovense.com/r/kbzfmg', price: 169.00, description: 'Thrusting vibrator.', category: 'Toys', image: `${IMG}/mission2/mission2-cover.jpg`, rating: 4.8, reviews: 180 },
    { id: 'osci-3', name: 'Osci 3', affiliateLink: 'https://www.lovense.com/r/5ljmix', price: 149.00, description: 'Oscillating G-spot vibrator.', category: 'Toys', image: `${IMG}/osci2/osci2-cover.jpg`, rating: 4.6, reviews: 220 },
    { id: 'vulse', name: 'Vulse', affiliateLink: 'https://www.lovense.com/r/yu2jvu', price: 129.00, description: 'Egg vibrator with thrusting.', category: 'Toys', image: `${IMG}/vulse/vulse-cover.jpg`, rating: 4.5, reviews: 100 },
    { id: 'spinel', name: 'Spinel', affiliateLink: 'https://www.lovense.com/r/px7a9u', price: 89.00, description: 'Lightweight prostate massager.', category: 'Toys', image: `${IMG}/spinel/spinel-cover.jpg`, rating: 4.4, reviews: 120 },
    { id: 'ambi', name: 'Ambi', affiliateLink: 'https://www.lovense.com/r/eb3ln5', price: 79.00, description: 'Bullet vibrator.', category: 'Toys', image: `${IMG}/ambi/ambi-cover.jpg`, rating: 4.5, reviews: 250 },
    { id: 'lush-mini', name: 'Lush Mini', affiliateLink: 'https://www.lovense.com/r/xvdz4q', price: 99.00, description: 'Compact egg vibrator.', category: 'Toys', image: `${IMG}/lush-mini/lush-mini-cover.jpg`, rating: 4.6, reviews: 180 },
    { id: 'gemini', name: 'Gemini', affiliateLink: 'https://www.lovense.com/r/rlk9mm', price: 99.00, description: 'Nipple vibrators.', category: 'Toys', image: `${IMG}/gemini/gemini-cover.jpg`, rating: 4.7, reviews: 300 },
    { id: 'hyphy', name: 'Hyphy', affiliateLink: 'https://www.lovense.com/r/xfkhjw', price: 129.00, description: 'Dual-end vibrator.', category: 'Toys', image: `${IMG}/hyphy/hyphy-cover.jpg`, rating: 4.6, reviews: 200 },
    { id: 'ridge', name: 'Ridge', affiliateLink: 'https://www.lovense.com/r/jpi2wa', price: 109.00, description: 'Vibrating cock ring.', category: 'Toys', image: `${IMG}/ridge/ridge-cover.jpg`, rating: 4.5, reviews: 150 },
    { id: 'exomoon', name: 'Exomoon', affiliateLink: 'https://www.lovense.com/r/53rqtv', price: 59.00, description: 'Lipstick vibrator.', category: 'Toys', image: `${IMG}/exomoon/exomoon-cover.jpg`, rating: 4.4, reviews: 100 },
    { id: 'tenera-2', name: 'Tenera 2', affiliateLink: 'https://www.lovense.com/r/dmyvqx', price: 129.00, description: 'Clitoral suction vibrator.', category: 'Toys', image: `${IMG}/tenera2/tenera2-cover.jpg`, rating: 4.7, reviews: 200 },
    { id: 'dolce', name: 'Dolce', affiliateLink: 'https://www.lovense.com/r/m7l3qa', price: 169.00, description: 'Couples vibrator.', category: 'Toys', image: `${IMG}/dolce/dolce-cover.jpg`, rating: 4.6, reviews: 180 },
    { id: 'flexer', name: 'Flexer', affiliateLink: 'https://www.lovense.com/r/1ssgre', price: 119.00, description: 'Come-hither vibrator.', category: 'Toys', image: `${IMG}/flexer/flexer-cover.jpg`, rating: 4.5, reviews: 150 },
    { id: 'gravity', name: 'Gravity', affiliateLink: 'https://www.lovense.com/r/mzqfyd', price: 249.00, description: 'Thrusting dildo with suction cup.', category: 'Toys', image: `${IMG}/gravity/gravity-cover.jpg`, rating: 4.7, reviews: 100 },
    { id: 'kraken', name: 'Kraken', affiliateLink: 'https://www.lovense.com/r/807k48', price: 299.00, description: 'Male masturbator with thrusting.', category: 'Toys', image: `${IMG}/kraken/kraken-cover.jpg`, rating: 4.8, reviews: 80 },
    // Machines
    { id: 'sex-machine-mini', name: 'Mini Sex Machine', affiliateLink: 'https://www.lovense.com/r/lkhl66', price: 499.00, description: 'Compact thrusting machine.', category: 'Toys', image: `${IMG}/sex-machine-mini/sex-machine-mini-cover.jpg`, rating: 4.9, reviews: 50 },
    { id: 'sex-machine', name: 'Sex Machine', affiliateLink: 'https://www.lovense.com/r/fsnv13', price: 999.00, description: 'Full-size thrusting machine.', category: 'Toys', image: `${IMG}/sex-machine/sex-machine-cover.jpg`, rating: 5.0, reviews: 30 },
    // Accessories
    { id: 'webcam-2', name: 'Webcam 2', affiliateLink: 'https://www.lovense.com/r/6hdasx', price: 149.00, description: '4K webcam for streaming.', category: 'Toys', image: `${IMG}/webcam2/webcam2-cover.jpg`, rating: 4.8, reviews: 200 },
    { id: 'harness', name: 'Harness', affiliateLink: 'https://www.lovense.com/r/m488os', price: 49.00, description: 'Strap-on harness.', category: 'Toys', image: `${IMG}/harness/harness-cover.jpg`, rating: 4.5, reviews: 100 },
    { id: 'lube-water', name: 'Water-Based Lubricant', affiliateLink: 'https://www.lovense.com/r/7j1no0', price: 14.00, description: 'Water-based lube.', category: 'Toys', image: `${IMG}/lube/lube-water-cover.jpg`, rating: 4.6, reviews: 300 },
    { id: 'lube-jelly', name: 'Lubricant Jelly', affiliateLink: 'https://www.lovense.com/r/61ew1n', price: 16.00, description: 'Personal lubricant jelly.', category: 'Toys', image: `${IMG}/lube/lube-jelly-cover.jpg`, rating: 4.5, reviews: 200 },
    // ========== BUNDLES ==========
    { id: 'nora-max2-bundle', name: 'Nora + Max 2', affiliateLink: 'https://www.lovense.com/r/0j6l1k', price: 248.00, description: 'Couples bundle for long-distance.', category: 'Toys', image: `${IMG}/bundle/nora-max2-bundle.jpg`, rating: 4.9, reviews: 400 },
    { id: 'lush4-nora-bundle', name: 'Lush 4 + Nora', affiliateLink: 'https://www.lovense.com/r/yegwkh', price: 258.00, description: 'Double pleasure bundle.', category: 'Toys', image: `${IMG}/bundle/lush4-nora-bundle.jpg`, rating: 4.8, reviews: 150 },
    { id: 'lush4-ferri-bundle', name: 'Lush 4 + Ferri', affiliateLink: 'https://www.lovense.com/r/w9couq', price: 248.00, description: 'Wearable bundle.', category: 'Toys', image: `${IMG}/bundle/lush4-ferri-bundle.jpg`, rating: 4.7, reviews: 120 },
    { id: 'ferri-gemini-bundle', name: 'Ferri + Gemini', affiliateLink: 'https://www.lovense.com/r/j01etd', price: 198.00, description: 'Full body stimulation.', category: 'Toys', image: `${IMG}/bundle/ferri-gemini-bundle.jpg`, rating: 4.6, reviews: 80 },
    { id: 'solace-pro-mission2-bundle', name: 'Solace Pro + Mission 2', affiliateLink: 'https://www.lovense.com/r/clv9ug', price: 318.00, description: 'Ultimate thrusting bundle.', category: 'Toys', image: `${IMG}/bundle/solace-pro-mission2-bundle.jpg`, rating: 4.8, reviews: 60 },
    { id: 'solace-pro-edge2-bundle', name: 'Solace Pro + Edge 2', affiliateLink: 'https://www.lovense.com/r/dwbzic', price: 288.00, description: 'Male pleasure bundle.', category: 'Toys', image: `${IMG}/bundle/solace-pro-edge2-bundle.jpg`, rating: 4.7, reviews: 70 },
    { id: 'gush2-edge2-bundle', name: 'Gush 2 + Edge 2', affiliateLink: 'https://www.lovense.com/r/6chveg', price: 238.00, description: 'Prostate and glans bundle.', category: 'Toys', image: `${IMG}/bundle/gush2-edge2-bundle.jpg`, rating: 4.6, reviews: 50 },
    { id: 'max2-edge2-bundle', name: 'Max 2 + Edge 2', affiliateLink: 'https://www.lovense.com/r/wcwxww', price: 248.00, description: 'Complete male bundle.', category: 'Toys', image: `${IMG}/bundle/max2-edge2-bundle.jpg`, rating: 4.8, reviews: 90 },
    { id: 'gush2-diamo-bundle', name: 'Gush 2 + Diamo', affiliateLink: 'https://www.lovense.com/r/4ipxim', price: 258.00, description: 'Cock ring combo.', category: 'Toys', image: `${IMG}/bundle/gush2-diamo-bundle.jpg`, rating: 4.5, reviews: 40 },
    { id: 'lush4-gush2-bundle', name: 'Lush 4 + Gush 2', affiliateLink: 'https://www.lovense.com/r/hr7jp0', price: 248.00, description: 'Couples bundle.', category: 'Toys', image: `${IMG}/bundle/lush4-gush2-bundle.jpg`, rating: 4.7, reviews: 60 },
    { id: 'lush4-hush2-bundle', name: 'Lush 4 + Hush 2', affiliateLink: 'https://www.lovense.com/r/6w2nck', price: 258.00, description: 'Double stimulation.', category: 'Toys', image: `${IMG}/bundle/lush4-hush2-bundle.jpg`, rating: 4.6, reviews: 55 },
    { id: 'gush2-hush2-bundle', name: 'Gush 2 + Hush 2', affiliateLink: 'https://www.lovense.com/r/uae10p', price: 238.00, description: 'Male anal bundle.', category: 'Toys', image: `${IMG}/bundle/gush2-hush2-bundle.jpg`, rating: 4.5, reviews: 45 },
    { id: 'lush4-gemini-bundle', name: 'Lush 4 + Gemini', affiliateLink: 'https://www.lovense.com/r/whyg2u', price: 218.00, description: 'Full body bundle.', category: 'Toys', image: `${IMG}/bundle/lush4-gemini-bundle.jpg`, rating: 4.7, reviews: 70 },
    { id: 'ferri-lush3-bundle', name: 'Ferri + Lush 3', affiliateLink: 'https://www.lovense.com/r/bq6sn4', price: 238.00, description: 'Wearable combo.', category: 'Toys', image: `${IMG}/bundle/ferri-lush3-bundle.jpg`, rating: 4.6, reviews: 85 },
    { id: 'lush3-gemini-bundle', name: 'Lush 3 + Gemini', affiliateLink: 'https://www.lovense.com/r/ts4hh8', price: 208.00, description: 'Multi-zone stimulation.', category: 'Toys', image: `${IMG}/bundle/lush3-gemini-bundle.jpg`, rating: 4.5, reviews: 65 },
];
