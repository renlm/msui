/// <reference types="react" />
import { Observable } from 'rxjs';
import { CustomVariableSupport, DataQueryRequest, DataQueryResponse } from '@grafana/data';
import { TemplateSrv } from '@grafana/runtime';
import { PrometheusDatasource } from './datasource';
import { PromVariableQuery } from './types';
export declare class PrometheusVariableSupport extends CustomVariableSupport<PrometheusDatasource> {
    private readonly datasource;
    private readonly templateSrv;
    constructor(datasource: PrometheusDatasource, templateSrv?: TemplateSrv);
    editor: ({ onChange, query, datasource, range }: import("./components/VariableQueryEditor").Props) => import("react").JSX.Element;
    query(request: DataQueryRequest<PromVariableQuery>): Observable<DataQueryResponse>;
}
