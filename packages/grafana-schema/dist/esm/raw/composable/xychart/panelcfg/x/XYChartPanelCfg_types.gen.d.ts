import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
/**
 * Auto is "table" in the UI
 */
export declare enum SeriesMapping {
    Auto = "auto",
    Manual = "manual"
}
export declare enum ScatterShow {
    Lines = "lines",
    Points = "points",
    PointsAndLines = "points+lines"
}
/**
 * Configuration for the Table/Auto mode
 */
export interface XYDimensionConfig {
    exclude?: Array<string>;
    frame: number;
    x?: string;
}
export declare const defaultXYDimensionConfig: Partial<XYDimensionConfig>;
export interface FieldConfig extends common.HideableFieldConfig, common.AxisConfig {
    label?: common.VisibilityMode;
    labelValue?: common.TextDimensionConfig;
    lineColor?: common.ColorDimensionConfig;
    lineStyle?: common.LineStyle;
    lineWidth?: number;
    pointColor?: common.ColorDimensionConfig;
    pointSize?: common.ScaleDimensionConfig;
    show?: ScatterShow;
}
export declare const defaultFieldConfig: Partial<FieldConfig>;
export interface ScatterSeriesConfig extends FieldConfig {
    frame?: number;
    name?: string;
    x?: string;
    y?: string;
}
export interface Options extends common.OptionsWithLegend, common.OptionsWithTooltip {
    /**
     * Table Mode (auto)
     */
    dims: XYDimensionConfig;
    /**
     * Manual Mode
     */
    series: Array<ScatterSeriesConfig>;
    seriesMapping?: SeriesMapping;
}
export declare const defaultOptions: Partial<Options>;
