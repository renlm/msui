import React from 'react';
import { SelectableValue } from '@grafana/data';
import { PromQueryEditorProps } from '../../components/types';
import { PromQueryFormat } from '../../dataquery';
export declare const FORMAT_OPTIONS: Array<SelectableValue<PromQueryFormat>>;
export declare const INTERVAL_FACTOR_OPTIONS: Array<SelectableValue<number>>;
export declare const PromQueryEditorSelector: React.NamedExoticComponent<PromQueryEditorProps>;
