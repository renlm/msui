import React, { HTMLProps } from 'react';
import { AsyncState } from 'react-use/lib/useAsync';
import { SelectableValue } from '@grafana/data';
import { SegmentProps } from './types';
export interface SegmentAsyncProps<T> extends SegmentProps, Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> {
    value?: T | SelectableValue<T>;
    loadOptions: (query?: string) => Promise<Array<SelectableValue<T>>>;
    /**
     *  If true options will be reloaded when user changes the value in the input,
     *  otherwise, options will be loaded when the segment is clicked
     */
    reloadOptionsOnChange?: boolean;
    onChange: (item: SelectableValue<T>) => void;
    noOptionMessageHandler?: (state: AsyncState<Array<SelectableValue<T>>>) => string;
    inputMinWidth?: number;
}
export declare function SegmentAsync<T>({ value, onChange, loadOptions, reloadOptionsOnChange, Component, className, allowCustomValue, allowEmptyValue, disabled, placeholder, inputMinWidth, inputPlaceholder, autofocus, onExpandedChange, noOptionMessageHandler, ...rest }: React.PropsWithChildren<SegmentAsyncProps<T>>): React.JSX.Element;
