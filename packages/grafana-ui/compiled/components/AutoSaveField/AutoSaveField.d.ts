import React from 'react';
import { FieldProps } from '../Forms/Field';
export interface Props<T = string> extends Omit<FieldProps, 'children'> {
    /** Saving request that will be triggered 600ms after changing the value */
    onFinishChange: (inputValue: T) => Promise<void>;
    /** Custom error message to display on saving */
    saveErrorMessage?: string;
    /** Input that will save its value on change  */
    children: (onChange: (newValue: T) => void) => React.ReactElement;
}
export declare function AutoSaveField<T = string>(props: Props<T>): React.JSX.Element;
export declare namespace AutoSaveField {
    var displayName: string;
}
