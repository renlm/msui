import React, { ReactNode } from 'react';
export interface Props {
    label: ReactNode;
    isOpen: boolean;
    /** Callback for the toggle functionality */
    onToggle?: (isOpen: boolean) => void;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    loading?: boolean;
    labelId?: string;
    headerDataTestId?: string;
    contentDataTestId?: string;
}
export declare const CollapsableSection: ({ label, isOpen, onToggle, className, contentClassName, children, labelId, loading, headerDataTestId, contentDataTestId, }: Props) => React.JSX.Element;
