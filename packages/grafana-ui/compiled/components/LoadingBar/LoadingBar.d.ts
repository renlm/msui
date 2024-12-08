import React from 'react';
export interface LoadingBarProps {
    width: number;
    delay?: number;
    ariaLabel?: string;
}
export declare function LoadingBar({ width, delay, ariaLabel }: LoadingBarProps): React.JSX.Element;
