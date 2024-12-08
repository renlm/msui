import React, { CSSProperties } from 'react';
import { LinkModel } from '@grafana/data';
export interface DataLinksContextMenuProps {
    children: (props: DataLinksContextMenuApi) => JSX.Element;
    links: () => LinkModel[];
    style?: CSSProperties;
}
export interface DataLinksContextMenuApi {
    openMenu?: React.MouseEventHandler<HTMLOrSVGElement>;
    targetClassName?: string;
}
export declare const DataLinksContextMenu: ({ children, links, style }: DataLinksContextMenuProps) => React.JSX.Element;
