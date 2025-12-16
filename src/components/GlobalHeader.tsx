'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaSearch, FaUser, FaGamepad, FaChevronDown, FaShoppingCart, FaAppStore, FaVideo, FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward, FaTrash, FaVolumeUp, FaVolumeMute, FaPlus, FaCreditCard, FaBitcoin, FaAd } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useUserStore } from '@/store/useUserStore';
import { useMusicStore } from '@/store/useMusicStore';
import PaymentModal from './PaymentModal';
import { WatchAdsModal } from './Modals';

export default function GlobalHeader() {
  const pathname = usePathname();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const { user } = useUserStore();

  // Modals State
  const [showFiatModal, setShowFiatModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [showAdsModal, setShowAdsModal] = useState(false);

  // Music Store
  const { playlist, currentTrackIndex, isPlaying, volume, isMuted, playTrack, togglePlay, playNext, playPrev, addTrack, removeTrack, setVolume, toggleMute } = useMusicStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync Audio with Store
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(e => console.error("Play error:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentTrackIndex < 0 || !playlist[currentTrackIndex]) return;

    const track = playlist[currentTrackIndex];
    if (audio.src !== track.url) {
      audio.src = track.url;
      if (isPlaying) audio.play();
    }
  }, [currentTrackIndex, playlist]);

  const affParam = '?tour=LQps&campaign=QvtQPh&track=header';

  // Navigation Links
  const topLinks = [
    { name: 'HOME', href: '/', external: false },
    { name: 'DISCOVER', href: '/discover', external: false },
    { name: 'TAGS', href: '/cams', external: false },
    { name: 'PRIVATE SHOWS', href: '/cams?type=private', external: false },
    { name: 'FOLLOWING (0/0)', href: '/profile/me/following', external: false },
    { name: 'MERCH', href: '/shop', external: false },
    { name: 'APPS', href: '/apps', external: false },
  ];

  // Internal Category Tabs - Restoring Interface Integration
  const categoryTabs = [
    { name: 'FEATURED', href: '/', external: false },
    { name: 'WOMEN', href: `/cams?category=women`, external: false },
    { name: 'MEN', href: `/cams?category=men`, external: false },
    { name: 'COUPLES', href: `/cams?category=couples`, external: false },
    { name: 'TRANS', href: `/cams?category=trans`, external: false },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-md font-sans">
      <audio ref={audioRef} onEnded={playNext} className="hidden" />

      {/* Modals */}
      <PaymentModal isOpen={showFiatModal} onClose={() => setShowFiatModal(false)} amount={10} item="100 Tokens (Fiat)" />
      <PaymentModal isOpen={showCryptoModal} onClose={() => setShowCryptoModal(false)} amount={50} item="500 Tokens (Crypto)" />
      <WatchAdsModal isOpen={showAdsModal} onClose={() => setShowAdsModal(false)} />

      {/* TOP ROW: Main Nav */}
      <div className="bg-[#0e7490] text-white text-sm font-bold uppercase tracking-wide">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between">

          {/* LEFT: Profile & Logo (Desktop) */}
          <div className="flex items-center gap-4">
            {/* Desktop Profile Icon (Left) */}
            <Link href="/profile/me" className="hidden md:block">
              <div className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white transition-colors">
                <FaUser className="text-lg" />
              </div>
            </Link>

            {/* Logo */}
            <Link href="/" className="mr-4 text-lg font-black tracking-tighter hover:opacity-80">
              NOVA<span className="text-cyan-200">CAM</span>
            </Link>
          </div>


          {/* CENTER: Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            {topLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-cyan-200 transition-colors drop-shadow-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT: Hamburger & Mobile Profile */}
          <div className="flex items-center gap-4">

            {/* Go Live (Desktop Only) */}
            <a
              href="https://chaturbate.com/accounts/register/?src=broadcast&next=/b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block bg-yellow-500 hover:bg-yellow-400 text-black text-[10px] px-3 py-1 rounded font-bold uppercase transition-colors"
            >
              Broadcast Me
            </a>

            {/* Mobile: Profile Icon */}
            <Link href="/profile/me" className="md:hidden">
              <div className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white transition-colors">
                <FaUser />
              </div>
            </Link>

            {/* Hamburger Button (Desktop & Mobile) */}
            <button
              onClick={() => setHamburgerOpen(!hamburgerOpen)}
              className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 hover:bg-zinc-700 transition-colors shadow-sm"
            >
              <FaBars className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Category Tabs */}
      <div className="bg-white border-b-[3px] border-[#e87722]">
        <div className="container mx-auto px-4 h-12 flex items-end overflow-x-auto no-scrollbar">
          {categoryTabs.map((tab) => {
            const isActive = pathname === tab.href || pathname.includes(tab.href.split('?')[0]);
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={clsx(
                  'px-6 py-3 text-sm font-bold uppercase transition-colors border-t border-x rounded-t-lg mb-[-3px] whitespace-nowrap',
                  isActive
                    ? 'bg-white text-[#e87722] border-[#e87722] border-b-white z-10'
                    : 'text-[#0e7490] border-transparent hover:bg-zinc-50'
                )}
              >
                {tab.name}
              </Link>
            );
          })}
          {/* Games Dropdown */}
          <div className="relative group ml-auto">
            <button className="px-6 py-3 text-sm font-bold uppercase text-fuchsia-600 hover:text-fuchsia-500 transition-colors flex items-center gap-2 whitespace-nowrap">
              <FaGamepad /> GAMES <FaChevronDown className="text-xs" />
            </button>
            <div className="absolute right-0 top-full bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[200px]">
              <Link
                href="/arcade/play/meme"
                className="block px-4 py-3 text-sm font-bold text-white hover:bg-fuchsia-600 transition-colors rounded-t-lg"
              >
                🎭 Name That Meme
              </Link>
              <Link
                href="/arcade/play/pornstar"
                className="block px-4 py-3 text-sm font-bold text-white hover:bg-fuchsia-600 transition-colors rounded-b-lg"
              >
                ⭐ Who's the Pornstar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger Menu Overlay */}
      {hamburgerOpen && (
        <div className="absolute top-12 right-0 w-full md:w-80 bg-zinc-900 text-white p-4 flex flex-col gap-4 shadow-2xl z-50 border-t md:border border-zinc-700 md:rounded-bl-xl font-sans">

          {/* Menu Actions */}
          <div className="space-y-2 pb-4 border-b border-zinc-800">
            <button onClick={() => { setShowFiatModal(true); setHamburgerOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors">
              <FaCreditCard className="text-green-400" />
              <span className="font-bold text-sm">Pay with Fiat</span>
            </button>
            <button onClick={() => { setShowCryptoModal(true); setHamburgerOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors">
              <FaBitcoin className="text-orange-500" />
              <span className="font-bold text-sm">Pay with Crypto</span>
            </button>
            <button onClick={() => { setShowAdsModal(true); setHamburgerOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors">
              <FaAd className="text-yellow-400" />
              <span className="font-bold text-sm">Watch Ads</span>
            </button>
          </div>

          {/* Music Player */}
          <div>
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <FaMusic /> Music Player
              </h3>
              <button onClick={() => fileInputRef.current?.click()} className="text-[10px] bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded border border-zinc-700">
                <FaPlus /> Add
              </button>
              <input type="file" accept="audio/*" multiple ref={fileInputRef} className="hidden" onChange={(e) => e.target.files && Array.from(e.target.files).forEach(addTrack)} />
            </div>

            {/* Current Track (Spotify-ish Player) */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 shadow-lg mb-4">
              <div className="aspect-square w-full bg-zinc-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group">
                {currentTrackIndex >= 0 && playlist[currentTrackIndex] ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 to-black flex items-center justify-center">
                    <FaMusic className="text-4xl text-cyan-500/50" />
                  </div>
                ) : (
                  <FaMusic className="text-zinc-700 text-3xl" />
                )}
              </div>

              <div className="mb-4">
                <div className="text-sm font-bold text-white truncate">
                  {currentTrackIndex >= 0 ? playlist[currentTrackIndex]?.name : "No Track Selected"}
                </div>
                <div className="text-xs text-zinc-500">Artist Name</div>
              </div>

              {/* Progress (Fake) */}
              <div className="w-full h-1 bg-zinc-800 rounded-full mb-4">
                <div className="w-1/3 h-full bg-white rounded-full"></div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button onClick={toggleMute} className="text-zinc-400 hover:text-white"><FaVolumeUp /></button>
                <div className="flex items-center gap-4">
                  <button onClick={playPrev} className="text-zinc-300 hover:text-white"><FaStepBackward /></button>
                  <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform">
                    {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
                  </button>
                  <button onClick={playNext} className="text-zinc-300 hover:text-white"><FaStepForward /></button>
                </div>
                <button onClick={() => { }} className="text-zinc-400"><FaPlus className="rotate-45" /></button>
              </div>
            </div>

            {/* Playlist */}
            <div className="space-y-1 max-h-48 overflow-y-auto px-1 custom-scrollbar">
              {playlist.map((track, i) => (
                <div key={track.id} onClick={() => playTrack(i)} className={clsx("flex items-center gap-3 p-2 rounded-lg cursor-pointer group hover:bg-zinc-800/50", i === currentTrackIndex ? "bg-zinc-800" : "")}>
                  <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-zinc-600 text-xs">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={clsx("text-xs font-bold truncate", i === currentTrackIndex ? "text-green-500" : "text-white")}>{track.name}</div>
                    <div className="text-[10px] text-zinc-500">Local File</div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeTrack(track.id); }} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-500">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </header>
  );
}
