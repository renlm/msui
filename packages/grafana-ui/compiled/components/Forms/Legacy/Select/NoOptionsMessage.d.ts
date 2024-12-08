import React from 'react';
import { NoticeProps, GroupBase } from 'react-select';
import { SelectableValue } from '@grafana/data';
export type Props<T> = NoticeProps<SelectableValue<T>, boolean, GroupBase<SelectableValue<T>>>;
/** @deprecated Please use the {@link Select} component*/
export declare const NoOptionsMessage: <T extends unknown>(props: Props<T>) => React.JSX.Element;
export default NoOptionsMessage;
