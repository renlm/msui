import React, { RefCallback } from 'react';
import { positionValues } from 'react-custom-scrollbars-2';
export type ScrollbarPosition = positionValues;
interface Props {
    className?: string;
    testId?: string;
    autoHide?: boolean;
    autoHideTimeout?: number;
    autoHeightMax?: string;
    hideTracksWhenNotNeeded?: boolean;
    hideHorizontalTrack?: boolean;
    hideVerticalTrack?: boolean;
    scrollRefCallback?: RefCallback<HTMLDivElement>;
    scrollTop?: number;
    setScrollTop?: (position: ScrollbarPosition) => void;
    showScrollIndicators?: boolean;
    autoHeightMin?: number | string;
    updateAfterMountMs?: number;
    onScroll?: React.UIEventHandler;
    divId?: string;
}
/**
 * Wraps component into <Scrollbars> component from `react-custom-scrollbars`
 */
export declare const CustomScrollbar: ({ autoHide, autoHideTimeout, setScrollTop, className, testId, autoHeightMin, autoHeightMax, hideTracksWhenNotNeeded, hideHorizontalTrack, hideVerticalTrack, scrollRefCallback, showScrollIndicators, updateAfterMountMs, scrollTop, onScroll, children, divId, }: React.PropsWithChildren<Props>) => React.JSX.Element;
export default CustomScrollbar;
