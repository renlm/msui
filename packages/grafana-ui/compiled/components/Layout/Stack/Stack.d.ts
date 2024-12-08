import React from 'react';
import { ThemeSpacingTokens } from '@grafana/data';
import { AlignItems, Direction, FlexProps, JustifyContent, Wrap } from '../types';
import { ResponsiveProp } from '../utils/responsiveness';
import { SizeProps } from '../utils/styles';
interface StackProps extends FlexProps, SizeProps, Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'style'> {
    gap?: ResponsiveProp<ThemeSpacingTokens>;
    alignItems?: ResponsiveProp<AlignItems>;
    justifyContent?: ResponsiveProp<JustifyContent>;
    direction?: ResponsiveProp<Direction>;
    wrap?: ResponsiveProp<Wrap>;
    children?: React.ReactNode;
}
export declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export {};
