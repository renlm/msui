import React from 'react';
import { SelectableValue } from '@grafana/data';
export interface RadioButtonListProps<T> {
    /** A name of a radio group. Used to group multiple radio inputs into a single group */
    name: string;
    id?: string;
    /** An array of available options */
    options: Array<SelectableValue<T>>;
    value?: T;
    onChange?: (value: T) => void;
    /** Disables all elements in the list */
    disabled?: boolean;
    /** Disables subset of elements in the list. Compares values using the === operator */
    disabledOptions?: T[];
    className?: string;
}
export declare function RadioButtonList<T extends string | number | readonly string[]>({ name, id, options, value, onChange, className, disabled, disabledOptions, }: RadioButtonListProps<T>): React.JSX.Element;
