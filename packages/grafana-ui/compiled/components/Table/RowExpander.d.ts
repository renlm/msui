import React from 'react';
import { TableStyles } from './styles';
import { GrafanaTableRow } from './types';
export interface Props {
    row: GrafanaTableRow;
    tableStyles: TableStyles;
}
export declare function RowExpander({ row, tableStyles }: Props): React.JSX.Element;
