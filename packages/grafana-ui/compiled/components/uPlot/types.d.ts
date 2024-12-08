import React from 'react';
import uPlot, { Options, AlignedData } from 'uplot';
import { UPlotConfigBuilder } from './config/UPlotConfigBuilder';
/**
 * @internal -- not a public API
 */
export declare const FIXED_UNIT = "__fixed";
export type PlotConfig = Pick<Options, 'mode' | 'series' | 'scales' | 'axes' | 'cursor' | 'bands' | 'hooks' | 'select' | 'tzDate' | 'padding'>;
export type FacetValues = any[];
export type FacetSeries = FacetValues[];
export type FacetedData = [_: null, ...series: FacetSeries];
export interface PlotProps {
    data: AlignedData | FacetedData;
    width: number;
    height: number;
    config: UPlotConfigBuilder;
    children?: React.ReactNode;
    plotRef?: (u: uPlot) => void;
}
export declare abstract class PlotConfigBuilder<P, T> {
    props: P;
    constructor(props: P);
    abstract getConfig(): T;
}
/**
 * @alpha
 */
export type PlotTooltipInterpolator = (updateActiveSeriesIdx: (sIdx: number | null) => void, updateActiveDatapointIdx: (dIdx: number | null) => void, updateTooltipPosition: (clear?: boolean) => void, u: uPlot) => void;
export interface PlotSelection {
    min: number;
    max: number;
    bbox: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
}
