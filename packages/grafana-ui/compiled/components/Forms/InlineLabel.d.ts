import React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { PopoverContent } from '../Tooltip';
import { LabelProps } from './Label';
export interface Props extends Omit<LabelProps, 'css' | 'description' | 'category'> {
    /** Content for the labels tooltip. If provided, an info icon with the tooltip content
     * will be displayed */
    tooltip?: PopoverContent;
    /** Custom width for the label */
    width?: number | 'auto';
    /** Make labels's background transparent */
    transparent?: boolean;
    /** Make tooltip interactive */
    interactive?: boolean;
    /** @beta */
    /** Controls which element the InlineLabel should be rendered into */
    as?: React.ElementType;
}
export declare const InlineLabel: ({ children, className, tooltip, width, transparent, interactive, as: Component, ...rest }: Props) => React.JSX.Element;
export declare const getInlineLabelStyles: (theme: GrafanaTheme2, transparent?: boolean, width?: number | 'auto') => {
    label: string;
    icon: string;
};
