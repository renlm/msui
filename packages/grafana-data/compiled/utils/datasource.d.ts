import { DataSourcePluginOptionsEditorProps, SelectableValue, KeyValue, DataSourceSettings, DataSourceInstanceSettings, DataSourceRef, DataSourceJsonData } from '../types';
/**
 * Convert instance settings to a reference
 *
 * @public
 */
export declare function getDataSourceRef(ds: DataSourceInstanceSettings): DataSourceRef;
/**
 * Returns true if the argument is a DataSourceRef
 *
 * @public
 */
export declare function isDataSourceRef(ref: DataSourceRef | string | null | undefined): ref is DataSourceRef;
/**
 * Get the UID from a string of reference
 *
 * @public
 */
export declare function getDataSourceUID(ref: DataSourceRef | string | null): string | undefined;
export declare const onUpdateDatasourceOption: (props: DataSourcePluginOptionsEditorProps, key: keyof DataSourceSettings) => (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => void;
export declare const onUpdateDatasourceJsonDataOption: <J extends DataSourceJsonData, S, K extends keyof J>(props: DataSourcePluginOptionsEditorProps<J, S>, key: K) => (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => void;
export declare const onUpdateDatasourceSecureJsonDataOption: <J extends DataSourceJsonData, S extends {} = KeyValue>(props: DataSourcePluginOptionsEditorProps<J, S>, key: string) => (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
export declare const onUpdateDatasourceJsonDataOptionSelect: <J extends DataSourceJsonData, S, K extends keyof J>(props: DataSourcePluginOptionsEditorProps<J, S>, key: K) => (selected: SelectableValue) => void;
export declare const onUpdateDatasourceJsonDataOptionChecked: <J extends DataSourceJsonData, S, K extends keyof J>(props: DataSourcePluginOptionsEditorProps<J, S>, key: K) => (event: React.SyntheticEvent<HTMLInputElement>) => void;
export declare const onUpdateDatasourceSecureJsonDataOptionSelect: <J extends DataSourceJsonData, S extends {} = KeyValue>(props: DataSourcePluginOptionsEditorProps<J, S>, key: string) => (selected: SelectableValue) => void;
export declare const onUpdateDatasourceResetOption: (props: DataSourcePluginOptionsEditorProps, key: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
export declare function updateDatasourcePluginOption<J extends DataSourceJsonData, S extends {} = KeyValue>(props: DataSourcePluginOptionsEditorProps<J, S>, key: keyof DataSourceSettings, val: unknown): void;
export declare const updateDatasourcePluginJsonDataOption: <J extends DataSourceJsonData, S, K extends keyof J>(props: DataSourcePluginOptionsEditorProps<J, S>, key: K, val: unknown) => void;
export declare const updateDatasourcePluginSecureJsonDataOption: <J extends DataSourceJsonData, S extends {} = KeyValue>(props: DataSourcePluginOptionsEditorProps<J, S>, key: string, val: unknown) => void;
export declare const updateDatasourcePluginResetOption: <J extends DataSourceJsonData, S extends {} = KeyValue>(props: DataSourcePluginOptionsEditorProps<J, S>, key: string) => void;
