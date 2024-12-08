import React, { HTMLProps } from 'react';
export interface Props extends Omit<HTMLProps<HTMLTextAreaElement>, 'size'> {
    /** Show an invalid state around the input */
    invalid?: boolean;
}
export declare const TextArea: React.ForwardRefExoticComponent<Omit<Props, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
