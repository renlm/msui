import React from 'react';
import { LoadingIndicator } from './LoadingIndicator';
import { PanelChromeProps } from './PanelChrome';
import { TitleItem } from './TitleItem';
/**
 * @internal
 */
export type { PanelChromeProps, PanelPadding } from './PanelChrome';
/**
 * @internal
 */
export interface PanelChromeType extends React.FC<PanelChromeProps> {
    LoadingIndicator: typeof LoadingIndicator;
    TitleItem: typeof TitleItem;
}
/**
 * @internal
 */
export declare const PanelChrome: PanelChromeType;
/**
 * Exporting the components for extensibility and since it is a good practice
 * according to the api-extractor.
 */
export { LoadingIndicator as PanelChromeLoadingIndicator, type LoadingIndicatorProps as PanelChromeLoadingIndicatorProps, } from './LoadingIndicator';
export { PanelDescription } from './PanelDescription';
export { usePanelContext, PanelContextProvider, type PanelContext, PanelContextRoot } from './PanelContext';
export * from './types';
