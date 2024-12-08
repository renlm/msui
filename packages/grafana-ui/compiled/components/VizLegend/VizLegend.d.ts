import React from 'react';
import { LegendProps } from './types';
/**
 * @public
 */
export declare function VizLegend<T>({ items, displayMode, sortBy: sortKey, seriesVisibilityChangeBehavior, sortDesc, onLabelClick, onToggleSort, placement, className, itemRenderer, readonly, isSortable, }: LegendProps<T>): React.JSX.Element | null;
export declare namespace VizLegend {
    var displayName: string;
}
