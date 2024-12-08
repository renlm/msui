import React from 'react';
export interface WithContextMenuProps {
    /** Menu item trigger that accepts openMenu prop */
    children: (props: {
        openMenu: React.MouseEventHandler<HTMLElement>;
    }) => JSX.Element;
    /** A function that returns an array of menu items */
    renderMenuItems: () => React.ReactNode;
    /** On menu open focus the first element */
    focusOnOpen?: boolean;
}
export declare const WithContextMenu: ({ children, renderMenuItems, focusOnOpen }: WithContextMenuProps) => React.JSX.Element;
