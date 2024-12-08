import React, { RefCallback } from 'react';
import { MenuListProps } from 'react-select';
import { SelectableValue } from '@grafana/data';
interface SelectMenuProps {
    maxHeight: number;
    innerRef: RefCallback<HTMLDivElement>;
    innerProps: {};
}
export declare const SelectMenu: {
    ({ children, maxHeight, innerRef, innerProps }: React.PropsWithChildren<SelectMenuProps>): React.JSX.Element;
    displayName: string;
};
export declare const VirtualizedSelectMenu: {
    ({ children, maxHeight, innerRef: scrollRef, options, focusedOption, }: MenuListProps<SelectableValue>): React.JSX.Element | null;
    displayName: string;
};
interface SelectMenuOptionProps<T> {
    isDisabled: boolean;
    isFocused: boolean;
    isSelected: boolean;
    innerProps: JSX.IntrinsicElements['div'];
    innerRef: RefCallback<HTMLDivElement>;
    renderOptionLabel?: (value: SelectableValue<T>) => JSX.Element;
    data: SelectableValue<T>;
}
export declare const SelectMenuOptions: {
    ({ children, data, innerProps, innerRef, isFocused, isSelected, renderOptionLabel, }: React.PropsWithChildren<SelectMenuOptionProps<unknown>>): React.JSX.Element;
    displayName: string;
};
export {};
