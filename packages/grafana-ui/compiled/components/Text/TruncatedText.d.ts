import React from 'react';
interface TruncatedTextProps {
    childElement: (ref: React.ForwardedRef<HTMLElement> | undefined) => React.ReactElement;
    children: NonNullable<React.ReactNode>;
}
export declare const TruncatedText: React.ForwardRefExoticComponent<TruncatedTextProps & React.RefAttributes<HTMLElement>>;
export {};
