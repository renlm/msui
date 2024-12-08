import { DataSourceInstanceSettings, PluginMeta } from '@grafana/data';
export type PluginEventProperties = {
    grafana_version: string;
    plugin_type: string;
    plugin_version: string;
    plugin_id: string;
    plugin_name: string;
};
export declare function createPluginEventProperties(meta: PluginMeta): PluginEventProperties;
export type DataSourcePluginEventProperties = PluginEventProperties & {
    datasource_uid: string;
};
export declare function createDataSourcePluginEventProperties(instanceSettings: DataSourceInstanceSettings): DataSourcePluginEventProperties;
