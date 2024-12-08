import React from 'react';
import { DragHandlePosition } from '../DragHandle/DragHandle';
export interface UseSplitterOptions {
    /**
     * The initial size of the primary pane between 0-1, defaults to 0.5
     */
    initialSize?: number;
    direction: 'row' | 'column';
    dragPosition?: DragHandlePosition;
    /**
     * Called when ever the size of the primary pane changes
     * @param flexSize (float from 0-1)
     */
    onSizeChanged?: (flexSize: number, pixelSize: number) => void;
    onResizing?: (flexSize: number, pixelSize: number) => void;
}
export declare function useSplitter(options: UseSplitterOptions): {
    containerProps: {
        ref: React.MutableRefObject<HTMLDivElement | null>;
        className: string;
    };
    primaryProps: {
        ref: React.MutableRefObject<HTMLDivElement | null>;
        className: string;
        style: {
            [x: string]: string | number;
            flexGrow: number;
        };
    };
    secondaryProps: {
        ref: React.MutableRefObject<HTMLDivElement | null>;
        className: string;
        style: {
            [x: string]: string | number;
            flexGrow: number;
        };
    };
    splitterProps: {
        onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
        onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
        onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
        onKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void;
        onDoubleClick: () => void;
        onBlur: () => void;
        ref: React.MutableRefObject<HTMLDivElement | null>;
        style: {
            [x: string]: string;
        };
        role: string;
        'aria-valuemin': number;
        'aria-valuemax': number;
        'aria-valuenow': number;
        'aria-controls': string;
        'aria-label': string;
        tabIndex: number;
        className: string;
    };
};
