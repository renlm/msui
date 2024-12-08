import React, { HTMLAttributes } from 'react';
export interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    /** Determine flex-alignment of child buttons. Needed for overflow behaviour. */
    alignment?: 'left' | 'right';
}
export declare const ToolbarButtonRow: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
