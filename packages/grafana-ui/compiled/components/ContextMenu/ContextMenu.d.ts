import React from 'react';
export interface ContextMenuProps {
    /** Starting horizontal position for the menu */
    x: number;
    /** Starting vertical position for the menu */
    y: number;
    /** Callback for closing the menu */
    onClose?: () => void;
    /** On menu open focus the first element */
    focusOnOpen?: boolean;
    /** RenderProp function that returns menu items to display */
    renderMenuItems?: () => React.ReactNode;
    /** A function that returns header element */
    renderHeader?: () => React.ReactNode;
}
export declare const ContextMenu: React.MemoExoticComponent<({ x, y, onClose, focusOnOpen, renderMenuItems, renderHeader }: ContextMenuProps) => React.JSX.Element>;
