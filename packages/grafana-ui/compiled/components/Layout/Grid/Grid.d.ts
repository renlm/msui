import React, { HTMLAttributes } from 'react';
import { ThemeSpacingTokens } from '@grafana/data';
import { AlignItems } from '../types';
import { ResponsiveProp } from '../utils/responsiveness';
interface GridPropsBase extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
    children: NonNullable<React.ReactNode>;
    /** Specifies the gutters between columns and rows. It is overwritten when a column or row gap has a value. */
    gap?: ResponsiveProp<ThemeSpacingTokens>;
    alignItems?: ResponsiveProp<AlignItems>;
}
interface PropsWithColumns extends GridPropsBase {
    /** Number of columns */
    columns?: ResponsiveProp<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>;
    minColumnWidth?: never;
}
interface PropsWithMinColumnWidth extends GridPropsBase {
    columns?: never;
    /** For a responsive layout, fit as many columns while maintaining this minimum column width.
     *  The real width will be calculated based on the theme spacing tokens: `theme.spacing(minColumnWidth)`
     */
    minColumnWidth?: ResponsiveProp<1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 44 | 55 | 72 | 89 | 144>;
}
/** 'columns' and 'minColumnWidth' are mutually exclusive */
type GridProps = PropsWithColumns | PropsWithMinColumnWidth;
export declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
export {};
