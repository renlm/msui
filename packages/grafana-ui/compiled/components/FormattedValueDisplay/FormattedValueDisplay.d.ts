import React, { CSSProperties, HTMLProps } from 'react';
import { FormattedValue } from '@grafana/data';
export interface Props extends Omit<HTMLProps<HTMLDivElement>, 'className' | 'value' | 'style'> {
    value: FormattedValue;
    className?: string;
    style?: CSSProperties;
}
export declare const FormattedValueDisplay: {
    ({ value, className, style, ...htmlProps }: Props): React.JSX.Element;
    displayName: string;
};
