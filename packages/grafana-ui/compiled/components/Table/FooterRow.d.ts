import React from 'react';
import { HeaderGroup } from 'react-table';
import { TableStyles } from './styles';
import { FooterItem } from './types';
export interface FooterRowProps {
    totalColumnsWidth: number;
    footerGroups: HeaderGroup[];
    footerValues: FooterItem[];
    isPaginationVisible: boolean;
    tableStyles: TableStyles;
}
export declare function FooterRow(props: FooterRowProps): React.JSX.Element;
export declare function getFooterValue(index: number, footerValues?: FooterItem[], isCountRowsSet?: boolean): React.JSX.Element | (() => React.JSX.Element);
