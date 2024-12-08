import React from 'react';
import { ThemeSpacingTokens } from '@grafana/data';
interface DividerProps {
    direction?: 'vertical' | 'horizontal';
    spacing?: ThemeSpacingTokens;
}
export declare const Divider: {
    ({ direction, spacing }: DividerProps): React.JSX.Element;
    displayName: string;
};
export {};
