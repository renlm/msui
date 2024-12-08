import React, { CSSProperties, ReactElement } from 'react';
import { MenuItemProps } from './MenuItem';
/** @internal */
export interface SubMenuProps {
    /** List of menu items of the subMenu */
    items?: Array<ReactElement<MenuItemProps>>;
    /** Open */
    isOpen: boolean;
    /** Closes the subMenu */
    close: () => void;
    /** Custom style */
    customStyle?: CSSProperties;
}
/** @internal */
export declare const SubMenu: React.MemoExoticComponent<({ items, isOpen, close, customStyle }: SubMenuProps) => React.JSX.Element>;
