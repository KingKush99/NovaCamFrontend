export interface TipEvent {
    userId: string;
    username: string;
    amount: number;
    note?: string;
    timestamp: Date;
}

export interface AppConfig {
    [key: string]: any;
}

export interface AppState {
    [key: string]: any;
}

export interface AppInstance {
    appId: string;
    roomId: string;
    config: AppConfig;
    state: AppState;
    onTip: (event: TipEvent) => void;
    onMount?: () => void;
    onUnmount?: () => void;
}

export type AppRenderer = (state: AppState, config: AppConfig) => JSX.Element | null;

export interface AppDefinition {
    id: string;
    name: string;
    icon: string;
    description: string;
    category: string;
    defaultConfig: AppConfig;
    defaultState: AppState;
    onTip: (event: TipEvent, state: AppState, config: AppConfig) => AppState;
    render: AppRenderer;
}
