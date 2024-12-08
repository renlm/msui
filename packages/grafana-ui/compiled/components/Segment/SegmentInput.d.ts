import React, { HTMLProps } from 'react';
import { SegmentProps } from './types';
export interface SegmentInputProps extends Omit<SegmentProps, 'allowCustomValue' | 'allowEmptyValue'>, Omit<HTMLProps<HTMLInputElement>, 'value' | 'onChange'> {
    value: string | number;
    onChange: (text: string | number) => void;
}
export declare function SegmentInput({ value: initialValue, onChange, Component, className, placeholder, inputPlaceholder, disabled, autofocus, onExpandedChange, ...rest }: React.PropsWithChildren<SegmentInputProps>): React.JSX.Element;
