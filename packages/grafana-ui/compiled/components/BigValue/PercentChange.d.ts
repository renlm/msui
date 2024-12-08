import React from 'react';
import { PercentChangeStyles } from './BigValueLayout';
export interface Props {
    percentChange: number;
    styles: PercentChangeStyles;
}
export declare const PercentChange: ({ percentChange, styles }: Props) => React.JSX.Element;
export declare const percentChangeString: (percentChange: number) => string;
