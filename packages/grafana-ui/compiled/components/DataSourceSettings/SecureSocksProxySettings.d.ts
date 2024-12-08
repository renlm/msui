/// <reference types="react" />
import { DataSourceJsonData, DataSourcePluginOptionsEditorProps } from '@grafana/data';
export interface Props<T extends DataSourceJsonData> extends Pick<DataSourcePluginOptionsEditorProps<T>, 'options' | 'onOptionsChange'> {
}
export interface SecureSocksProxyConfig extends DataSourceJsonData {
    enableSecureSocksProxy?: boolean;
}
export declare function SecureSocksProxySettings<T extends SecureSocksProxyConfig>({ options, onOptionsChange, }: Props<T>): JSX.Element;
