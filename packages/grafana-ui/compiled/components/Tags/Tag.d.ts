import React, { HTMLAttributes } from 'react';
import { IconName } from '../../types/icon';
/**
 * @public
 */
export type OnTagClick = (name: string, event: React.MouseEvent<HTMLElement>) => void;
export interface Props extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
    /** Name of the tag to display */
    name: string;
    icon?: IconName;
    /** Use constant color from TAG_COLORS. Using index instead of color directly so we can match other styling. */
    colorIndex?: number;
    onClick?: OnTagClick;
}
export declare const Tag: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>> & {
    Skeleton: (props: unknown) => React.JSX.Element;
};
