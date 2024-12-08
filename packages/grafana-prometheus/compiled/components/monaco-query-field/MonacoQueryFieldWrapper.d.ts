import React from 'react';
import { Props as MonacoProps } from './MonacoQueryFieldProps';
type Props = Omit<MonacoProps, 'onRunQuery' | 'onBlur'> & {
    onChange: (query: string) => void;
    onRunQuery: () => void;
};
export declare const MonacoQueryFieldWrapper: (props: Props) => React.JSX.Element;
export {};
