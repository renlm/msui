import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options extends common.SingleStatBaseOptions {
    colorMode: common.BigValueColorMode;
    graphMode: common.BigValueGraphMode;
    justifyMode: common.BigValueJustifyMode;
    percentChangeColorMode: common.PercentChangeColorMode;
    showPercentChange: boolean;
    textMode: common.BigValueTextMode;
    wideLayout: boolean;
}
export declare const defaultOptions: Partial<Options>;
