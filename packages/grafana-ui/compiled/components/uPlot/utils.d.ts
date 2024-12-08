import uPlot, { AlignedData, Options } from 'uplot';
import { DataFrame, DisplayValue, Field, GrafanaTheme2 } from '@grafana/data';
export declare const DEFAULT_PLOT_CONFIG: Partial<Options>;
/** @internal */
interface StackMeta {
    totals: AlignedData;
}
/** @internal */
export interface StackingGroup {
    series: number[];
    dir: StackDirection;
}
/** @internal */
declare const enum StackDirection {
    Pos = 1,
    Neg = -1
}
/** @internal */
export declare function getStackingBands(group: StackingGroup): uPlot.Band[];
/** @internal */
export declare function getStackingGroups(frame: DataFrame): StackingGroup[];
/** @internal */
export declare function preparePlotData2(frame: DataFrame, stackingGroups: StackingGroup[], onStackMeta?: (meta: StackMeta) => void): AlignedData;
/**
 * Finds y axis midpoint for point at given idx (css pixels relative to uPlot canvas)
 * @internal
 **/
export declare function findMidPointYPosition(u: uPlot, idx: number): number | undefined;
export declare const getDisplayValuesForCalcs: (calcs: string[], field: Field, theme: GrafanaTheme2) => DisplayValue[];
/** @internal */
export declare const pluginLogger: import("../../utils/logger").Logger;
export declare const pluginLog: (...t: any[]) => void;
export {};
