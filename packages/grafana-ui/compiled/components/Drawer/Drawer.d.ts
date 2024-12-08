import React, { ReactNode } from 'react';
import 'rc-drawer/assets/index.css';
export interface Props {
    children: ReactNode;
    /** Title shown at the top of the drawer */
    title?: ReactNode;
    /** Subtitle shown below the title */
    subtitle?: ReactNode;
    /** Should the Drawer be closable by clicking on the mask, defaults to true */
    closeOnMaskClick?: boolean;
    /** @deprecated */
    inline?: boolean;
    /**
     * @deprecated use the size property instead
     **/
    width?: number | string;
    /**
     * @deprecated use a large size instead if high width is needed
     **/
    expandable?: boolean;
    /**
     * Specifies the width and min-width.
     * sm = width 25vw & min-width 384px
     * md = width 50vw & min-width 568px
     * lg = width 75vw & min-width 744px
     **/
    size?: 'sm' | 'md' | 'lg';
    /** Tabs */
    tabs?: React.ReactNode;
    /**
     * @deprecated this is now default behaviour. content is always scrollable.
     **/
    scrollableContent?: boolean;
    /** Callback for closing the drawer */
    onClose: () => void;
}
export declare function Drawer({ children, onClose, closeOnMaskClick, scrollableContent, title, subtitle, width, size, tabs, }: Props): React.JSX.Element;
