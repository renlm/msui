import React from 'react';
import { Field, SelectableValue } from '@grafana/data';
import { TableStyles } from './styles';
interface Props {
    column: any;
    tableStyles: TableStyles;
    onClose: () => void;
    field?: Field;
    searchFilter: string;
    setSearchFilter: (value: string) => void;
    operator: SelectableValue<string>;
    setOperator: (item: SelectableValue<string>) => void;
}
export declare const FilterPopup: ({ column: { preFilteredRows, filterValue, setFilter }, onClose, field, searchFilter, setSearchFilter, operator, setOperator, }: Props) => React.JSX.Element;
export {};
