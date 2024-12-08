import React from 'react';
import { PopoverContentProps } from '../Tooltip';
import { ColorPickerProps } from './ColorPickerPopover';
export interface SeriesColorPickerPopoverProps extends ColorPickerProps, PopoverContentProps {
    yaxis?: number;
    onToggleAxis?: () => void;
}
export declare const SeriesColorPickerPopover: (props: SeriesColorPickerPopoverProps) => React.JSX.Element;
export declare const SeriesColorPickerPopoverWithTheme: React.FunctionComponent<{
    color: string;
    onChange: import("./ColorPickerPopover").ColorPickerChangeHandler;
    enableNamedColors?: boolean | undefined;
    updatePopperPosition?: (() => void) | undefined;
    yaxis?: number | undefined;
    onToggleAxis?: (() => void) | undefined;
}>;
