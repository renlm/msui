import React from 'react';
import { MenuDivider } from './MenuDivider';
export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
    /** React element rendered at the top of the menu */
    header?: React.ReactNode;
    children: React.ReactNode;
    ariaLabel?: string;
    onOpen?: (focusOnItem: (itemId: number) => void) => void;
    onClose?: () => void;
    onKeyDown?: React.KeyboardEventHandler;
}
export declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLDivElement>> & {
    Item: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("./MenuItem").MenuItemProps<unknown> & React.RefAttributes<import("./MenuItem").MenuItemElement>>>;
    Divider: typeof MenuDivider;
    Group: {
        ({ label, ariaLabel, children }: import("./MenuGroup").MenuGroupProps): React.JSX.Element;
        displayName: string;
    };
};
