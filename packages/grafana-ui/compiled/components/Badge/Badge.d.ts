import React, { HTMLAttributes } from 'react';
import { IconName } from '../../types';
export type BadgeColor = 'blue' | 'red' | 'green' | 'orange' | 'purple';
export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    text: React.ReactNode;
    color: BadgeColor;
    icon?: IconName;
    tooltip?: string;
}
export declare const Badge: React.NamedExoticComponent<BadgeProps> & {
    Skeleton: (props: unknown) => React.JSX.Element;
};
