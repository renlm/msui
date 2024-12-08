import uPlot, { Axis } from 'uplot';
import { DecimalCount, GrafanaTheme2, TimeZone } from '@grafana/data';
import { AxisPlacement, ScaleDistribution } from '@grafana/schema';
import { PlotConfigBuilder } from '../types';
export interface AxisProps {
    scaleKey: string;
    theme: GrafanaTheme2;
    label?: string;
    show?: boolean;
    size?: number | null;
    gap?: number;
    tickLabelRotation?: number;
    placement?: AxisPlacement;
    grid?: Axis.Grid;
    ticks?: Axis.Ticks;
    filter?: Axis.Filter;
    space?: Axis.Space;
    formatValue?: (v: any, decimals?: DecimalCount) => string;
    incrs?: Axis.Incrs;
    splits?: Axis.Splits;
    values?: Axis.Values;
    isTime?: boolean;
    timeZone?: TimeZone;
    color?: uPlot.Axis.Stroke;
    border?: uPlot.Axis.Border;
    decimals?: DecimalCount;
    distr?: ScaleDistribution;
}
export declare const UPLOT_AXIS_FONT_SIZE = 12;
export declare class UPlotAxisBuilder extends PlotConfigBuilder<AxisProps, Axis> {
    merge(props: AxisProps): void;
    calculateSpace(self: uPlot, axisIdx: number, scaleMin: number, scaleMax: number, plotDim: number): number;
    /** height of x axis or width of y axis in CSS pixels alloted for values, gap & ticks, but excluding axis label */
    calculateAxisSize(self: uPlot, values: string[], axisIdx: number): number;
    getConfig(): Axis;
}
/** @internal */
export declare const timeUnitSize: {
    second: number;
    minute: number;
    hour: number;
    day: number;
    month: number;
    year: number;
};
/** Format time axis ticks */
export declare function formatTime(self: uPlot, splits: number[], axisIdx: number, foundSpace: number, foundIncr: number): string[];
export declare function getUPlotSideFromAxis(axis: AxisPlacement): 1 | 0 | 2 | 3;
