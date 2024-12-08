import React, { ReactElement } from 'react';
interface Props {
    children?: React.ReactNode;
    menu?: ReactElement | (() => ReactElement);
    title?: string;
    offset?: number;
    dragClass?: string;
    onOpenMenu?: () => void;
}
export declare function HoverWidget({ menu, title, dragClass, children, offset, onOpenMenu }: Props): React.JSX.Element | null;
export {};
