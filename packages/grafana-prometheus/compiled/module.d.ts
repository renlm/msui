import { DataSourcePlugin } from '@grafana/data';
import { PrometheusDatasource } from './datasource';
export declare const plugin: DataSourcePlugin<PrometheusDatasource, import("./types").PromQuery, import("./types").PromOptions, {}>;
