import React from 'react';
import { FlotPosition } from '../../../components/VizTooltip/VizTooltip';
import { GraphTooltipContentProps } from './types';
/** @deprecated */
type Props = GraphTooltipContentProps & {
    pos: FlotPosition;
};
/** @deprecated */
export declare const MultiModeGraphTooltip: {
    ({ dimensions, activeDimensions, pos, timeZone }: Props): React.JSX.Element | null;
    displayName: string;
};
export {};
