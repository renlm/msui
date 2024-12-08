import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
/**
 * Select the pie chart display style.
 */
export declare enum PieChartType {
    Donut = "donut",
    Pie = "pie"
}
/**
 * Select labels to display on the pie chart.
 *  - Name - The series or field name.
 *  - Percent - The percentage of the whole.
 *  - Value - The raw numerical value.
 */
export declare enum PieChartLabels {
    Name = "name",
    Percent = "percent",
    Value = "value"
}
/**
 * Select values to display in the legend.
 *  - Percent: The percentage of the whole.
 *  - Value: The raw numerical value.
 */
export declare enum PieChartLegendValues {
    Percent = "percent",
    Value = "value"
}
export interface PieChartLegendOptions extends common.VizLegendOptions {
    values: Array<PieChartLegendValues>;
}
export declare const defaultPieChartLegendOptions: Partial<PieChartLegendOptions>;
export interface Options extends common.OptionsWithTooltip, common.SingleStatBaseOptions {
    displayLabels: Array<PieChartLabels>;
    legend: PieChartLegendOptions;
    pieType: PieChartType;
}
export declare const defaultOptions: Partial<Options>;
export interface FieldConfig extends common.HideableFieldConfig {
}
