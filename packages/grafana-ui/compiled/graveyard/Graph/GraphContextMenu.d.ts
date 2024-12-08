import React from 'react';
import { FlotDataPoint, Dimensions, TimeZone, FormattedValue } from '@grafana/data';
import { ContextMenuProps } from '../../components/ContextMenu/ContextMenu';
import { MenuGroupProps } from '../../components/Menu/MenuGroup';
import { GraphDimensions } from './GraphTooltip/types';
/** @deprecated */
export type ContextDimensions<T extends Dimensions = any> = {
    [key in keyof T]: [number, number | undefined] | null;
};
/** @deprecated */
export type GraphContextMenuProps = ContextMenuProps & {
    getContextMenuSource: () => FlotDataPoint | null;
    timeZone?: TimeZone;
    itemsGroup?: MenuGroupProps[];
    dimensions?: GraphDimensions;
    contextDimensions?: ContextDimensions;
};
/** @internal */
export declare const GraphContextMenu: ({ getContextMenuSource, timeZone, itemsGroup, dimensions, contextDimensions, ...otherProps }: GraphContextMenuProps) => React.JSX.Element;
/** @internal */
export declare const GraphContextMenuHeader: ({ timestamp, seriesColor, displayName, displayValue, }: {
    timestamp: string;
    seriesColor: string;
    displayName: string;
    displayValue: FormattedValue;
}) => React.JSX.Element;
