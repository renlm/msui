import React from 'react';
import { Field } from '@grafana/data';
import { TableCellHeight } from '@grafana/schema';
import { TableStyles } from './styles';
export interface Props {
    nestedData: Field;
    tableStyles: TableStyles;
    rowIndex: number;
    width: number;
    cellHeight: TableCellHeight;
}
export declare function ExpandedRow({ tableStyles, nestedData, rowIndex, width, cellHeight }: Props): React.JSX.Element;
export declare function getExpandedRowHeight(nestedData: Field, rowIndex: number, tableStyles: TableStyles): number;
