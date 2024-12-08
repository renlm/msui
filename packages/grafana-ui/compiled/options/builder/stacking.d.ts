import React from 'react';
import { FieldConfigEditorBuilder, StandardEditorProps, SelectableValue } from '@grafana/data';
import { GraphFieldConfig, StackingConfig, StackingMode } from '@grafana/schema';
export declare const StackingEditor: ({ value, context, onChange, item, }: StandardEditorProps<StackingConfig, {
    options: Array<SelectableValue<StackingMode>>;
}>) => React.JSX.Element;
export declare function addStackingConfig(builder: FieldConfigEditorBuilder<GraphFieldConfig>, defaultConfig?: StackingConfig, category?: string[]): void;
