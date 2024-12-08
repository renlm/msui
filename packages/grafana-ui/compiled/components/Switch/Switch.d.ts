import React, { HTMLProps } from 'react';
export interface Props extends Omit<HTMLProps<HTMLInputElement>, 'value'> {
    value?: boolean;
    /** Show an invalid state around the input */
    invalid?: boolean;
}
export declare const Switch: React.ForwardRefExoticComponent<Omit<Props, "ref"> & React.RefAttributes<HTMLInputElement>>;
export interface InlineSwitchProps extends Props {
    /** Label to show next to the switch */
    showLabel?: boolean;
    /** Make inline switch's background and border transparent */
    transparent?: boolean;
}
export declare const InlineSwitch: React.ForwardRefExoticComponent<Omit<InlineSwitchProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
