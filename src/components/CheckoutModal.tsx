'use client';

import { useState } from 'react';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCartStore } from '@/store/useCartStore';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const [orderComplete, setOrderComplete] = useState(false);
    const { cart, clearCart } = useCartStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                >
                    ✕
                </button>

                {!orderComplete ? (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-fuchsia-500/20 text-fuchsia-500 rounded-full flex items-center justify-center mx-auto text-2xl animate-pulse">
                            <FaShoppingCart />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Print-on-Demand Checkout</h3>
                            <p className="text-zinc-400 text-sm">
                                In a live environment, this would connect to <strong>Printful/Printify API</strong>.
                            </p>
                        </div>

                        <div className="bg-zinc-950 p-4 rounded-lg text-left text-xs space-y-2 font-mono text-zinc-500">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="text-white">${cart.reduce((t, i) => t + i.price, 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Manufacturing (Est):</span>
                                <span className="text-white">${(cart.length * 12.50).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t border-zinc-800 pt-2">
                                <span className="text-fuchsia-500 font-bold">PROFIT:</span>
                                <span className="text-fuchsia-500 font-bold">
                                    ${(cart.reduce((t, i) => t + i.price, 0) - (cart.length * 12.50)).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setOrderComplete(true);

                                fetch('/api/checkout', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ cart: cart, customerInfo: {} })
                                });
                                clearCart();
                            }}
                            className="w-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-bold py-3 rounded-xl transition-all"
                        >
                            Simulate "Send to Production"
                        </button>
                    </div>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto text-2xl">
                            <FaCheck />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Order Sent!</h3>
                            <p className="text-zinc-400 text-sm">
                                The order has been sent to the manufacturer. It will be printed, packed, and shipped directly to the customer.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                onClose();
                                setOrderComplete(false);
                            }}
                            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-xl transition-all"
                        >
                            Close Demo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
