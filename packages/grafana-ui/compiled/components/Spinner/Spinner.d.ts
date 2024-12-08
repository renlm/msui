import React from 'react';
import { IconSize } from '../../types';
export interface Props {
    className?: string;
    style?: React.CSSProperties;
    iconClassName?: string;
    inline?: boolean;
    size?: IconSize;
}
/**
 * @deprecated
 * use a predefined size, e.g. 'md' or 'lg' instead
 */
interface PropsWithDeprecatedSize extends Omit<Props, 'size'> {
    size?: number | string;
}
/**
 * @public
 */
export declare const Spinner: ({ className, inline, iconClassName, style, size, }: Props | PropsWithDeprecatedSize) => React.JSX.Element;
export {};
