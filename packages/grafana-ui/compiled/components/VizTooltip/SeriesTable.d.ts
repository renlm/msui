import React from 'react';
import { GraphSeriesValue } from '@grafana/data';
/**
 * @public
 */
export interface SeriesTableRowProps {
    color?: string;
    label?: React.ReactNode;
    value?: string | GraphSeriesValue;
    isActive?: boolean;
}
/**
 * @public
 */
export declare const SeriesTableRow: ({ color, label, value, isActive }: SeriesTableRowProps) => React.JSX.Element;
/**
 * @public
 */
export interface SeriesTableProps {
    timestamp?: string | GraphSeriesValue;
    series: SeriesTableRowProps[];
}
/**
 * @public
 */
export declare const SeriesTable: ({ timestamp, series }: SeriesTableProps) => React.JSX.Element;
