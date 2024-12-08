import React, { HTMLAttributes } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
/**
 * @public
 */
export interface CardInnerProps {
    href?: string;
    children?: React.ReactNode;
}
/**
 * @public
 */
export interface CardContainerProps extends HTMLAttributes<HTMLOrSVGElement>, CardInnerProps {
    /** Disable pointer events for the Card, e.g. click events */
    disableEvents?: boolean;
    /** No style change on hover */
    disableHover?: boolean;
    /** Makes the card selectable, set to "true" to apply selected styles */
    isSelected?: boolean;
    /** Custom container styles */
    className?: string;
}
/** @deprecated Using `CardContainer` directly is discouraged and should be replaced with `Card` */
export declare const CardContainer: ({ children, disableEvents, disableHover, isSelected, className, href, ...props }: CardContainerProps) => React.JSX.Element;
export declare const getCardContainerStyles: (theme: GrafanaTheme2, disabled?: boolean, disableHover?: boolean, isSelected?: boolean, isCompact?: boolean) => {
    container: string;
    oldContainer: string;
};
