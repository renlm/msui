import React from 'react';
import { Themeable2 } from '../../types';
export interface CascaderProps extends Themeable2 {
    /** The separator between levels in the search */
    separator?: string;
    placeholder?: string;
    /** As the onSelect handler reports only the leaf node selected, the leaf nodes should have unique value. */
    options: CascaderOption[];
    /** Changes the value for every selection, including branch nodes. Defaults to true. */
    changeOnSelect?: boolean;
    onSelect(val: string): void;
    /** Sets the width to a multiple of 8px. Should only be used with inline forms. Setting width of the container is preferred in other cases.*/
    width?: number;
    /** Single string that needs to be the same as value of the last item in the selection chain. */
    initialValue?: string;
    allowCustomValue?: boolean;
    /** A function for formatting the message for custom value creation. Only applies when allowCustomValue is set to true*/
    formatCreateLabel?: (val: string) => string;
    /** If true all levels are shown in the input by simple concatenating the labels */
    displayAllSelectedLevels?: boolean;
    onBlur?: () => void;
    /** When mounted focus automatically on the input */
    autoFocus?: boolean;
    /** Keep the dropdown open all the time, useful in case whole cascader visibility is controlled by the parent */
    alwaysOpen?: boolean;
    /** Don't show what is selected in the cascader input/search. Useful when input is used just as search and the
        cascader is hidden after selection. */
    hideActiveLevelLabel?: boolean;
    disabled?: boolean;
    /** ID for the underlying Select/Cascader component */
    id?: string;
    /** Whether you can clear the selected value or not */
    isClearable?: boolean;
}
export interface CascaderOption {
    /**
     *  The value used under the hood
     */
    value: string;
    /**
     *  The label to display in the UI
     */
    label: string;
    /** Items will be just flattened into the main list of items recursively. */
    items?: CascaderOption[];
    disabled?: boolean;
    /** Avoid using */
    title?: string;
    /**  Children will be shown in a submenu. Use 'items' instead, as 'children' exist to ensure backwards compatibility.*/
    children?: CascaderOption[];
}
export declare const Cascader: React.FunctionComponent<{
    width?: number | undefined;
    options: CascaderOption[];
    id?: string | undefined;
    disabled?: boolean | undefined;
    onBlur?: (() => void) | undefined;
    onSelect: (val: string) => void;
    separator?: string | undefined;
    placeholder?: string | undefined;
    autoFocus?: boolean | undefined;
    allowCustomValue?: boolean | undefined;
    formatCreateLabel?: ((val: string) => string) | undefined;
    isClearable?: boolean | undefined;
    changeOnSelect?: boolean | undefined;
    initialValue?: string | undefined;
    displayAllSelectedLevels?: boolean | undefined;
    alwaysOpen?: boolean | undefined;
    hideActiveLevelLabel?: boolean | undefined;
}>;
