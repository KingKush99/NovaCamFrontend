'use client';

import { useParams, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import PlaceholderPage from '@/components/PlaceholderPage';
import GlobalHeader from '@/components/GlobalHeader';
import Footer from '@/components/Footer';
import { FaUserCircle, FaArrowLeft, FaCoins } from 'react-icons/fa';
import { getTierFromXP, getXPProgress } from '@/lib/tiers';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUserStore();
  const username = params.username as string;

  // In a real app, you'd fetch the specific user's profile
  // For now, if "me", show current user, otherwise show placeholder
  const isMe = username === 'me' || (user && user.username === username);

  if (!isMe) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <GlobalHeader />
        <main className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors font-bold"
          >
            <FaArrowLeft /> Back to Home
          </button>
          <PlaceholderPage title={`Profile: ${username}`} icon={FaUserCircle} description="User profile visualization." />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) return null; // Loading or redirect

  const tier = getTierFromXP(user.xp);
  const progress = getXPProgress(user.xp);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <GlobalHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors font-bold"
        >
          <FaArrowLeft /> Back to Home
        </button>

        {/* Profile Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-fuchsia-600 to-violet-600" />

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-fuchsia-500 to-cyan-500">
              <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border-4 border-zinc-900">
                <FaUserCircle className="text-6xl text-zinc-600" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black mb-2">{user.username}</h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 mb-4">
                <span className="font-bold text-sm" style={{ color: tier.color }}>{tier.name}</span>
              </div>

              <p className="text-zinc-400 mb-6 max-w-lg">
                Member of NovaCam. Climbing the ranks to become the ultimate Master-Baiter.
              </p>

              <div className="flex gap-4 justify-center md:justify-start">
                <div className="bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800">
                  <div className="text-xs text-zinc-500 uppercase font-bold">Tokens</div>
                  <div className="flex items-center gap-1 font-mono text-lg text-yellow-500 font-bold">
                    <FaCoins /> {user.tokens}
                  </div>
                </div>
                <div className="bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800">
                  <div className="text-xs text-zinc-500 uppercase font-bold">XP</div>
                  <div className="font-mono text-lg text-cyan-400 font-bold">
                    {user.xp.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">Tier Progress</h2>
          <div className="mb-4 flex justify-between text-sm font-bold">
            <span style={{ color: tier.color }}>{tier.name}</span>
            <span className="text-zinc-500">Next Tier</span>
          </div>
          <div className="h-4 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%`, backgroundColor: tier.color }}
            />
          </div>
          <div className="mt-2 text-right text-xs text-zinc-500 font-mono">
            {Math.floor(progress)}% to next rank
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}