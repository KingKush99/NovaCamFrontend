import { create } from 'zustand';

export interface MusicTrack {
    id: string;
    url: string;
    name: string;
    artist?: string;
    category?: 'instrumental' | 'lyrics' | 'user';
    isPreset?: boolean;
}

// Preset playlists - add your own mp3 files to public/music/instrumental or public/music/lyrics
export const PRESET_PLAYLISTS = {
    instrumental: [
        { id: 'inst-1', name: 'Chill Lofi Beat', artist: 'LoFi Producer', url: '/music/instrumental/chill-lofi.mp3', category: 'instrumental' as const, isPreset: true },
        { id: 'inst-2', name: 'Ambient Waves', artist: 'SoundScape', url: '/music/instrumental/ambient-waves.mp3', category: 'instrumental' as const, isPreset: true },
        { id: 'inst-3', name: 'Piano Dreams', artist: 'Classical Mix', url: '/music/instrumental/piano-dreams.mp3', category: 'instrumental' as const, isPreset: true },
        { id: 'inst-4', name: 'Jazz Cafe', artist: 'Smooth Jazz', url: '/music/instrumental/jazz-cafe.mp3', category: 'instrumental' as const, isPreset: true },
        { id: 'inst-5', name: 'Electronic Pulse', artist: 'Synth Master', url: '/music/instrumental/electronic-pulse.mp3', category: 'instrumental' as const, isPreset: true },
    ],
    lyrics: [
        { id: 'lyr-1', name: 'Summer Vibes', artist: 'Pop Artist', url: '/music/lyrics/summer-vibes.mp3', category: 'lyrics' as const, isPreset: true },
        { id: 'lyr-2', name: 'Night Drive', artist: 'Indie Band', url: '/music/lyrics/night-drive.mp3', category: 'lyrics' as const, isPreset: true },
        { id: 'lyr-3', name: 'Heartbeat', artist: 'R&B Queen', url: '/music/lyrics/heartbeat.mp3', category: 'lyrics' as const, isPreset: true },
        { id: 'lyr-4', name: 'Electric Love', artist: 'EDM Star', url: '/music/lyrics/electric-love.mp3', category: 'lyrics' as const, isPreset: true },
        { id: 'lyr-5', name: 'Midnight City', artist: 'Synthwave', url: '/music/lyrics/midnight-city.mp3', category: 'lyrics' as const, isPreset: true },
    ]
};

interface MusicState {
    playlist: MusicTrack[];
    currentTrackIndex: number;
    isPlaying: boolean;
    volume: number;
    isMuted: boolean;
    activePlaylist: 'all' | 'instrumental' | 'lyrics' | 'user';

    // Actions
    addTrack: (file: File) => void;
    addTrackFromUrl: (track: MusicTrack) => void;
    removeTrack: (id: string) => void;
    playTrack: (index: number) => void;
    playNext: () => void;
    playPrev: () => void;
    togglePlay: () => void;
    setVolume: (vol: number) => void;
    toggleMute: () => void;
    clearPlaylist: () => void;
    loadPresetPlaylist: (category: 'instrumental' | 'lyrics') => void;
    setActivePlaylist: (playlist: 'all' | 'instrumental' | 'lyrics' | 'user') => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
    playlist: [],
    currentTrackIndex: -1,
    isPlaying: false,
    volume: 0.5,
    isMuted: false,
    activePlaylist: 'all',

    addTrack: (file) => {
        const url = URL.createObjectURL(file);
        const newTrack: MusicTrack = {
            id: Math.random().toString(36).substring(7),
            url,
            name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
            artist: 'Your Upload',
            category: 'user',
            isPreset: false,
        };

        set((state) => {
            const isFirst = state.playlist.length === 0;
            return {
                playlist: [...state.playlist, newTrack],
                currentTrackIndex: isFirst ? 0 : state.currentTrackIndex,
                isPlaying: isFirst ? true : state.isPlaying,
            };
        });
    },

    addTrackFromUrl: (track) => {
        set((state) => {
            // Avoid duplicates
            if (state.playlist.some(t => t.id === track.id)) return {};
            const isFirst = state.playlist.length === 0;
            return {
                playlist: [...state.playlist, track],
                currentTrackIndex: isFirst ? 0 : state.currentTrackIndex,
            };
        });
    },

    removeTrack: (id) => set((state) => {
        const newPlaylist = state.playlist.filter(t => t.id !== id);
        let newIndex = state.currentTrackIndex;
        if (newIndex >= newPlaylist.length) newIndex = newPlaylist.length - 1;

        return {
            playlist: newPlaylist,
            currentTrackIndex: newIndex,
            isPlaying: newPlaylist.length > 0 ? state.isPlaying : false
        };
    }),

    playTrack: (index) => set({ currentTrackIndex: index, isPlaying: true }),

    playNext: () => set((state) => {
        if (state.playlist.length === 0) return {};
        const nextIndex = (state.currentTrackIndex + 1) % state.playlist.length;
        return { currentTrackIndex: nextIndex, isPlaying: true };
    }),

    playPrev: () => set((state) => {
        if (state.playlist.length === 0) return {};
        const prevIndex = (state.currentTrackIndex - 1 + state.playlist.length) % state.playlist.length;
        return { currentTrackIndex: prevIndex, isPlaying: true };
    }),

    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

    setVolume: (vol) => set({ volume: vol }),

    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

    clearPlaylist: () => set(() => ({ playlist: [], currentTrackIndex: -1, isPlaying: false })),

    loadPresetPlaylist: (category) => {
        const tracks = PRESET_PLAYLISTS[category];
        set((state) => {
            // Add preset tracks that aren't already in playlist
            const existing = new Set(state.playlist.map(t => t.id));
            const newTracks = tracks.filter(t => !existing.has(t.id));
            return {
                playlist: [...state.playlist, ...newTracks],
                activePlaylist: category,
            };
        });
    },

    setActivePlaylist: (playlist) => set({ activePlaylist: playlist }),
}));
