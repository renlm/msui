import React from 'react';
import { VizLegendBaseProps } from './types';
export interface Props<T> extends VizLegendBaseProps<T> {
}
/**
 * @internal
 */
export declare const VizLegendList: {
    <T extends unknown>({ items, itemRenderer, onLabelMouseOver, onLabelMouseOut, onLabelClick, placement, className, readonly, }: Props<T>): React.JSX.Element;
    displayName: string;
};
