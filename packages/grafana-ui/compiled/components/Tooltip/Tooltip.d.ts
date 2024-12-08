import React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { PopoverContent, TooltipPlacement } from './types';
export interface TooltipProps {
    theme?: 'info' | 'error' | 'info-alt';
    show?: boolean;
    placement?: TooltipPlacement;
    content: PopoverContent;
    children: JSX.Element;
    /**
     * Set to true if you want the tooltip to stay long enough so the user can move mouse over content to select text or click a link
     */
    interactive?: boolean;
}
export declare const Tooltip: React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<HTMLElement>>;
export declare const getStyles: (theme: GrafanaTheme2) => {
    info: {
        arrow: string;
        container: string;
        headerClose: string;
        header: string;
        body: string;
        footer: string;
    };
    "info-alt": {
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
};
