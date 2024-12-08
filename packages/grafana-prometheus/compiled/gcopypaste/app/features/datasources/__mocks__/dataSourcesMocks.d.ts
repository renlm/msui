import { DataSourceJsonData, DataSourceSettings } from '@grafana/data';
export declare const getMockDataSource: <T extends DataSourceJsonData>(overrides?: Partial<DataSourceSettings<T>>) => DataSourceSettings<T>;
