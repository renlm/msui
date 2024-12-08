import React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { LineStyle } from '@grafana/schema';
import { ColorIndicator } from './types';
export declare enum ColorIndicatorPosition {
    Leading = 0,
    Trailing = 1
}
interface Props {
    color?: string;
    colorIndicator?: ColorIndicator;
    position?: ColorIndicatorPosition;
    lineStyle?: LineStyle;
}
export type ColorIndicatorStyles = ReturnType<typeof getStyles>;
export declare const VizTooltipColorIndicator: ({ color, colorIndicator, position, lineStyle, }: Props) => React.JSX.Element;
declare const getStyles: (theme: GrafanaTheme2) => {
    leading: string;
    trailing: string;
    value: string;
    hexagon: string;
    pie_1_4: string;
    pie_2_4: string;
    pie_3_4: string;
    marker_sm: string;
    marker_md: string;
    marker_lg: string;
};
export {};
