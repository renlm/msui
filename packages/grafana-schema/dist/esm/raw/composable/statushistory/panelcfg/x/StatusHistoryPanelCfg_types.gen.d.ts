import * as ui from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options extends ui.OptionsWithLegend, ui.OptionsWithTooltip, ui.OptionsWithTimezones {
    /**
     * Controls the column width
     */
    colWidth?: number;
    /**
     * Set the height of the rows
     */
    rowHeight: number;
    /**
     * Show values on the columns
     */
    showValue: ui.VisibilityMode;
}
export declare const defaultOptions: Partial<Options>;
export interface FieldConfig extends ui.HideableFieldConfig {
    fillOpacity?: number;
    lineWidth?: number;
}
export declare const defaultFieldConfig: Partial<FieldConfig>;
