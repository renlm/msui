import React from 'react';
import { LineStyle } from '@grafana/schema';
interface Props {
    seriesName: string;
    color?: string;
    gradient?: string;
    readonly?: boolean;
    lineStyle?: LineStyle;
}
/**
 * @internal
 */
export declare const VizLegendSeriesIcon: React.MemoExoticComponent<({ seriesName, color, gradient, readonly, lineStyle }: Props) => React.JSX.Element>;
export {};
