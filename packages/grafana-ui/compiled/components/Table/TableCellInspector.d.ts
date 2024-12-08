import React from 'react';
interface TableCellInspectorProps {
    value: any;
    onDismiss: () => void;
    mode: 'code' | 'text';
}
export declare function TableCellInspector({ value, onDismiss, mode }: TableCellInspectorProps): React.JSX.Element;
export {};
