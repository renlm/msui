import uPlot from 'uplot';
import { FieldColorMode, GrafanaTheme2, ThresholdsConfig } from '@grafana/data';
export declare function getOpacityGradientFn(color: string, opacity: number): (self: uPlot, seriesIdx: number) => CanvasGradient;
export declare function getHueGradientFn(color: string, opacity: number, theme: GrafanaTheme2): (self: uPlot, seriesIdx: number) => CanvasGradient;
export declare enum GradientDirection {
    Right = 0,
    Up = 1,
    Left = 2,
    Down = 3
}
type ValueStop = [value: number, color: string];
type ScaleValueStops = ValueStop[];
export declare function scaleGradient(u: uPlot, scaleKey: string, scaleStops: ScaleValueStops, discrete?: boolean): string | CanvasGradient;
export declare function getDataRange(plot: uPlot, scaleKey: string): number[];
export declare function getGradientRange(u: uPlot, scaleKey: string, hardMin?: number | null, hardMax?: number | null, softMin?: number | null, softMax?: number | null): number[];
export declare function getScaleGradientFn(opacity: number, theme: GrafanaTheme2, colorMode?: FieldColorMode, thresholds?: ThresholdsConfig, hardMin?: number | null, hardMax?: number | null, softMin?: number | null, softMax?: number | null): (self: uPlot, seriesIdx: number) => CanvasGradient | string;
export {};
