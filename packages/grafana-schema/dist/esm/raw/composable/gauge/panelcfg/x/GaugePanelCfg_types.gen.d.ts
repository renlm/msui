import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options extends common.SingleStatBaseOptions {
    minVizHeight: number;
    minVizWidth: number;
    showThresholdLabels: boolean;
    showThresholdMarkers: boolean;
    sizing: common.BarGaugeSizing;
}
export declare const defaultOptions: Partial<Options>;
