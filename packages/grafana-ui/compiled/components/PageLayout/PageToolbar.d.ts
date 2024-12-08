import React, { ReactNode } from 'react';
import { IconName } from '../../types';
export interface Props {
    pageIcon?: IconName;
    title?: string;
    section?: string;
    parent?: string;
    onGoBack?: () => void;
    titleHref?: string;
    parentHref?: string;
    leftItems?: ReactNode[];
    children?: ReactNode;
    className?: string;
    isFullscreen?: boolean;
    'aria-label'?: string;
    buttonOverflowAlignment?: 'left' | 'right';
    /**
     * Forces left items to be visible on small screens.
     * By default left items are hidden on small screens.
     */
    forceShowLeftItems?: boolean;
}
/** @alpha */
export declare const PageToolbar: React.MemoExoticComponent<({ title, section, parent, pageIcon, onGoBack, children, titleHref, parentHref, leftItems, isFullscreen, className, "aria-label": ariaLabel, buttonOverflowAlignment, forceShowLeftItems, }: Props) => React.JSX.Element>;
