import React from 'react';
import { VizLegendItem } from './types';
export interface Props {
    key?: React.Key;
    item: VizLegendItem;
    className?: string;
    onLabelClick?: (item: VizLegendItem, event: React.MouseEvent<HTMLButtonElement>) => void;
    onLabelMouseOver?: (item: VizLegendItem, event: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => void;
    onLabelMouseOut?: (item: VizLegendItem, event: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => void;
    readonly?: boolean;
}
/**
 * @internal
 */
export declare const LegendTableItem: {
    ({ item, onLabelClick, onLabelMouseOver, onLabelMouseOut, className, readonly, }: Props): React.JSX.Element;
    displayName: string;
};
