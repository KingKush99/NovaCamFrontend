'use client';

import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
            <div className="w-full max-w-md p-8 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl text-center">
                <div className="mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-600 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                        <span className="font-black text-3xl text-white">N</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter mb-2">
                        NOVELTY <span className="text-fuchsia-500">CAMS</span>
                    </h1>
                    <p className="text-zinc-400 text-sm">Sign in to start playing and earning</p>
                </div>

                <button
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-zinc-200 transition-colors"
                >
                    <FaGoogle className="text-xl" />
                    Continue with Google
                </button>

                <div className="mt-8 text-xs text-zinc-500">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                    <br />
                    Must be 18+ to enter.
                </div>
            </div>
        </div>
    );
}
