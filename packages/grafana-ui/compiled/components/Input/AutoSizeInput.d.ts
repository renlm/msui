import React from 'react';
import { Props as InputProps } from './Input';
export interface Props extends InputProps {
    /** Sets the min-width to a multiple of 8px. Default value is 10*/
    minWidth?: number;
    /** Sets the max-width to a multiple of 8px.*/
    maxWidth?: number;
    /** onChange function that will be run on onBlur and onKeyPress with enter*/
    onCommitChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}
export declare const AutoSizeInput: React.ForwardRefExoticComponent<Omit<Props, "ref"> & React.RefAttributes<HTMLInputElement>>;
