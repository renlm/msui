/// <reference types="jest" />
export declare class EmptyLanguageProviderMock {
    metrics: never[];
    constructor();
    start(): Promise<unknown>;
    getLabelKeys: jest.Mock<any, any, any>;
    getLabelValues: jest.Mock<any, any, any>;
    getSeries: jest.Mock<any, any, any>;
    fetchSeries: jest.Mock<any, any, any>;
    fetchSeriesLabels: jest.Mock<any, any, any>;
    fetchSeriesLabelsMatch: jest.Mock<any, any, any>;
    fetchLabelsWithMatch: jest.Mock<any, any, any>;
    fetchLabels: jest.Mock<any, any, any>;
    loadMetricsMetadata: jest.Mock<any, any, any>;
}
