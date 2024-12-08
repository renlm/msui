import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options extends common.SingleStatBaseOptions {
    displayMode: common.BarGaugeDisplayMode;
    maxVizHeight: number;
    minVizHeight: number;
    minVizWidth: number;
    namePlacement: common.BarGaugeNamePlacement;
    showUnfilled: boolean;
    sizing: common.BarGaugeSizing;
    valueMode: common.BarGaugeValueMode;
}
export declare const defaultOptions: Partial<Options>;
