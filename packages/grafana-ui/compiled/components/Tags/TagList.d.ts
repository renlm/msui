import React from 'react';
import { IconName } from '../../types/icon';
import { OnTagClick } from './Tag';
export interface Props {
    /** Maximum number of the tags to display */
    displayMax?: number;
    /** Names of the tags to display */
    tags: string[];
    /** Callback when the tag is clicked */
    onClick?: OnTagClick;
    /** Custom styles for the wrapper component */
    className?: string;
    /** aria-label for the `i`-th Tag component */
    getAriaLabel?: (name: string, i: number) => string;
    getColorIndex?: (name: string, i: number) => number;
    /** Icon to show next to tag label */
    icon?: IconName;
}
export declare const TagList: React.NamedExoticComponent<Omit<Props & React.RefAttributes<HTMLUListElement>, "ref"> & {
    ref?: React.RefObject<HTMLUListElement> | ((instance: HTMLUListElement | null) => void) | null | undefined;
}> & {
    readonly type: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLUListElement>>;
} & {
    Skeleton: (props: unknown) => React.JSX.Element;
};
