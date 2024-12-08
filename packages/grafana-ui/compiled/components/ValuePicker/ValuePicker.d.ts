import React from 'react';
import { SelectableValue } from '@grafana/data';
import { IconName } from '../../types';
import { ComponentSize } from '../../types/size';
import { ButtonFill, ButtonVariant } from '../Button';
export interface ValuePickerProps<T> {
    /** Aria label applied to the input field */
    ['aria-label']?: string;
    /** Label to display on the picker button */
    label: string;
    /** Icon to display on the picker button */
    icon?: IconName;
    /** ValuePicker options  */
    options: Array<SelectableValue<T>>;
    /** Callback to handle selected option */
    onChange: (value: SelectableValue<T>) => void;
    /** Which ButtonVariant to render */
    variant?: ButtonVariant;
    /** Size of button  */
    size?: ComponentSize;
    /** Min width for select in grid units */
    minWidth?: number;
    /** Should the picker cover the full width of its parent */
    isFullWidth?: boolean;
    /** Control where the menu is rendered */
    menuPlacement?: 'auto' | 'bottom' | 'top';
    /** Which ButtonFill to use */
    fill?: ButtonFill;
    /** custom css applied to the button */
    buttonCss?: string;
}
export declare function ValuePicker<T>({ 'aria-label': ariaLabel, label, icon, options, onChange, variant, minWidth, size, isFullWidth, menuPlacement, fill, buttonCss, }: ValuePickerProps<T>): React.JSX.Element;
