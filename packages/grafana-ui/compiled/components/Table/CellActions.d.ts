import React from 'react';
import { TableCellProps } from './types';
interface CellActionProps extends TableCellProps {
    previewMode: 'text' | 'code';
}
export declare function CellActions({ field, cell, previewMode, showFilters, onCellFilterAdded }: CellActionProps): React.JSX.Element;
export {};
