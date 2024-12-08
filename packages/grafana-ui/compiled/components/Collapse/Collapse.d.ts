import React from 'react';
export interface Props {
    /** Expand or collapse te content */
    isOpen?: boolean;
    /** Element or text for the Collapse header */
    label: React.ReactNode;
    /** Indicates loading state of the content */
    loading?: boolean;
    /** Toggle collapsed header icon */
    collapsible?: boolean;
    /** Callback for the toggle functionality */
    onToggle?: (isOpen: boolean) => void;
    /** Additional class name for the root element */
    className?: string;
}
export declare const ControlledCollapse: ({ isOpen, onToggle, ...otherProps }: React.PropsWithChildren<Props>) => React.JSX.Element;
export declare const Collapse: {
    ({ isOpen, label, loading, collapsible, onToggle, className, children, }: React.PropsWithChildren<Props>): React.JSX.Element;
    displayName: string;
};
