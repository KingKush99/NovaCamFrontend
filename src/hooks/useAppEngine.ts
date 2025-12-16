'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { TipEvent, AppDefinition, AppState, AppConfig } from '@/types/appEngine';

interface UseAppEngineProps {
    roomId: string;
    apps: AppDefinition[];
}

export const useAppEngine = ({ roomId, apps }: UseAppEngineProps) => {
    // Memoize app IDs to prevent re-initialization
    const appIds = useMemo(() => apps.map(app => app.id).join(','), [apps]);

    const [appStates, setAppStates] = useState<Map<string, AppState>>(() => {
        const initialStates = new Map<string, AppState>();
        apps.forEach((app) => {
            initialStates.set(app.id, { ...app.defaultState });
        });
        return initialStates;
    });

    const [appConfigs, setAppConfigs] = useState<Map<string, AppConfig>>(() => {
        const initialConfigs = new Map<string, AppConfig>();
        apps.forEach((app) => {
            initialConfigs.set(app.id, { ...app.defaultConfig });
        });
        return initialConfigs;
    });

    // Handle tip event
    const handleTip = useCallback(
        (tipEvent: TipEvent) => {
            setAppStates((prevStates) => {
                const newStates = new Map(prevStates);

                apps.forEach((app) => {
                    const currentState = prevStates.get(app.id) || app.defaultState;
                    const currentConfig = appConfigs.get(app.id) || app.defaultConfig;

                    const newState = app.onTip(tipEvent, currentState, currentConfig);
                    newStates.set(app.id, newState);
                });

                return newStates;
            });
        },
        [apps, appConfigs]
    );

    // Simulate tip (for testing)
    const simulateTip = useCallback(
        (amount: number, note?: string) => {
            const tipEvent: TipEvent = {
                userId: 'test-user',
                username: 'TestUser',
                amount,
                note,
                timestamp: new Date(),
            };
            handleTip(tipEvent);
        },
        [handleTip]
    );

    // Get state for specific app
    const getAppState = useCallback(
        (appId: string): AppState | undefined => {
            return appStates.get(appId);
        },
        [appStates]
    );

    // Get config for specific app
    const getAppConfig = useCallback(
        (appId: string): AppConfig | undefined => {
            return appConfigs.get(appId);
        },
        [appConfigs]
    );

    return {
        appStates,
        appConfigs,
        handleTip,
        simulateTip,
        getAppState,
        getAppConfig,
    };
};
