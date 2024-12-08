import React from 'react';
interface InputControlProps {
    /** Show an icon as a prefix in the input */
    prefix?: JSX.Element | string | null;
    focused: boolean;
    invalid: boolean;
    disabled: boolean;
    innerProps: JSX.IntrinsicElements['div'];
}
export declare const InputControl: React.ForwardRefExoticComponent<InputControlProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export {};
