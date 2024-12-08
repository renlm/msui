import { Side } from '@floating-ui/react';
import React from 'react';
import { IconName } from '../../types';
export interface InlineToastProps {
    children: React.ReactNode;
    suffixIcon?: IconName;
    referenceElement: HTMLElement | null;
    placement: Side;
    /**
     * @deprecated
     * Placement to use if there is not enough space to show the full toast with the original placement
     * This is now done automatically.
     */
    alternativePlacement?: Side;
}
export declare function InlineToast({ referenceElement, children, suffixIcon, placement }: InlineToastProps): React.JSX.Element;
