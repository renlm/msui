import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
/**
 * Identical to timeseries... except it does not have timezone settings
 */
export interface Options {
    legend: common.VizLegendOptions;
    tooltip: common.VizTooltipOptions;
    /**
     * Name of the x field to use (defaults to first number)
     */
    xField?: string;
}
export interface FieldConfig extends common.GraphFieldConfig {
}
