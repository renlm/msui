import React from 'react';
interface Props {
    children: React.ReactNode;
    delay: number;
}
/**
 * Delay the rendering of the children by N amount of milliseconds
 */
export declare function DelayRender({ children, delay }: Props): React.JSX.Element;
export {};
