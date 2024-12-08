import React, { ReactElement } from 'react';
import { TooltipPlacement } from '../Tooltip';
interface PanelMenuProps {
    menu: ReactElement | (() => ReactElement);
    menuButtonClass?: string;
    dragClassCancel?: string;
    title?: string;
    placement?: TooltipPlacement;
    offset?: [number, number];
    onOpenMenu?: () => void;
}
export declare function PanelMenu({ menu, title, placement, offset, dragClassCancel, menuButtonClass, onOpenMenu, }: PanelMenuProps): React.JSX.Element;
export {};
