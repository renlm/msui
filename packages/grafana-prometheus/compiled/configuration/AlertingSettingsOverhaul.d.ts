/// <reference types="react" />
import { DataSourceJsonData, DataSourcePluginOptionsEditorProps } from '@grafana/data';
interface Props<T extends DataSourceJsonData> extends Pick<DataSourcePluginOptionsEditorProps<T>, 'options' | 'onOptionsChange'> {
}
interface AlertingConfig extends DataSourceJsonData {
    manageAlerts?: boolean;
}
export declare function AlertingSettingsOverhaul<T extends AlertingConfig>({ options, onOptionsChange, }: Props<T>): JSX.Element;
export {};
