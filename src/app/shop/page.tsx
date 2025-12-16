'use client';

import { useState } from 'react';
import Link from 'next/link';
import GlobalHeader from '@/components/GlobalHeader';
import Footer from '@/components/Footer';
import CheckoutModal from '@/components/CheckoutModal';
import { FaShoppingCart, FaSearch, FaStar, FaCheck, FaGem, FaCrown, FaTrophy, FaPlus, FaCreditCard } from 'react-icons/fa';
import { SUBSCRIPTION_TIERS } from '@/data/subscriptions';
import { mockProducts, Product } from '@/data/products'; // Shared data
import { lovenseProducts } from '@/data/lovenseProducts'; // Affiliate data
import { useCartStore } from '@/store/useCartStore';     // Global Cart

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [showCheckout, setShowCheckout] = useState(false);

    // Global Cart
    const { cart, addToCart } = useCartStore();

    const categories = ['All', 'Tokens', 'Customization', 'Toys', 'Merch'];

    // Combine products for display
    const allProducts = [
        ...mockProducts,
        ...lovenseProducts.map(p => ({
            ...p,
            image: '', // Use placeholder or icon in render
            isExternal: true // Flag for external link
        }))
    ];

    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory || (selectedCategory === 'Merch' && (product.name.includes('Gold') || product.name.includes('Diamond') || product.name.includes('Platinum')));
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleQuickCheckout = (e: React.MouseEvent, product: any) => {
        e.preventDefault();
        if (product.isExternal) {
            window.open(product.affiliateLink, '_blank');
        } else {
            addToCart(product);
            setShowCheckout(true);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-fuchsia-500/30">
            <GlobalHeader />

            <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />

            <main className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tight">
                            Nova Shop
                        </h1>
                        <p className="text-gray-400 font-medium">Upgrade your status, unlock rewards, and get the gear.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-zinc-900 px-6 py-3 rounded-full border border-zinc-800 shadow-lg shadow-fuchsia-900/10">
                        <FaShoppingCart className="text-fuchsia-400 text-xl" />
                        <span className="font-bold">{cart.length} items</span>
                        <span className="text-zinc-600">|</span>
                        <span className="font-bold text-cyan-400">
                            ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                        </span>
                        <button
                            onClick={() => setShowCheckout(true)}
                            disabled={cart.length === 0}
                            className="bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold px-4 py-2 rounded-full transition-colors uppercase tracking-wider"
                        >
                            Checkout
                        </button>
                    </div>
                </div>

                {/* SUBSCRIPTION TIERS SECTION */}
                <section className="mb-20">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase italic tracking-wider flex items-center gap-2">
                                <FaCrown className="text-yellow-400" /> Subscription Tiers
                            </h2>
                            <p className="text-zinc-400 text-sm mt-1">Monthly rewards, exclusive perks, and evolving avatars.</p>
                        </div>

                        {/* Billing Toggle */}
                        <div className="bg-zinc-900 p-1 rounded-full border border-zinc-800 flex items-center">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${billingCycle === 'monthly' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${billingCycle === 'yearly' ? 'bg-fuchsia-600 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                Yearly <span className="text-[10px] ml-1 opacity-80">(Save 15%)</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {SUBSCRIPTION_TIERS.map((tier) => (
                            <div key={tier.id} className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden hover:border-zinc-600 transition-all group flex flex-col">
                                {/* Header */}
                                <div className={`p-6 bg-gradient-to-br ${tier.color} relative overflow-hidden`}>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-black uppercase text-white drop-shadow-md">{tier.name}</h3>
                                            {tier.name === 'Diamond' && <FaGem className="text-white/80 text-2xl" />}
                                            {tier.name === 'Gold' && <FaTrophy className="text-white/80 text-2xl" />}
                                            {tier.name === 'Platinum' && <FaCrown className="text-white/80 text-2xl" />}
                                        </div>
                                        <div className="flex items-baseline gap-1 text-white drop-shadow-md">
                                            <span className="text-3xl font-bold">
                                                ${billingCycle === 'monthly' ? tier.price : (tier.price * 12 * 0.85).toFixed(2)}
                                            </span>
                                            <span className="text-xs font-medium opacity-90">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                                        </div>
                                        {/* Variants */}
                                        <div className="flex gap-2 mt-3">
                                            {tier.variants.map(v => (
                                                <span key={v} className="text-[10px] font-bold uppercase bg-black/20 px-2 py-1 rounded text-white/90">
                                                    {v}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Abstract BG Pattern */}
                                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
                                </div>

                                {/* Rewards Timeline */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h4 className="font-bold text-xs uppercase text-zinc-500 mb-4 tracking-wider">
                                        {billingCycle === 'monthly' ? 'Monthly Progression' : 'Yearly Perks Included'}
                                    </h4>

                                    {billingCycle === 'monthly' ? (
                                        <div className="space-y-4 relative pl-4 border-l border-zinc-800 flex-1">
                                            {tier.rewards.map((r, i) => (
                                                <div key={i} className="relative flex items-start gap-3 group/item">
                                                    <div className={`absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-950 ${i === 0 ? 'bg-fuchsia-500' : 'bg-zinc-700'}`}></div>
                                                    {r.image && (
                                                        <div className="w-8 h-8 rounded bg-zinc-800 shrink-0 border border-zinc-700 overflow-hidden">
                                                            <img src={r.image} alt={r.description} className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                                                        </div>
                                                    )}
                                                    <div className="text-xs">
                                                        <span className="font-bold text-zinc-300">Month {r.month}</span>
                                                        <p className="text-zinc-400 leading-tight mt-0.5 group-hover/item:text-white transition-colors">
                                                            {r.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex-1">
                                            <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 p-4 rounded-xl mb-4">
                                                <p className="text-sm text-fuchsia-200 leading-relaxed font-medium">
                                                    {tier.yearlyPerks}
                                                </p>
                                            </div>
                                            <ul className="space-y-2">
                                                {tier.rewards.slice(0, 3).map((r, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                                                        <FaCheck className="text-green-500 shrink-0" /> {r.description}
                                                    </li>
                                                ))}
                                                <li className="text-xs text-zinc-500 italic ml-6">+ Everything else instantly</li>
                                            </ul>
                                        </div>
                                    )}

                                    <button
                                        className={`w-full mt-6 py-3 rounded-xl font-bold uppercase text-sm transition-all hover:scale-[1.02] active:scale-[0.98]
                                            ${tier.name === 'Gold' ? 'bg-yellow-500 hover:bg-yellow-400 text-black' :
                                                tier.name === 'Diamond' ? 'bg-cyan-500 hover:bg-cyan-400 text-black' :
                                                    'bg-slate-200 hover:bg-white text-slate-900'}`}
                                        onClick={() => addToCart({ id: `sub-${tier.id}`, name: `${tier.name} Subscription`, price: tier.price, category: 'Subscription', description: tier.yearlyPerks, image: '', rating: 5, reviews: 0 })}
                                    >
                                        Subscribe Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="w-full h-px bg-zinc-800 mb-12"></div>

                {/* Filters & Search - KEEPING DATA-DRIVEN */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto font-sans">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === category
                                    ? 'bg-fuchsia-600 text-white'
                                    : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search merch & tokens..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                        />
                    </div>
                </div>

                {/* PRODUCT GRID - NOW WITH LINKS + CHECKOUT ON HOVER (BOTTOM) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {filteredProducts.map((product: any) => (
                        <div key={product.id} className="relative group">
                            {/* Product Card */}
                            <div onClick={(e) => handleQuickCheckout(e, product)} className="block h-full bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-fuchsia-500/50 hover:shadow-lg hover:shadow-fuchsia-500/10 transition-all cursor-pointer relative">
                                <div className="aspect-square bg-zinc-800 relative overflow-hidden flex items-center justify-center">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="text-4xl text-zinc-700">
                                            {product.category === 'Toys' ? '🔌' : '🛍️'}
                                        </div>
                                    )}

                                    {product.category !== 'Tokens' && (
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                                            {product.category}
                                        </div>
                                    )}

                                    {/* HOVER CHECKOUT BUTTON (BOTTOM) */}
                                    <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent double trigger
                                                handleQuickCheckout(e, product);
                                            }}
                                            className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 uppercase text-xs tracking-wider"
                                        >
                                            {product.isExternal ? <><FaCreditCard /> Buy on Lovense</> : <><FaCreditCard /> Checkout</>}
                                        </button>
                                    </div>

                                    {/* Gradient overlay on hover to make button pop */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
                                </div>
                                <div className="p-4 z-30 relative bg-zinc-900">
                                    <h4 className="font-bold text-sm truncate mb-1 group-hover:text-fuchsia-400 transition-colors">{product.name}</h4>
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-300 font-bold">${product.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                                            <FaStar className="text-yellow-500" /> {product.rating}
                                        </div>
                                    </div>
                                    {product.isExternal && <p className="text-[10px] text-zinc-500 mt-1 truncate">{product.description}</p>}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </main>

            <Footer />
        </div>
    );
}
