'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import GlobalHeader from '@/components/GlobalHeader';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { mockProducts } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import CheckoutModal from '@/components/CheckoutModal';
import { FaShoppingCart, FaStar, FaCheck, FaArrowLeft, FaHeart, FaCreditCard } from 'react-icons/fa';

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;
    const { addToCart } = useCartStore();
    const [showCheckout, setShowCheckout] = useState(false);

    const product = mockProducts.find(p => p.id === id);

    if (!product) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white font-sans flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                    <Link href="/shop" className="text-fuchsia-400 hover:underline">Return to Shop</Link>
                </div>
            </div>
        );
    }

    const handleBuyNow = () => {
        addToCart(product);
        setShowCheckout(true);
    };

    // Suggestions: Filter out current product, take first 4 items of same category
    const suggestions = mockProducts
        .filter(p => p.id !== product.id && (p.category === product.category || p.category === 'Merch'))
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-fuchsia-500/30">
            <GlobalHeader />

            <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />

            <main className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/shop" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
                    <FaArrowLeft /> Back to Shop
                </Link>

                {/* Main Product View */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row mb-16">
                    {/* Image Side */}
                    <div className="md:w-1/2 bg-zinc-950 flex items-center justify-center p-12 relative min-h-[400px]">
                        <div className="absolute inset-0 bg-radial-gradient from-zinc-900 via-zinc-950 to-zinc-950 opacity-50"></div>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-w-full max-h-[500px] object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Details Side */}
                    <div className="md:w-1/2 p-10 flex flex-col justify-center">
                        <div>
                            <span className="inline-block bg-fuchsia-500/10 text-fuchsia-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-fuchsia-500/20">
                                {product.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight mb-4">{product.name}</h1>

                            <div className="flex items-center gap-6 mb-8">
                                <p className="text-3xl font-bold text-white">${product.price.toFixed(2)}</p>
                                <div className="flex items-center gap-2 text-sm text-zinc-400 bg-zinc-800 px-3 py-1.5 rounded-full">
                                    <FaStar className="text-yellow-500" />
                                    <span className="font-bold text-white">{product.rating}</span>
                                    <span>({product.reviews} reviews)</span>
                                </div>
                            </div>

                            <p className="text-zinc-300 text-lg leading-relaxed mb-8 border-l-2 border-zinc-800 pl-4">
                                {product.description}
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500"><FaCheck size={10} /></div>
                                    <span>In Stock & Ready to Ship</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500"><FaCheck size={10} /></div>
                                    <span>Premium Quality Material</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500"><FaCheck size={10} /></div>
                                    <span>Secure Checkout via Stripe</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-black uppercase py-4 rounded-xl hover:from-fuchsia-500 hover:to-cyan-500 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-fuchsia-500/20"
                            >
                                <FaCreditCard /> Buy Now
                            </button>
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-white text-black font-black uppercase py-4 rounded-xl hover:bg-zinc-200 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-white/5"
                            >
                                <FaShoppingCart /> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggestions Section */}
                <div className="border-t border-zinc-800 pt-16">
                    <h3 className="text-xl font-bold text-zinc-500 uppercase tracking-widest mb-8 text-center">Are you still interested in...</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {suggestions.map((suggestion) => (
                            <Link href={`/shop/product/${suggestion.id}`} key={suggestion.id} className="group bg-zinc-900/50 rounded-xl border border-zinc-800/50 hover:border-zinc-700 p-4 transition-all hover:bg-zinc-900">
                                <div className="aspect-square bg-zinc-800/50 rounded-lg mb-4 overflow-hidden relative">
                                    <img src={suggestion.image} alt={suggestion.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                </div>
                                <h4 className="font-bold text-sm truncate mb-1 text-zinc-300 group-hover:text-white">{suggestion.name}</h4>
                                <p className="text-fuchsia-500 font-bold text-xs">${suggestion.price.toFixed(2)}</p>
                            </Link>
                        ))}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
