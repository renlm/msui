import React from 'react';
import { ErrorBoundaryApi } from './ErrorBoundary';
export interface Props extends ErrorBoundaryApi {
    title: string;
}
export declare const ErrorWithStack: {
    ({ error, errorInfo, title }: Props): React.JSX.Element;
    displayName: string;
};
