import { create } from 'zustand';

export interface MusicTrack {
    id: string;
    file: File;
    url: string; // Object URL
    name: string;
}

interface MusicState {
    playlist: MusicTrack[];
    currentTrackIndex: number;
    isPlaying: boolean;
    volume: number;
    isMuted: boolean;

    // Actions
    addTrack: (file: File) => void;
    removeTrack: (id: string) => void;
    playTrack: (index: number) => void;
    playNext: () => void;
    playPrev: () => void;
    togglePlay: () => void;
    setVolume: (vol: number) => void;
    toggleMute: () => void;
    clearPlaylist: () => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
    playlist: [],
    currentTrackIndex: -1,
    isPlaying: false,
    volume: 0.5,
    isMuted: false,

    addTrack: (file) => {
        const url = URL.createObjectURL(file);
        const newTrack: MusicTrack = {
            id: Math.random().toString(36).substring(7),
            file,
            url,
            name: file.name,
        };

        set((state) => {
            // If it's the first track, set it as current (but maybe don't auto-play unless desired)
            const isFirst = state.playlist.length === 0;
            return {
                playlist: [...state.playlist, newTrack],
                currentTrackIndex: isFirst ? 0 : state.currentTrackIndex,
                isPlaying: isFirst ? true : state.isPlaying, // Auto-play if first track added?
            };
        });
    },

    removeTrack: (id) => set((state) => {
        const newPlaylist = state.playlist.filter(t => t.id !== id);
        // Adjust index if needed
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
}));
