import uPlot, { Cursor, Band, Hooks, Select, AlignedData, Padding } from 'uplot';
import { DataFrame, Field, GrafanaTheme2, TimeRange, TimeZone } from '@grafana/data';
import { AxisPlacement, VizOrientation } from '@grafana/schema';
import { FacetedData, PlotConfig } from '../types';
import { StackingGroup } from '../utils';
import { AxisProps } from './UPlotAxisBuilder';
import { ScaleProps, UPlotScaleBuilder } from './UPlotScaleBuilder';
import { SeriesProps, UPlotSeriesBuilder } from './UPlotSeriesBuilder';
import { UPlotThresholdOptions } from './UPlotThresholds';
type PrepData = (frames: DataFrame[]) => AlignedData | FacetedData;
type PreDataStacked = (frames: DataFrame[], stackingGroups: StackingGroup[]) => AlignedData | FacetedData;
export declare class UPlotConfigBuilder {
    readonly uid: string;
    series: UPlotSeriesBuilder[];
    private axes;
    readonly scales: UPlotScaleBuilder[];
    private bands;
    private stackingGroups;
    private cursor;
    private select;
    private hasLeftAxis;
    private hooks;
    private tz;
    private mode;
    private frames;
    private thresholds;
    private padding?;
    private cachedConfig?;
    prepData: PrepData | undefined;
    constructor(timeZone?: TimeZone);
    scaleKeys: [string, string];
    addHook<T extends keyof Hooks.Defs>(type: T, hook: Hooks.Defs[T]): void;
    addThresholds(options: UPlotThresholdOptions): void;
    addAxis(props: AxisProps): void;
    getAxisPlacement(scaleKey: string): AxisPlacement;
    setCursor(cursor?: Cursor): void;
    setMode(mode: uPlot.Mode): void;
    setSelect(select: Select): void;
    addSeries(props: SeriesProps): void;
    getSeries(): UPlotSeriesBuilder[];
    /** Add or update the scale with the scale key */
    addScale(props: ScaleProps): void;
    addBand(band: Band): void;
    setStackingGroups(groups: StackingGroup[]): void;
    getStackingGroups(): StackingGroup[];
    setPrepData(prepData: PreDataStacked): void;
    setPadding(padding: Padding): void;
    getConfig(): PlotConfig;
    private tzDate;
    private ensureNonOverlappingAxes;
}
export type Renderers = Array<{
    fieldMap: Record<string, string>;
    indicesOnly: string[];
    init: (config: UPlotConfigBuilder, fieldIndices: Record<string, number>) => void;
}>;
/** @alpha */
type UPlotConfigPrepOpts<T extends Record<string, unknown> = {}> = {
    frame: DataFrame;
    theme: GrafanaTheme2;
    timeZones: TimeZone[];
    getTimeRange: () => TimeRange;
    allFrames: DataFrame[];
    renderers?: Renderers;
    tweakScale?: (opts: ScaleProps, forField: Field) => ScaleProps;
    tweakAxis?: (opts: AxisProps, forField: Field) => AxisProps;
    hoverProximity?: number;
    orientation?: VizOrientation;
} & T;
/** @alpha */
export type UPlotConfigPrepFn<T extends {} = {}> = (opts: UPlotConfigPrepOpts<T>) => UPlotConfigBuilder;
export {};
