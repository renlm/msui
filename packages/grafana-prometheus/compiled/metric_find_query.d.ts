import { MetricFindValue, TimeRange } from '@grafana/data';
import { PrometheusDatasource } from './datasource';
export declare class PrometheusMetricFindQuery {
    private datasource;
    private query;
    range: TimeRange;
    constructor(datasource: PrometheusDatasource, query: string);
    process(timeRange: TimeRange): Promise<MetricFindValue[]>;
    labelValuesQuery(label: string, metric?: string): Promise<{
        text: any;
    }[]>;
    metricNameQuery(metricFilterPattern: string): Promise<{
        text: any;
        expandable: boolean;
    }[]>;
    queryResultQuery(query: string): Promise<{
        text: any;
        expandable: boolean;
    }[]>;
    metricNameAndLabelsQuery(query: string): Promise<MetricFindValue[]>;
}
