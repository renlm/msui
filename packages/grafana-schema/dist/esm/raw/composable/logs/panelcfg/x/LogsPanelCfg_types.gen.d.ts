import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options {
    dedupStrategy: common.LogsDedupStrategy;
    enableLogDetails: boolean;
    prettifyLogMessage: boolean;
    showCommonLabels: boolean;
    showLabels: boolean;
    showLogContextToggle: boolean;
    showTime: boolean;
    sortOrder: common.LogsSortOrder;
    wrapLogMessage: boolean;
}
