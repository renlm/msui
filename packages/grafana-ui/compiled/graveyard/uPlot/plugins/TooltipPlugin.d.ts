import React from 'react';
import uPlot from 'uplot';
import { DashboardCursorSync, DataFrame, TimeZone } from '@grafana/data';
import { TooltipDisplayMode, SortOrder } from '@grafana/schema';
import { UPlotConfigBuilder } from '../../../components';
interface TooltipPluginProps {
    timeZone: TimeZone;
    data: DataFrame;
    frames?: DataFrame[];
    config: UPlotConfigBuilder;
    mode?: TooltipDisplayMode;
    sortOrder?: SortOrder;
    sync?: () => DashboardCursorSync;
    renderTooltip?: (alignedFrame: DataFrame, seriesIdx: number | null, datapointIdx: number | null) => React.ReactNode;
}
/**
 * @alpha
 */
export declare const TooltipPlugin: ({ mode, sortOrder, sync, timeZone, config, renderTooltip, ...otherProps }: TooltipPluginProps) => React.JSX.Element | null;
/**
 * Given uPlot cursor position, figure out position of the tooltip withing the canvas bbox
 * Tooltip is positioned relatively to a viewport
 * @internal
 **/
export declare function positionTooltip(u: uPlot, bbox: DOMRect): {
    x: number | undefined;
    y: number | undefined;
};
export {};
