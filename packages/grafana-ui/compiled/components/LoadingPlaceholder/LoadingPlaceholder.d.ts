import React, { HTMLAttributes } from 'react';
/**
 * @public
 */
export interface LoadingPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
    text: React.ReactNode;
}
/**
 * @public
 */
export declare const LoadingPlaceholder: ({ text, className, ...rest }: LoadingPlaceholderProps) => React.JSX.Element;
