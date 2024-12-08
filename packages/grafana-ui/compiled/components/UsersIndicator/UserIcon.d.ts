import React, { PropsWithChildren } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { UserView } from './types';
export interface UserIconProps {
    /** An object that contains the user's details and 'lastActiveAt' status */
    userView: UserView;
    /** A boolean value that determines whether the tooltip should be shown or not */
    showTooltip?: boolean;
    /** An optional class name to be added to the icon element */
    className?: string;
    /** onClick handler to be called when the icon is clicked */
    onClick?: () => void;
}
export declare const UserIcon: ({ userView, className, children, onClick, showTooltip, }: PropsWithChildren<UserIconProps>) => React.JSX.Element;
export declare const getStyles: (theme: GrafanaTheme2, isActive: boolean) => {
    container: string;
    content: string;
    textContent: string;
    tooltipContainer: string;
    tooltipName: string;
    tooltipDate: string;
    dotContainer: string;
    dot: string;
    pointer: string;
};
