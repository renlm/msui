import React from 'react';
import { Cell } from 'react-table';
import { TimeRange, DataFrame } from '@grafana/data';
import { TableStyles } from './styles';
import { TableFilterActionCallback } from './types';
export interface Props {
    cell: Cell;
    tableStyles: TableStyles;
    onCellFilterAdded?: TableFilterActionCallback;
    columnIndex: number;
    columnCount: number;
    timeRange?: TimeRange;
    userProps?: object;
    frame: DataFrame;
    rowStyled?: boolean;
    textWrapped?: boolean;
    height?: number;
}
export declare const TableCell: ({ cell, tableStyles, onCellFilterAdded, timeRange, userProps, frame, rowStyled, textWrapped, height, }: Props) => React.JSX.Element | null;
