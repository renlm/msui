import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options extends common.OptionsWithLegend, common.OptionsWithTooltip {
    /**
     * Bucket count (approx)
     */
    bucketCount?: number;
    /**
     * Offset buckets by this amount
     */
    bucketOffset?: number;
    /**
     * Size of each bucket
     */
    bucketSize?: number;
    /**
     * Combines multiple series into a single histogram
     */
    combine?: boolean;
}
export declare const defaultOptions: Partial<Options>;
export interface FieldConfig extends common.AxisConfig, common.HideableFieldConfig, common.StackableFieldConfig {
    /**
     * Controls the fill opacity of the bars.
     */
    fillOpacity?: number;
    /**
     * Set the mode of the gradient fill. Fill gradient is based on the line color. To change the color, use the standard color scheme field option.
     * Gradient appearance is influenced by the Fill opacity setting.
     */
    gradientMode?: common.GraphGradientMode;
    /**
     * Controls line width of the bars.
     */
    lineWidth?: number;
}
export declare const defaultFieldConfig: Partial<FieldConfig>;
