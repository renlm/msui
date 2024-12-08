import React from 'react';
import { ThemeSpacingTokens } from '@grafana/data';
import { ResponsiveProp } from '../Layout/utils/responsiveness';
export interface AvatarProps {
    src: string;
    alt: string;
    width?: ResponsiveProp<ThemeSpacingTokens>;
    height?: ResponsiveProp<ThemeSpacingTokens>;
}
export declare const Avatar: ({ src, alt, width, height }: AvatarProps) => React.JSX.Element;
