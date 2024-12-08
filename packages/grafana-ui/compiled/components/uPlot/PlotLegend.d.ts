import React from 'react';
import { DataFrame } from '@grafana/data';
import { VizLegendOptions } from '@grafana/schema';
import { VizLayoutLegendProps } from '../VizLayout/VizLayout';
import { UPlotConfigBuilder } from './config/UPlotConfigBuilder';
interface PlotLegendProps extends VizLegendOptions, Omit<VizLayoutLegendProps, 'children'> {
    data: DataFrame[];
    config: UPlotConfigBuilder;
}
/**
 * mostly duplicates logic in PlotLegend below :(
 *
 * @internal
 */
export declare function hasVisibleLegendSeries(config: UPlotConfigBuilder, data: DataFrame[]): boolean;
export declare const PlotLegend: React.MemoExoticComponent<({ data, config, placement, calcs, displayMode, ...vizLayoutLegendProps }: PlotLegendProps) => React.JSX.Element>;
export {};
