import { Scale } from 'uplot';
import { DecimalCount } from '@grafana/data';
import { ScaleOrientation, ScaleDirection, ScaleDistribution } from '@grafana/schema';
import { PlotConfigBuilder } from '../types';
export interface ScaleProps {
    scaleKey: string;
    isTime?: boolean;
    min?: number | null;
    max?: number | null;
    softMin?: number | null;
    softMax?: number | null;
    range?: Scale.Range;
    distribution?: ScaleDistribution;
    orientation: ScaleOrientation;
    direction: ScaleDirection;
    log?: number;
    linearThreshold?: number;
    centeredZero?: boolean;
    decimals?: DecimalCount;
}
export declare class UPlotScaleBuilder extends PlotConfigBuilder<ScaleProps, Scale> {
    merge(props: ScaleProps): void;
    getConfig(): Scale;
}
export declare function optMinMax(minmax: 'min' | 'max', a?: number | null, b?: number | null): undefined | number | null;
