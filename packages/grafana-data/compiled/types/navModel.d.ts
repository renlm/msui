import { ComponentType } from 'react';
import { LinkTarget } from './dataLink';
import { IconName } from './icon';
export interface NavLinkDTO {
    id?: string;
    text: string;
    subTitle?: string;
    icon?: IconName;
    img?: string;
    url?: string;
    target?: LinkTarget;
    sortWeight?: number;
    hideFromTabs?: boolean;
    roundIcon?: boolean;
    /**
     * This is true for some sections that have no children (but is still a section)
     **/
    isSection?: boolean;
    children?: NavLinkDTO[];
    highlightText?: string;
    highlightId?: string;
    emptyMessageId?: string;
    pluginId?: string;
    isCreateAction?: boolean;
    keywords?: string[];
}
export interface NavModelItem extends NavLinkDTO {
    children?: NavModelItem[];
    active?: boolean;
    parentItem?: NavModelItem;
    onClick?: () => void;
    tabSuffix?: ComponentType<{
        className?: string;
    }>;
    tabCounter?: number;
    hideFromBreadcrumbs?: boolean;
    emptyMessage?: string;
}
/**
 *  Interface used to describe  different kinds of page titles and page navigation. Navmodels are usually generated in the backend and stored in Redux.
 */
export interface NavModel {
    /**
     *  Main page. that wraps the navigation. Generate the `children` property generate tabs when used with the Page component.
     */
    main: NavModelItem;
    /**
     *   This is the current active tab/navigation.
     */
    node: NavModelItem;
}
export type NavIndex = {
    [s: string]: NavModelItem;
};
export declare enum PageLayoutType {
    Standard = 0,
    Canvas = 1,
    Custom = 2
}
