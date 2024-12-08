import React, { HTMLProps } from 'react';
export interface Props extends Omit<HTMLProps<HTMLFieldSetElement>, 'label'> {
    children: React.ReactNode[] | React.ReactNode;
    /** Label for the fieldset's legend */
    label?: React.ReactNode;
}
export declare const FieldSet: ({ label, children, className, ...rest }: Props) => React.JSX.Element;
