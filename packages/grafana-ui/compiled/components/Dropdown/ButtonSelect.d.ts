import React, { HTMLAttributes } from 'react';
import { SelectableValue } from '@grafana/data';
import { ToolbarButtonVariant } from '../ToolbarButton';
import { PopoverContent } from '../Tooltip';
export interface Props<T> extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    options: Array<SelectableValue<T>>;
    value?: SelectableValue<T>;
    onChange: (item: SelectableValue<T>) => void;
    /** @deprecated use tooltip instead, tooltipContent is not being processed in ToolbarButton*/
    tooltipContent?: PopoverContent;
    narrow?: boolean;
    variant?: ToolbarButtonVariant;
    tooltip?: string;
}
export declare const ButtonSelect: {
    <T>(props: Props<T>): React.JSX.Element;
    displayName: string;
};
