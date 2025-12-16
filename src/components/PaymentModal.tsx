'use client';

import { useState } from 'react';
import { FaTimes, FaCreditCard, FaBitcoin, FaLock, FaCheckCircle } from 'react-icons/fa';
import { SiEthereum, SiLitecoin } from 'react-icons/si';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    item: string;
}

export default function PaymentModal({ isOpen, onClose, amount, item }: PaymentModalProps) {
    const [method, setMethod] = useState<'card' | 'crypto'>('card');
    const [step, setStep] = useState(1);
    const [processing, setProcessing] = useState(false);

    if (!isOpen) return null;

    const handlePay = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setStep(3); // Success
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex justify-between items-center">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <FaLock className="text-green-500" /> Secure Checkout
                    </h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white"><FaTimes /></button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === 3 ? (
                        <div className="text-center py-8">
                            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4 animate-bounce" />
                            <h2 className="text-2xl font-black text-white mb-2">Payment Successful!</h2>
                            <p className="text-zinc-400 mb-6">You have purchased <strong>{item}</strong>.</p>
                            <button onClick={onClose} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg">
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Order Summary */}
                            <div className="mb-6 bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex justify-between items-center">
                                <span className="text-zinc-400">{item}</span>
                                <span className="font-bold text-2xl text-white">${amount.toFixed(2)}</span>
                            </div>

                            {/* Method Selection */}
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setMethod('card')}
                                    className={`flex-1 py-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'card' ? 'bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-500' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'}`}
                                >
                                    <FaCreditCard className="text-xl" />
                                    <span className="text-xs font-bold uppercase">Credit Card</span>
                                </button>
                                <button
                                    onClick={() => setMethod('crypto')}
                                    className={`flex-1 py-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'crypto' ? 'bg-orange-500/20 border-orange-500 text-orange-500' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'}`}
                                >
                                    <div className="flex gap-1">
                                        <FaBitcoin /><SiEthereum />
                                    </div>
                                    <span className="text-xs font-bold uppercase">Crypto</span>
                                </button>
                            </div>

                            {/* Form */}
                            {method === 'card' ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Card Number</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-fuchsia-500 focus:outline-none font-mono" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Expiry</label>
                                            <input type="text" placeholder="MM/YY" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-fuchsia-500 focus:outline-none font-mono" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">CVC</label>
                                            <input type="text" placeholder="123" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-fuchsia-500 focus:outline-none font-mono" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-4 space-y-4">
                                    <div className="bg-white p-4 inline-block rounded-xl">
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=${amount}`} alt="QR Code" />
                                    </div>
                                    <p className="text-xs text-zinc-400">Scan to pay with Bitcoin, Ethereum, or Litecoin.</p>
                                    <div className="bg-zinc-950 p-3 rounded border border-zinc-800 font-mono text-xs text-zinc-500 break-all">
                                        1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                                    </div>
                                </div>
                            )}

                            {/* Pay Button */}
                            <button
                                onClick={handlePay}
                                disabled={processing}
                                className="w-full mt-6 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {processing ? (
                                    <>Processing...</>
                                ) : (
                                    <>PAY ${amount.toFixed(2)}</>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
