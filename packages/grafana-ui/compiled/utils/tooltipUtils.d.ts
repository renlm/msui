import { Placement } from '@floating-ui/react';
import { GrafanaTheme2 } from '@grafana/data';
import { TooltipPlacement } from '../components/Tooltip';
export declare function getPlacement(placement?: TooltipPlacement): Placement;
export declare function buildTooltipTheme(theme: GrafanaTheme2, tooltipBg: string, toggletipBorder: string, tooltipText: string, tooltipPadding: {
    topBottom: number;
    rightLeft: number;
}): {
    arrow: string;
    container: string;
    headerClose: string;
    header: string;
    body: string;
    footer: string;
};
