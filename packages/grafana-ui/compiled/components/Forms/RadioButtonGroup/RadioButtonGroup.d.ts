import React from 'react';
import { SelectableValue } from '@grafana/data';
import { RadioButtonSize } from './RadioButton';
export interface RadioButtonGroupProps<T> {
    value?: T;
    id?: string;
    disabled?: boolean;
    disabledOptions?: T[];
    options: Array<SelectableValue<T>>;
    onChange?: (value: T) => void;
    onClick?: (value: T) => void;
    size?: RadioButtonSize;
    fullWidth?: boolean;
    className?: string;
    autoFocus?: boolean;
    ['aria-label']?: string;
    invalid?: boolean;
}
export declare function RadioButtonGroup<T>({ options, value, onChange, onClick, disabled, disabledOptions, size, id, className, fullWidth, autoFocus, 'aria-label': ariaLabel, invalid, }: RadioButtonGroupProps<T>): React.JSX.Element;
export declare namespace RadioButtonGroup {
    var displayName: string;
}
