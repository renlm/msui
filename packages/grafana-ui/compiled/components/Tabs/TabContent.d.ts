import React, { HTMLAttributes, ReactNode } from 'react';
interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
export declare const TabContent: ({ children, className, ...restProps }: Props) => React.JSX.Element;
export {};
