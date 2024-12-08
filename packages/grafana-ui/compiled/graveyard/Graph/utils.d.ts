import { GraphSeriesValue, Field, TimeZone } from '@grafana/data';
/**
 * Returns index of the closest datapoint BEFORE hover position
 *
 * @param posX
 * @param series
 * @deprecated
 */
export declare const findHoverIndexFromData: (xAxisDimension: Field, xPos: number) => number;
interface MultiSeriesHoverInfo {
    value: string;
    time: string;
    datapointIndex: number;
    seriesIndex: number;
    label?: string;
    color?: string;
}
/**
 * Returns information about closest datapoints when hovering over a Graph
 *
 * @param seriesList list of series visible on the Graph
 * @param pos mouse cursor position, based on jQuery.flot position
 * @deprecated
 */
export declare const getMultiSeriesGraphHoverInfo: (yAxisDimensions: Field[], xAxisDimensions: Field[], xAxisPosition: number, timeZone?: TimeZone) => {
    results: MultiSeriesHoverInfo[];
    time?: GraphSeriesValue;
};
/** @deprecated */
export declare const graphTickFormatter: (epoch: number, axis: any) => string;
/** @deprecated */
export declare const graphTimeFormat: (ticks: number | null, min: number | null, max: number | null) => string;
export {};
