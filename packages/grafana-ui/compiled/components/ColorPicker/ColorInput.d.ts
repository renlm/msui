import React from 'react';
import { Props as InputProps } from '../Input/Input';
import { ColorPickerProps } from './ColorPickerPopover';
interface ColorInputProps extends ColorPickerProps, Omit<InputProps, 'color' | 'onChange'> {
    isClearable?: boolean;
    buttonAriaLabel?: string;
}
declare const ColorInput: React.ForwardRefExoticComponent<Omit<ColorInputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export default ColorInput;
