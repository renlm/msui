import React from 'react';
import { FieldValueMatcherConfig } from '@grafana/data';
import { ComparisonOperation } from '@grafana/schema';
import { MatcherUIProps, FieldMatcherUIRegistryItem } from './types';
type Props = MatcherUIProps<FieldValueMatcherConfig>;
export declare const comparisonOperationOptions: {
    label: string;
    value: ComparisonOperation;
}[];
export declare const FieldValueMatcherEditor: ({ options, onChange }: Props) => React.JSX.Element;
export declare const fieldValueMatcherItem: FieldMatcherUIRegistryItem<FieldValueMatcherConfig>;
export {};
