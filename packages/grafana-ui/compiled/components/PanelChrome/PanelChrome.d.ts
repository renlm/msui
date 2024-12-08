import React, { ReactElement, ReactNode } from 'react';
import { LoadingState } from '@grafana/data';
/**
 * @internal
 */
export type PanelChromeProps = (AutoSize | FixedDimensions) & (Collapsible | HoverHeader);
interface BaseProps {
    padding?: PanelPadding;
    title?: string | React.ReactElement;
    description?: string | (() => string);
    titleItems?: ReactNode;
    menu?: ReactElement | (() => ReactElement);
    dragClass?: string;
    dragClassCancel?: string;
    /**
     * Use only to indicate loading or streaming data in the panel.
     * Any other values of loadingState are ignored.
     */
    loadingState?: LoadingState;
    /**
     * Used to display status message (used for panel errors currently)
     */
    statusMessage?: string;
    /**
     * Handle opening error details view (like inspect / error tab)
     */
    statusMessageOnClick?: (e: React.SyntheticEvent) => void;
    /**
     * @deprecated use `actions' instead
     **/
    leftItems?: ReactNode[];
    actions?: ReactNode;
    displayMode?: 'default' | 'transparent';
    onCancelQuery?: () => void;
    /**
     * callback when opening the panel menu
     */
    onOpenMenu?: () => void;
    /**
     * Used for setting panel attention
     */
    onFocus?: () => void;
    /**
     * Debounce the event handler, if possible
     */
    onMouseMove?: () => void;
}
interface FixedDimensions extends BaseProps {
    width: number;
    height: number;
    children: (innerWidth: number, innerHeight: number) => ReactNode;
}
interface AutoSize extends BaseProps {
    width?: never;
    height?: never;
    children: ReactNode;
}
interface Collapsible {
    collapsible: boolean;
    collapsed?: boolean;
    /**
     * callback when collapsing or expanding the panel
     */
    onToggleCollapse?: (collapsed: boolean) => void;
    hoverHeader?: never;
    hoverHeaderOffset?: never;
}
interface HoverHeader {
    collapsible?: never;
    collapsed?: never;
    onToggleCollapse?: never;
    hoverHeader?: boolean;
    hoverHeaderOffset?: number;
}
/**
 * @internal
 */
export type PanelPadding = 'none' | 'md';
/**
 * @internal
 */
export declare function PanelChrome({ width, height, children, padding, title, description, displayMode, titleItems, menu, dragClass, dragClassCancel, hoverHeader, hoverHeaderOffset, loadingState, statusMessage, statusMessageOnClick, leftItems, actions, onCancelQuery, onOpenMenu, collapsible, collapsed, onToggleCollapse, onFocus, onMouseMove, }: PanelChromeProps): React.JSX.Element;
export {};
