import React, { PureComponent } from 'react';
import { MenuListProps } from 'react-select';
import { SelectableValue, ThemeContext } from '@grafana/data';
import { SelectCommonProps, SelectAsyncProps } from '../../../Select/types';
import { PopoverContent } from '../../../Tooltip';
/**
 * Changes in new selects:
 * - noOptionsMessage & loadingMessage is of string type
 * - isDisabled is renamed to disabled
 */
type LegacyCommonProps<T> = Omit<SelectCommonProps<T>, 'noOptionsMessage' | 'disabled' | 'value' | 'loadingMessage'>;
interface AsyncProps<T> extends LegacyCommonProps<T>, Omit<SelectAsyncProps<T>, 'loadingMessage'> {
    loadingMessage?: () => string;
    noOptionsMessage?: () => string;
    tooltipContent?: PopoverContent;
    isDisabled?: boolean;
    value?: SelectableValue<T>;
}
export interface LegacySelectProps<T> extends LegacyCommonProps<T> {
    tooltipContent?: PopoverContent;
    noOptionsMessage?: () => string;
    isDisabled?: boolean;
    value?: SelectableValue<T>;
}
export declare const MenuList: (props: MenuListProps) => React.JSX.Element;
/** @deprecated Please use the `Select` component, as seen {@link https://developers.grafana.com/ui/latest/index.html?path=/story/forms-select--basic in Storybook}. */
export declare class Select<T> extends PureComponent<LegacySelectProps<T>> {
    context: React.ContextType<typeof ThemeContext>;
    static contextType: React.Context<import("@grafana/data").GrafanaTheme2>;
    static defaultProps: Partial<LegacySelectProps<unknown>>;
    render(): React.JSX.Element;
}
/** @deprecated Please use the `Select` component with async functionality, as seen {@link https://developers.grafana.com/ui/latest/index.html?path=/story/forms-select--basic-select-async in Storybook}. */
export declare class AsyncSelect<T> extends PureComponent<AsyncProps<T>> {
    static contextType: React.Context<import("@grafana/data").GrafanaTheme2>;
    static defaultProps: Partial<AsyncProps<unknown>>;
    render(): React.JSX.Element;
}
export interface TooltipWrapperProps {
    children: (onOpenMenu: () => void, onCloseMenu: () => void) => React.ReactNode;
    onOpenMenu?: () => void;
    onCloseMenu?: () => void;
    isOpen?: boolean;
    tooltipContent?: PopoverContent;
}
export interface TooltipWrapperState {
    isOpenInternal: boolean;
}
export declare class WrapInTooltip extends PureComponent<TooltipWrapperProps, TooltipWrapperState> {
    state: TooltipWrapperState;
    onOpenMenu: () => void;
    onCloseMenu: () => void;
    render(): React.JSX.Element;
}
export default Select;
