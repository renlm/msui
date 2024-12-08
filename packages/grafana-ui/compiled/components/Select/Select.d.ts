import React from 'react';
import { SelectableValue } from '@grafana/data';
import { SelectContainer, SelectContainerProps } from './SelectContainer';
import { SelectCommonProps, MultiSelectCommonProps, SelectAsyncProps, VirtualizedSelectProps, VirtualizedSelectAsyncProps } from './types';
export declare function Select<T, Rest = {}>(props: SelectCommonProps<T> & Rest): React.JSX.Element;
export declare function MultiSelect<T, Rest = {}>(props: MultiSelectCommonProps<T> & Rest): React.JSX.Element;
export interface AsyncSelectProps<T> extends Omit<SelectCommonProps<T>, 'options'>, SelectAsyncProps<T> {
    value?: T | SelectableValue<T> | null;
}
export declare function AsyncSelect<T, Rest = {}>(props: AsyncSelectProps<T> & Rest): React.JSX.Element;
export declare function VirtualizedSelect<T, Rest = {}>(props: VirtualizedSelectProps<T> & Rest): React.JSX.Element;
export declare function AsyncVirtualizedSelect<T, Rest = {}>(props: VirtualizedSelectAsyncProps<T> & Rest): React.JSX.Element;
interface AsyncMultiSelectProps<T> extends Omit<MultiSelectCommonProps<T>, 'options'>, SelectAsyncProps<T> {
    value?: Array<SelectableValue<T>>;
}
export declare function AsyncMultiSelect<T, Rest = {}>(props: AsyncMultiSelectProps<T> & Rest): React.JSX.Element;
export { SelectContainer, type SelectContainerProps };
