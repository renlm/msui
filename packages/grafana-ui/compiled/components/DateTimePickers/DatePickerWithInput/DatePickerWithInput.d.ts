import React from 'react';
import { Props as InputProps } from '../../Input/Input';
export declare const formatDate: (date: Date | string) => string;
/** @public */
export interface DatePickerWithInputProps extends Omit<InputProps, 'ref' | 'value' | 'onChange'> {
    /** Value selected by the DatePicker */
    value?: Date | string;
    /** The minimum date the value can be set to */
    minDate?: Date;
    /** The maximum date the value can be set to */
    maxDate?: Date;
    /** Handles changes when a new date is selected */
    onChange: (value: Date | string) => void;
    /** Hide the calendar when date is selected */
    closeOnSelect?: boolean;
    /** Text that appears when the input has no text */
    placeholder?: string;
}
/** @public */
export declare const DatePickerWithInput: ({ value, minDate, maxDate, onChange, closeOnSelect, placeholder, ...rest }: DatePickerWithInputProps) => React.JSX.Element;
