import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options extends common.OptionsWithLegend, common.OptionsWithTooltip, common.OptionsWithTextFormatting {
    /**
     * Controls the radius of each bar.
     */
    barRadius?: number;
    /**
     * Controls the width of bars. 1 = Max width, 0 = Min width.
     */
    barWidth: number;
    /**
     * Use the color value for a sibling field to color each bar value.
     */
    colorByField?: string;
    /**
     * Enables mode which highlights the entire bar area and shows tooltip when cursor
     * hovers over highlighted area
     */
    fullHighlight: boolean;
    /**
     * Controls the width of groups. 1 = max with, 0 = min width.
     */
    groupWidth: number;
    /**
     * Controls the orientation of the bar chart, either vertical or horizontal.
     */
    orientation: common.VizOrientation;
    /**
     * This controls whether values are shown on top or to the left of bars.
     */
    showValue: common.VisibilityMode;
    /**
     * Controls whether bars are stacked or not, either normally or in percent mode.
     */
    stacking: common.StackingMode;
    /**
     * Manually select which field from the dataset to represent the x field.
     */
    xField?: string;
    /**
     * Sets the max length that a label can have before it is truncated.
     */
    xTickLabelMaxLength: number;
    /**
     * Controls the rotation of the x axis labels.
     */
    xTickLabelRotation: number;
    /**
     * Controls the spacing between x axis labels.
     * negative values indicate backwards skipping behavior
     */
    xTickLabelSpacing?: number;
}
export declare const defaultOptions: Partial<Options>;
export interface FieldConfig extends common.AxisConfig, common.HideableFieldConfig {
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
    /**
     * Threshold rendering
     */
    thresholdsStyle?: common.GraphThresholdsStyleConfig;
}
export declare const defaultFieldConfig: Partial<FieldConfig>;
