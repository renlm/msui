import React from 'react';
import { CellProps, HeaderProps } from 'react-table';
export declare function ExpanderCell<K extends object>({ row, __rowID }: CellProps<K, void>): React.JSX.Element;
export declare function ExpanderHeader<K extends object>({ isAllRowsExpanded, toggleAllRowsExpanded }: HeaderProps<K>): React.JSX.Element;
