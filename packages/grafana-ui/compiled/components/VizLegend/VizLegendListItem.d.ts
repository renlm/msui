import React from 'react';
import { VizLegendItem } from './types';
export interface Props<T> {
    item: VizLegendItem<T>;
    className?: string;
    onLabelClick?: (item: VizLegendItem<T>, event: React.MouseEvent<HTMLButtonElement>) => void;
    onLabelMouseOver?: (item: VizLegendItem, event: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => void;
    onLabelMouseOut?: (item: VizLegendItem, event: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => void;
    readonly?: boolean;
}
/**
 * @internal
 */
export declare const VizLegendListItem: {
    <T = unknown>({ item, onLabelClick, onLabelMouseOver, onLabelMouseOut, className, readonly, }: Props<T>): React.JSX.Element;
    displayName: string;
};
