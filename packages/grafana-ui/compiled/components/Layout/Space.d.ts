import React from 'react';
import { ThemeSpacingTokens } from '@grafana/data';
import { ResponsiveProp } from './utils/responsiveness';
export interface SpaceProps {
    /**
     * The amount of vertical space to use.
     */
    v?: ResponsiveProp<ThemeSpacingTokens>;
    /**
     * The amount of horizontal space to use.
     */
    h?: ResponsiveProp<ThemeSpacingTokens>;
    /**
     * The layout of the space. If set to `inline`, the component will behave like an inline-block element,
     * otherwise it will behave like a block element.
     */
    layout?: 'block' | 'inline';
}
export declare const Space: ({ v, h, layout }: SpaceProps) => React.JSX.Element;
