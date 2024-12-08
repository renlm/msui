import React from 'react';
import { DataSourceSettings } from '@grafana/data';
import { PromOptions } from '../types';
export type DataSourceHttpSettingsProps = {
    options: DataSourceSettings<PromOptions, {}>;
    onOptionsChange: (options: DataSourceSettings<PromOptions, {}>) => void;
    secureSocksDSProxyEnabled: boolean;
};
export declare const DataSourceHttpSettingsOverhaul: (props: DataSourceHttpSettingsProps) => React.JSX.Element;
