import React from 'react';
import { LineStyle } from '@grafana/schema';
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
    gradient?: string;
    lineStyle?: LineStyle;
}
export declare const SeriesIcon: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>>;
