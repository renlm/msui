import React from 'react';
import { FooterItem } from './types';
export interface FooterProps {
    value: FooterItem;
}
export declare const FooterCell: (props: FooterProps) => React.JSX.Element | (() => React.JSX.Element);
export declare const EmptyCell: () => React.JSX.Element;
