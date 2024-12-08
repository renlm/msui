import React, { HTMLAttributes } from 'react';
/**
 * @public
 */
export interface VizTooltipContainerProps extends HTMLAttributes<HTMLDivElement> {
    position: {
        x: number;
        y: number;
    };
    offset: {
        x: number;
        y: number;
    };
    children?: React.ReactNode;
    allowPointerEvents?: boolean;
}
/**
 * @public
 */
export declare const VizTooltipContainer: {
    ({ position: { x: positionX, y: positionY }, offset: { x: offsetX, y: offsetY }, children, allowPointerEvents, className, ...otherProps }: VizTooltipContainerProps): React.JSX.Element;
    displayName: string;
};
