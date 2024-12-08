import React, { HTMLProps } from 'react';
export interface Props extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
    value: string | undefined;
    width?: number;
    onChange: (value: string) => void;
    escapeRegex?: boolean;
}
export declare const FilterInput: React.ForwardRefExoticComponent<Omit<Props, "ref"> & React.RefAttributes<HTMLInputElement>>;
