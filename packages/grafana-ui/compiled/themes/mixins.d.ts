import { GrafanaTheme, GrafanaTheme2 } from '@grafana/data';
export declare function cardChrome(theme: GrafanaTheme2): string;
export declare function hoverColor(color: string, theme: GrafanaTheme2): string;
export declare function listItem(theme: GrafanaTheme2): string;
export declare function listItemSelected(theme: GrafanaTheme2): string;
export declare function mediaUp(breakpoint: string): string;
export declare const focusCss: (theme: GrafanaTheme | GrafanaTheme2) => string;
export declare function getMouseFocusStyles(theme: GrafanaTheme | GrafanaTheme2): {
    outline: string;
    boxShadow: string;
};
export declare function getFocusStyles(theme: GrafanaTheme2): {
    outline: string;
    outlineOffset: string;
    boxShadow: string;
    transitionTimingFunction: string;
    transitionDuration: string;
    transitionProperty: string;
};
export declare const getTooltipContainerStyles: (theme: GrafanaTheme2) => {
    overflow: string;
    background: string;
    boxShadow: string;
    maxWidth: string;
    padding: string;
    borderRadius: string;
    zIndex: number;
};
