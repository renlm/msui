import React from 'react';
import { HeaderGroup } from 'react-table';
import { TableStyles } from './styles';
export interface HeaderRowProps {
    headerGroups: HeaderGroup[];
    showTypeIcons?: boolean;
    tableStyles: TableStyles;
}
export declare const HeaderRow: (props: HeaderRowProps) => React.JSX.Element;
