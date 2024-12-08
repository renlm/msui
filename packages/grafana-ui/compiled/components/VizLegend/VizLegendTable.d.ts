import { VizLegendTableProps } from './types';
/**
 * @internal
 */
export declare const VizLegendTable: <T extends unknown>({ items, sortBy: sortKey, sortDesc, itemRenderer, className, onToggleSort, onLabelClick, onLabelMouseOver, onLabelMouseOut, readonly, isSortable, }: VizLegendTableProps<T>) => JSX.Element;
