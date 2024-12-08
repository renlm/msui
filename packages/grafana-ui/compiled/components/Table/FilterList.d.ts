import React from 'react';
import { SelectableValue } from '@grafana/data';
interface Props {
    values: SelectableValue[];
    options: SelectableValue[];
    onChange: (options: SelectableValue[]) => void;
    caseSensitive?: boolean;
    showOperators?: boolean;
    searchFilter: string;
    setSearchFilter: (value: string) => void;
    operator: SelectableValue<string>;
    setOperator: (item: SelectableValue<string>) => void;
}
export declare const REGEX_OPERATOR: SelectableValue<string>;
export declare const FilterList: ({ options, values, caseSensitive, showOperators, onChange, searchFilter, setSearchFilter, operator, setOperator, }: Props) => React.JSX.Element;
export {};
