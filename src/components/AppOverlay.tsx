'use client';

import { AppDefinition, AppState, AppConfig } from '@/types/appEngine';

interface AppOverlayProps {
    apps: AppDefinition[];
    appStates: Map<string, AppState>;
    appConfigs: Map<string, AppConfig>;
}

const AppOverlay = ({ apps, appStates, appConfigs }: AppOverlayProps) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            {apps.map((app) => {
                const state = appStates.get(app.id);
                const config = appConfigs.get(app.id);

                if (!state || !config) return null;

                const RenderedApp = app.render(state, config);

                return (
                    <div key={app.id} className="pointer-events-auto">
                        {RenderedApp}
                    </div>
                );
            })}
        </div>
    );
};

export default AppOverlay;
