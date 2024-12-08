export declare const pluginVersion = "11.1.11";
export interface Options {
    limit: number;
    navigateAfter: string;
    navigateBefore: string;
    navigateToPanel: boolean;
    onlyFromThisDashboard: boolean;
    onlyInTimeRange: boolean;
    showTags: boolean;
    showTime: boolean;
    showUser: boolean;
    tags: Array<string>;
}
export declare const defaultOptions: Partial<Options>;
