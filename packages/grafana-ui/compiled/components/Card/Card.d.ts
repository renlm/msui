import React, { FC, ReactNode } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { CardContainerProps } from './CardContainer';
/**
 * @public
 */
export interface Props extends Omit<CardContainerProps, 'disableEvents' | 'disableHover'> {
    /** Indicates if the card and all its actions can be interacted with */
    disabled?: boolean;
    /** Link to redirect to on card click. If provided, the Card inner content will be rendered inside `a` */
    href?: string;
    /** On click handler for the Card */
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    /** @deprecated Use `Card.Heading` instead */
    heading?: ReactNode;
    /** @deprecated Use `Card.Description` instead */
    description?: string;
    isSelected?: boolean;
    /** If true, the padding of the Card will be smaller */
    isCompact?: boolean;
}
export interface CardInterface extends FC<Props> {
    Heading: typeof Heading;
    Tags: typeof Tags;
    Figure: typeof Figure;
    Meta: typeof Meta;
    Actions: typeof Actions;
    SecondaryActions: typeof SecondaryActions;
    Description: typeof Description;
}
/**
 * Generic card component
 *
 * @public
 */
export declare const Card: CardInterface;
interface ChildProps {
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}
/** Main heading for the card */
declare const Heading: {
    ({ children, className, "aria-label": ariaLabel }: ChildProps & {
        'aria-label'?: string;
    }): React.JSX.Element;
    displayName: string;
};
declare const Tags: {
    ({ children, className }: ChildProps): React.JSX.Element;
    displayName: string;
};
/** Card description text */
declare const Description: {
    ({ children, className }: ChildProps): React.JSX.Element;
    displayName: string;
};
declare const Figure: {
    ({ children, align, className }: ChildProps & {
        align?: 'start' | 'center';
    }): React.JSX.Element;
    displayName: string;
};
declare const Meta: React.MemoExoticComponent<({ children, className, separator }: ChildProps & {
    separator?: string;
}) => React.JSX.Element | null>;
declare const Actions: {
    ({ children, disabled, className }: ChildProps): React.JSX.Element;
    displayName: string;
};
declare const SecondaryActions: {
    ({ children, disabled, className }: ChildProps): React.JSX.Element;
    displayName: string;
};
/**
 * @public
 * @deprecated Use `className` on respective components to modify styles
 */
export declare const getCardStyles: (theme: GrafanaTheme2) => {
    tagList: string;
    actions: string;
    secondaryActions: string;
    media: string;
    description: string;
    metadata: string;
    metadataItem: string;
    separator: string;
    heading: string;
    linkHack: string;
    inner: string;
};
export {};
