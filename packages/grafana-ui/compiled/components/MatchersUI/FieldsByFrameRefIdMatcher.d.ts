import React from 'react';
import { DataFrame } from '@grafana/data';
import { FieldMatcherUIRegistryItem } from './types';
export interface Props {
    value?: string;
    data: DataFrame[];
    onChange: (value: string) => void;
    placeholder?: string;
}
export declare function RefIDPicker({ value, data, onChange, placeholder }: Props): React.JSX.Element;
/**
 * Registry item for UI to configure "fields by frame refId"-matcher.
 * @public
 */
export declare const fieldsByFrameRefIdItem: FieldMatcherUIRegistryItem<string>;
