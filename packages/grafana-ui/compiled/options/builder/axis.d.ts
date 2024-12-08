import React from 'react';
import { FieldConfigEditorBuilder, StandardEditorProps } from '@grafana/data';
import { AxisConfig, ScaleDistributionConfig } from '@grafana/schema';
/**
 * @alpha
 */
export declare function addAxisConfig(builder: FieldConfigEditorBuilder<AxisConfig>, defaultConfig: AxisConfig, hideScale?: boolean): void;
/**
 * @internal
 */
export declare const ScaleDistributionEditor: ({ value, onChange }: StandardEditorProps<ScaleDistributionConfig>) => React.JSX.Element;
