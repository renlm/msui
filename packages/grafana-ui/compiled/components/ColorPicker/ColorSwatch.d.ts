import React from 'react';
/** @internal */
export declare enum ColorSwatchVariant {
    Small = "small",
    Large = "large"
}
/** @internal */
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    color: string;
    label?: string;
    variant?: ColorSwatchVariant;
    isSelected?: boolean;
}
/** @internal */
export declare const ColorSwatch: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
