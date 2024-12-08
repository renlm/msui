import React from 'react';
import uPlot from 'uplot';
import { DashboardCursorSync } from '@grafana/schema';
import { OnSelectRangeCallback } from '../../PanelChrome';
import { UPlotConfigBuilder } from '../config/UPlotConfigBuilder';
export declare const DEFAULT_TOOLTIP_WIDTH: undefined;
export declare const TOOLTIP_OFFSET = 10;
export declare const enum TooltipHoverMode {
    xOne = 0,
    xAll = 1,
    xyOne = 2
}
interface TooltipPlugin2Props {
    config: UPlotConfigBuilder;
    hoverMode: TooltipHoverMode;
    syncMode?: DashboardCursorSync;
    syncScope?: string;
    queryZoom?: (range: {
        from: number;
        to: number;
    }) => void;
    clientZoom?: boolean;
    onSelectRange?: OnSelectRangeCallback;
    render: (u: uPlot, dataIdxs: Array<number | null>, seriesIdx: number | null, isPinned: boolean, dismiss: () => void, timeRange: TimeRange2 | null, viaSync: boolean) => React.ReactNode;
    maxWidth?: number;
}
export interface TimeRange2 {
    from: number;
    to: number;
}
/**
 * @alpha
 */
export declare const TooltipPlugin2: ({ config, hoverMode, render, clientZoom, queryZoom, onSelectRange, maxWidth, syncMode, syncScope, }: TooltipPlugin2Props) => React.ReactPortal | null;
export {};
