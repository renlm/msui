import React from 'react';
export interface Props {
    message?: string;
    onClick?: (e: React.SyntheticEvent) => void;
    ariaLabel?: string;
}
export declare function PanelStatus({ message, onClick, ariaLabel }: Props): React.JSX.Element;
