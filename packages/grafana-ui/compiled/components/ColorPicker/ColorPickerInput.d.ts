import React from 'react';
import { Props as InputProps } from '../Input/Input';
export interface ColorPickerInputProps extends Omit<InputProps, 'value' | 'onChange'> {
    value?: string;
    onChange: (color: string) => void;
    /** Format for returning the color in onChange callback, defaults to 'rgb' */
    returnColorAs?: 'rgb' | 'hex';
}
export declare const ColorPickerInput: React.ForwardRefExoticComponent<Omit<ColorPickerInputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
