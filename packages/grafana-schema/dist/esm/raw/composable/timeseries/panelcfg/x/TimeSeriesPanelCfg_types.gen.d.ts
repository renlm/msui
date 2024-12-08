import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options extends common.OptionsWithTimezones {
    legend: common.VizLegendOptions;
    orientation?: common.VizOrientation;
    tooltip: common.VizTooltipOptions;
}
export interface FieldConfig extends common.GraphFieldConfig {
}
