import React, { ReactElement, CSSProperties, AriaRole } from 'react';
import { LinkTarget } from '@grafana/data';
import { IconName } from '../../types/icon';
/** @internal */
export type MenuItemElement = HTMLAnchorElement & HTMLButtonElement & HTMLDivElement;
/** @internal */
export interface MenuItemProps<T = unknown> {
    /** Label of the menu item */
    label: string;
    /** Description of item */
    description?: string;
    /** Aria label for accessibility support */
    ariaLabel?: string;
    /** Aria checked for accessibility support */
    ariaChecked?: boolean;
    /** Target of the menu item (i.e. new window)  */
    target?: LinkTarget;
    /** Icon of the menu item */
    icon?: IconName;
    /** Role of the menu item */
    role?: AriaRole;
    /** Url of the menu item */
    url?: string;
    /** Handler for the click behaviour */
    onClick?: (event: React.MouseEvent<HTMLElement>, payload?: T) => void;
    /** Custom MenuItem styles*/
    className?: string;
    /** Active */
    active?: boolean;
    /** Disabled */
    disabled?: boolean;
    /** Show in destructive style (error color) */
    destructive?: boolean;
    tabIndex?: number;
    /** List of menu items for the subMenu */
    childItems?: Array<ReactElement<MenuItemProps>>;
    /** Custom style for SubMenu */
    customSubMenuContainerStyles?: CSSProperties;
    /** Shortcut key combination */
    shortcut?: string;
    /** Test id for e2e tests and fullstory*/
    testId?: string;
    component?: React.ComponentType;
}
/** @internal */
export declare const MenuItem: React.MemoExoticComponent<React.ForwardRefExoticComponent<MenuItemProps<unknown> & React.RefAttributes<MenuItemElement>>>;
