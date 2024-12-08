import * as ui from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options extends ui.OptionsWithLegend, ui.OptionsWithTooltip, ui.OptionsWithTimezones {
    /**
     * Controls value alignment on the timelines
     */
    alignValue?: ui.TimelineValueAlignment;
    /**
     * Merge equal consecutive values
     */
    mergeValues?: boolean;
    /**
     * Controls the row height
     */
    rowHeight: number;
    /**
     * Show timeline values on chart
     */
    showValue: ui.VisibilityMode;
}
export declare const defaultOptions: Partial<Options>;
export interface FieldConfig extends ui.HideableFieldConfig {
    fillOpacity?: number;
    lineWidth?: number;
}
export declare const defaultFieldConfig: Partial<FieldConfig>;
