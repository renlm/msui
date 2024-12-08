import React from 'react';
export interface Props {
    title: string;
    collapsedInfo: string[];
    children: React.ReactNode;
}
export declare function QueryOptionGroup({ title, children, collapsedInfo }: Props): React.JSX.Element;
