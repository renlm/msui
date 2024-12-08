import React from 'react';
/**
 * @internal
 */
export type LoadingIndicatorProps = {
    loading: boolean;
    onCancel: () => void;
};
/**
 * @internal
 */
export declare const LoadingIndicator: ({ onCancel, loading }: LoadingIndicatorProps) => React.JSX.Element | null;
