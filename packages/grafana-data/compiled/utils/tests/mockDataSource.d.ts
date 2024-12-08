import { Observable } from 'rxjs';
import { DataQuery, DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings, DataSourceJsonData, DataSourcePluginMeta, TestDataSourceResponse } from '../../types';
export interface TestQuery extends DataQuery {
    query: string;
}
export interface TestJsonData extends DataSourceJsonData {
    url?: string;
}
export declare const meta: DataSourcePluginMeta<DataSourceJsonData>;
export declare const TestDataSettings: DataSourceInstanceSettings<TestJsonData>;
export declare class TestDataSource extends DataSourceApi<TestQuery, DataSourceJsonData> {
    query(request: DataQueryRequest<TestQuery>): Promise<DataQueryResponse> | Observable<DataQueryResponse>;
    testDatasource(): Promise<TestDataSourceResponse>;
    constructor(instanceSettings?: DataSourceInstanceSettings<TestJsonData>);
}
