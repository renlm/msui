/// <reference types="react" />
import { DataSourceJsonData, DataSourcePluginOptionsEditorProps } from '@grafana/data';
export interface Props<T extends DataSourceJsonData> extends Pick<DataSourcePluginOptionsEditorProps<T>, 'options' | 'onOptionsChange'> {
}
export interface AlertingConfig extends DataSourceJsonData {
    manageAlerts?: boolean;
}
export declare function AlertingSettings<T extends AlertingConfig>({ options, onOptionsChange }: Props<T>): JSX.Element;
