export interface YuqueGroupConfig {
    urlPrefix: string;
    authToken: string;
}

export interface YuquePublishSettings {
    groups: YuqueGroupConfig[];
}

export const DEFAULT_SETTINGS: YuquePublishSettings = {
    groups: []
}; 