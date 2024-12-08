import React from 'react';
import { Field } from '@grafana/data';
import { TableStyles } from './styles';
interface Props {
    column: any;
    tableStyles: TableStyles;
    field?: Field;
}
export declare const Filter: ({ column, field, tableStyles }: Props) => React.JSX.Element | null;
export {};
