import { DataQueryRequest, TimeRange } from '@grafana/data';
import { PromQuery } from '../types';
export declare function createDataRequest(targets: PromQuery[], overrides?: Partial<DataQueryRequest>): DataQueryRequest<PromQuery>;
export declare function createDefaultPromResponse(): {
    data: {
        data: {
            result: {
                metric: {
                    __name__: string;
                };
                values: number[][];
            }[];
            resultType: string;
        };
    };
};
export declare function createAnnotationResponse(): {
    data: {
        results: {
            X: {
                frames: {
                    schema: {
                        name: string;
                        refId: string;
                        fields: ({
                            name: string;
                            type: string;
                            typeInfo: {
                                frame: string;
                            };
                            labels?: undefined;
                        } | {
                            name: string;
                            type: string;
                            typeInfo: {
                                frame: string;
                            };
                            labels: {
                                __name__: string;
                                alertname: string;
                                alertstate: string;
                                instance: string;
                                job: string;
                            };
                        })[];
                    };
                    data: {
                        values: number[][];
                    };
                }[];
            };
        };
    };
};
export declare function createEmptyAnnotationResponse(): {
    data: {
        results: {
            X: {
                frames: {
                    schema: {
                        name: string;
                        refId: string;
                        fields: never[];
                    };
                    data: {
                        values: never[];
                    };
                }[];
            };
        };
    };
};
export declare function getMockTimeRange(range?: string): TimeRange;
export declare function fetchMockCalledWith(fetchMock: ReturnType<typeof jest.fn>): PromQuery[];
