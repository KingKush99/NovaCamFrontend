import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
    installedApps: string[]; // array of app IDs
    appSettings: Record<string, Record<string, any>>; // appId -> settings
    installApp: (appId: string) => void;
    uninstallApp: (appId: string) => void;
    isInstalled: (appId: string) => boolean;
    updateAppSettings: (appId: string, settings: Record<string, any>) => void;
    getAppSettings: (appId: string) => Record<string, any> | undefined;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            installedApps: [],
            appSettings: {},

            installApp: (appId: string) => set((state) => ({
                installedApps: state.installedApps.includes(appId)
                    ? state.installedApps
                    : [...state.installedApps, appId]
            })),

            uninstallApp: (appId: string) => set((state) => ({
                installedApps: state.installedApps.filter(id => id !== appId),
                appSettings: Object.fromEntries(
                    Object.entries(state.appSettings).filter(([key]) => key !== appId)
                )
            })),

            isInstalled: (appId: string) => get().installedApps.includes(appId),

            updateAppSettings: (appId: string, settings: Record<string, any>) => set((state) => ({
                appSettings: {
                    ...state.appSettings,
                    [appId]: { ...state.appSettings[appId], ...settings }
                }
            })),

            getAppSettings: (appId: string) => get().appSettings[appId],
        }),
        {
            name: 'novacam-apps'
        }
    )
);
