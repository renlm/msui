import React from 'react';
import { MenuItemProps } from './MenuItem';
/** @internal */
export interface MenuItemsGroup<T = unknown> {
    /** Label for the menu items group */
    label?: string;
    /** Aria label for accessibility support */
    ariaLabel?: string;
    /** Items of the group */
    items: Array<MenuItemProps<T>>;
}
/** @internal */
export interface MenuGroupProps extends Partial<MenuItemsGroup> {
    /** special children prop to pass children elements */
    children: React.ReactNode;
}
/** @internal */
export declare const MenuGroup: {
    ({ label, ariaLabel, children }: MenuGroupProps): React.JSX.Element;
    displayName: string;
};
