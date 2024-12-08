/// <reference types="react" />
/**
 * Used in select elements
 */
export interface SelectableValue<T = any> {
    label?: string;
    ariaLabel?: string;
    value?: T;
    imgUrl?: string;
    icon?: string;
    description?: string;
    title?: string;
    component?: React.ComponentType;
    isDisabled?: boolean;
    [key: string]: any;
}
