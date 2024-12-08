import React from 'react';
import { TooltipPlacement } from '../Tooltip/types';
export interface Props {
    overlay: React.ReactElement | (() => React.ReactElement);
    placement?: TooltipPlacement;
    children: React.ReactElement;
    /** Amount in pixels to nudge the dropdown vertically and horizontally, respectively. */
    offset?: [number, number];
    onVisibleChange?: (state: boolean) => void;
}
export declare const Dropdown: React.MemoExoticComponent<({ children, overlay, placement, offset, onVisibleChange }: Props) => React.JSX.Element>;
