import React from 'react';
import { LinkModel, LinkTarget } from '@grafana/data';
type TitleItemProps = {
    className?: string;
    children: React.ReactNode;
    onClick?: LinkModel['onClick'];
    href?: string;
    target?: LinkTarget;
    title?: string;
};
type TitleItemElement = HTMLAnchorElement & HTMLButtonElement;
export declare const TitleItem: React.ForwardRefExoticComponent<TitleItemProps & React.RefAttributes<TitleItemElement>>;
export {};
