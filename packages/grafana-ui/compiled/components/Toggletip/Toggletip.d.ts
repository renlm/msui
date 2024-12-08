import { Placement } from '@popperjs/core';
import React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { ToggletipContent } from './types';
export interface ToggletipProps {
    /** The theme used to display the toggletip */
    theme?: 'info' | 'error';
    /** The title to be displayed on the header */
    title?: JSX.Element | string;
    /** determine whether to show or not the close button **/
    closeButton?: boolean;
    /** Callback function to be called when the toggletip is closed */
    onClose?: () => void;
    /** The preferred placement of the toggletip */
    placement?: Placement;
    /** The text or component that houses the content of the toggleltip */
    content: ToggletipContent;
    /** The text or component to be displayed on the toggletip's bottom */
    footer?: JSX.Element | string;
    /** The UI control users interact with to display toggletips */
    children: JSX.Element;
    /** Determine whether the toggletip should fit its content or not */
    fitContent?: boolean;
    /** Determine whether the toggletip should be shown or not */
    show?: boolean;
    /** Callback function to be called when the toggletip is opened */
    onOpen?: () => void;
}
export declare const Toggletip: React.MemoExoticComponent<({ children, theme, placement, content, title, closeButton, onClose, footer, fitContent, onOpen, show, }: ToggletipProps) => React.JSX.Element>;
export declare const getStyles: (theme: GrafanaTheme2) => {
    info: {
        arrow: string;
        container: string;
        headerClose: string;
        header: string;
        body: string;
        footer: string;
    };
    error: {
        arrow: string;
        container: string;
        headerClose: string;
        header: string;
        body: string;
        footer: string;
    };
    fitContent: string;
};
