import React from 'react';
interface Props {
    description: string | (() => string);
    className?: string;
}
export declare function PanelDescription({ description, className }: Props): React.JSX.Element | null;
export {};
