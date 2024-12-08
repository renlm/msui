import React from 'react';
import { IconName, IconType, IconSize } from '../../types/icon';
export interface IconProps extends Omit<React.SVGProps<SVGElement>, 'onLoad' | 'onError' | 'ref'> {
    name: IconName;
    size?: IconSize;
    type?: IconType;
    /**
     * Give your icon a semantic meaning. The icon will be hidden from screen readers, unless this prop or an aria-label is provided.
     */
    title?: string;
}
export declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGElement>>;
