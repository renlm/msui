import React, { HTMLProps } from 'react';
export interface Props extends Omit<HTMLProps<HTMLInputElement>, 'value' | 'ref'> {
    value?: boolean;
    label: string;
}
export declare function QueryHeaderSwitch({ label, ...inputProps }: Props): React.JSX.Element;
