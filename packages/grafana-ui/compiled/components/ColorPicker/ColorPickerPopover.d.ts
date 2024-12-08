import React from 'react';
import { Themeable2 } from '../../types/theme';
import { PopoverContentProps } from '../Tooltip';
export type ColorPickerChangeHandler = (color: string) => void;
export interface ColorPickerProps extends Themeable2 {
    color: string;
    onChange: ColorPickerChangeHandler;
    enableNamedColors?: boolean;
}
export interface Props<T> extends ColorPickerProps, PopoverContentProps {
    customPickers?: T;
}
export interface CustomPickersDescriptor {
    [key: string]: {
        tabComponent: React.ComponentType<ColorPickerProps>;
        name: string;
    };
}
export declare const ColorPickerPopover: React.FunctionComponent<{
    color: string;
    onChange: ColorPickerChangeHandler;
    enableNamedColors?: boolean | undefined;
    customPickers?: CustomPickersDescriptor | undefined;
    updatePopperPosition?: (() => void) | undefined;
}>;
