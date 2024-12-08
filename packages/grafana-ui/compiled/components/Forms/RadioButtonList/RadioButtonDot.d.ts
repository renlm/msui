import React from 'react';
export interface RadioButtonDotProps<T> {
    id: string;
    name: string;
    checked?: boolean;
    value?: T;
    disabled?: boolean;
    label: React.ReactNode;
    description?: string;
    onChange?: (id: string) => void;
}
export declare const RadioButtonDot: <T extends string | number | readonly string[]>({ id, name, label, checked, value, disabled, description, onChange, }: RadioButtonDotProps<T>) => React.JSX.Element;
