import React from 'react';
export interface Props {
    title?: React.ReactNode;
    children?: React.ReactNode;
    markdown?: string;
    stepNumber?: number;
}
export declare function OperationExplainedBox({ title, stepNumber, markdown, children }: Props): React.JSX.Element;
