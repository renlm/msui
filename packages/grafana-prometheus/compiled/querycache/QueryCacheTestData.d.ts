/**
 *
 * @param length - Number of values to add
 * @param start - First timestamp (ms)
 * @param step - step duration (ms)
 */
export declare const getMockTimeFrameArray: (length: number, start: number, step: number) => number[];
/**
 * @param length - number of "Values" to add
 * @param values
 * @param high
 */
export declare const getMockValueFrameArray: (length: number, values?: number) => number[];
export declare const IncrementalStorageDataFrameScenarios: {
    histogram: {
        evictionRequests: {
            first: {
                request: {
                    range: {
                        from: string;
                        to: string;
                        raw: {
                            from: string;
                            to: string;
                        };
                    };
                    interval: string;
                    intervalMs: number;
                    targets: {
                        datasource: {
                            type: string;
                            uid: string;
                        };
                        editorMode: string;
                        exemplar: boolean;
                        expr: string;
                        format: string;
                        legendFormat: string;
                        range: boolean;
                        refId: string;
                        requestId: string;
                        utcOffsetSec: number;
                    }[];
                    maxDataPoints: number;
                    scopedVars: {
                        __interval: {
                            text: string;
                            value: string;
                        };
                        __interval_ms: {
                            text: string;
                            value: number;
                        };
                    };
                    startTime: number;
                    rangeRaw: {
                        from: string;
                        to: string;
                    };
                };
                dataFrames: {
                    name: string;
                    refId: string;
                    meta: {
                        type: string;
                        custom: {
                            resultType: string;
                        };
                        executedQueryString: string;
                    };
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                }[];
            };
            second: {
                request: {
                    range: {
                        from: string;
                        to: string;
                        raw: {
                            from: string;
                            to: string;
                        };
                    };
                    interval: string;
                    intervalMs: number;
                    targets: {
                        datasource: {
                            type: string;
                        };
                        editorMode: string;
                        exemplar: boolean;
                        expr: string;
                        format: string;
                        legendFormat: string;
                        range: boolean;
                        refId: string;
                        requestId: string;
                        utcOffsetSec: number;
                    }[];
                    maxDataPoints: number;
                    scopedVars: {
                        __interval: {
                            text: string;
                            value: string;
                        };
                        __interval_ms: {
                            text: string;
                            value: number;
                        };
                    };
                    startTime: number;
                    rangeRaw: {
                        from: string;
                        to: string;
                    };
                };
                dataFrames: {
                    name: string;
                    refId: string;
                    meta: {
                        type: string;
                        custom: {
                            resultType: string;
                        };
                        executedQueryString: string;
                    };
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                }[];
            };
            third: {
                request: {
                    range: {
                        from: string;
                        to: string;
                        raw: {
                            from: string;
                            to: string;
                        };
                    };
                    interval: string;
                    intervalMs: number;
                    targets: {
                        datasource: {
                            type: string;
                        };
                        editorMode: string;
                        exemplar: boolean;
                        expr: string;
                        format: string;
                        legendFormat: string;
                        range: boolean;
                        refId: string;
                        requestId: string;
                        utcOffsetSec: number;
                    }[];
                    maxDataPoints: number;
                    scopedVars: {
                        __interval: {
                            text: string;
                            value: string;
                        };
                        __interval_ms: {
                            text: string;
                            value: number;
                        };
                    };
                    startTime: number;
                    rangeRaw: {
                        from: string;
                        to: string;
                    };
                };
                dataFrames: {
                    name: string;
                    refId: string;
                    meta: {
                        type: string;
                        custom: {
                            resultType: string;
                        };
                        executedQueryString: string;
                    };
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                }[];
            };
        };
        getSeriesWithGapAtEnd: (countOfSeries?: number) => {
            first: {
                request: {
                    app: string;
                    requestId: string;
                    panelId: number;
                    dashboardId: number;
                    dashboardUID: string;
                    range: {
                        from: string;
                        to: string;
                        raw: {
                            from: string;
                            to: string;
                        };
                    };
                    interval: string;
                    intervalMs: number;
                    targets: {
                        datasource: {
                            type: string;
                            uid: string;
                        };
                        editorMode: string;
                        expr: string;
                        legendFormat: string;
                        range: boolean;
                        refId: string;
                        exemplar: boolean;
                        requestId: string;
                        utcOffsetSec: number;
                    }[];
                    startTime: number;
                    rangeRaw: {
                        from: string;
                        to: string;
                    };
                };
                dataFrames: ({
                    name: string;
                    refId: string;
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                            __name__: string;
                            cluster: string;
                            container: string;
                            instance: string;
                            job: string;
                            method: string;
                            namespace: string;
                            pod: string;
                            route: string;
                            status_code: string;
                            ws: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                    meta?: undefined;
                } | {
                    name: string;
                    refId: string;
                    meta: {
                        type: string;
                        custom: {
                            resultType: string;
                        };
                        executedQueryString: string;
                        preferredVisualisationType: string;
                    };
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                            __name__: string;
                            cluster: string;
                            container: string;
                            instance: string;
                            job: string;
                            method: string;
                            namespace: string;
                            pod: string;
                            route: string;
                            status_code: string;
                            ws: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                })[];
                originalRange: undefined;
                timeSrv: {
                    from: string;
                    to: string;
                };
            };
            second: {
                request: {
                    app: string;
                    requestId: string;
                    timezone: string;
                    panelId: number;
                    dashboardId: number;
                    dashboardUID: string;
                    publicDashboardAccessToken: string;
                    range: {
                        from: string;
                        to: string;
                        raw: {
                            from: string;
                            to: string;
                        };
                    };
                    timeInfo: string;
                    interval: string;
                    intervalMs: number;
                    targets: {
                        datasource: {
                            type: string;
                            uid: string;
                        };
                        editorMode: string;
                        expr: string;
                        legendFormat: string;
                        range: boolean;
                        refId: string;
                        exemplar: boolean;
                        requestId: string;
                        utcOffsetSec: number;
                    }[];
                    maxDataPoints: number;
                    scopedVars: {
                        __interval: {
                            text: string;
                            value: string;
                        };
                        __interval_ms: {
                            text: string;
                            value: number;
                        };
                    };
                    startTime: number;
                    rangeRaw: {
                        from: string;
                        to: string;
                    };
                };
                dataFrames: {
                    name: string;
                    refId: string;
                    meta: {
                        type: string;
                        custom: {
                            resultType: string;
                        };
                        executedQueryString: string;
                        preferredVisualisationType: string;
                    };
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                            __name__: string;
                            cluster: string;
                            container: string;
                            instance: string;
                            job: string;
                            method: string;
                            namespace: string;
                            pod: string;
                            route: string;
                            status_code: string;
                            ws: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                }[];
                originalRange: {
                    end: number;
                    start: number;
                };
                timeSrv: {
                    from: string;
                    to: string;
                };
            };
        };
        getSeriesWithGapAtStart: (countOfSeries?: number) => {
            first: {
                request: {
                    app: string;
                    requestId: string;
                    panelId: number;
                    dashboardId: number;
                    dashboardUID: string;
                    range: {
                        from: string;
                        to: string;
                        raw: {
                            from: string;
                            to: string;
                        };
                    };
                    interval: string;
                    intervalMs: number;
                    targets: {
                        datasource: {
                            type: string;
                            uid: string;
                        };
                        editorMode: string;
                        expr: string;
                        legendFormat: string;
                        range: boolean;
                        refId: string;
                        exemplar: boolean;
                        requestId: string;
                        utcOffsetSec: number;
                    }[];
                    startTime: number;
                    rangeRaw: {
                        from: string;
                        to: string;
                    };
                };
                dataFrames: ({
                    name: string;
                    refId: string;
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                            __name__: string;
                            cluster: string;
                            container: string;
                            instance: string;
                            job: string;
                            method: string;
                            namespace: string;
                            pod: string;
                            route: string;
                            status_code: string;
                            ws: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                    meta?: undefined;
                } | {
                    name: string;
                    refId: string;
                    meta: {
                        type: string;
                        custom: {
                            resultType: string;
                        };
                        executedQueryString: string;
                        preferredVisualisationType: string;
                    };
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                            __name__: string;
                            cluster: string;
                            container: string;
                            instance: string;
                            job: string;
                            method: string;
                            namespace: string;
                            pod: string;
                            route: string;
                            status_code: string;
                            ws: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                })[];
                originalRange: undefined;
                timeSrv: {
                    from: string;
                    to: string;
                };
            };
            second: {
                request: {
                    app: string;
                    requestId: string;
                    timezone: string;
                    panelId: number;
                    dashboardId: number;
                    dashboardUID: string;
                    publicDashboardAccessToken: string;
                    range: {
                        from: string;
                        to: string;
                        raw: {
                            from: string;
                            to: string;
                        };
                    };
                    timeInfo: string;
                    interval: string;
                    intervalMs: number;
                    targets: {
                        datasource: {
                            type: string;
                            uid: string;
                        };
                        editorMode: string;
                        expr: string;
                        legendFormat: string;
                        range: boolean;
                        refId: string;
                        exemplar: boolean;
                        requestId: string;
                        utcOffsetSec: number;
                    }[];
                    maxDataPoints: number;
                    scopedVars: {
                        __interval: {
                            text: string;
                            value: string;
                        };
                        __interval_ms: {
                            text: string;
                            value: number;
                        };
                    };
                    startTime: number;
                    rangeRaw: {
                        from: string;
                        to: string;
                    };
                };
                dataFrames: {
                    name: string;
                    refId: string;
                    meta: {
                        type: string;
                        custom: {
                            resultType: string;
                        };
                        executedQueryString: string;
                        preferredVisualisationType: string;
                    };
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                            __name__: string;
                            cluster: string;
                            container: string;
                            instance: string;
                            job: string;
                            method: string;
                            namespace: string;
                            pod: string;
                            route: string;
                            status_code: string;
                            ws: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                }[];
                originalRange: {
                    end: number;
                    start: number;
                };
                timeSrv: {
                    from: string;
                    to: string;
                };
            };
        };
        getSeriesWithGapInMiddle: (countOfSeries?: number) => {
            first: {
                request: {
                    app: string;
                    requestId: string;
                    panelId: number;
                    dashboardId: number;
                    dashboardUID: string;
                    range: {
                        from: string;
                        to: string;
                        raw: {
                            from: string;
                            to: string;
                        };
                    };
                    interval: string;
                    intervalMs: number;
                    targets: {
                        datasource: {
                            type: string;
                            uid: string;
                        };
                        editorMode: string;
                        expr: string;
                        legendFormat: string;
                        range: boolean;
                        refId: string;
                        exemplar: boolean;
                        requestId: string;
                        utcOffsetSec: number;
                    }[];
                    startTime: number;
                    rangeRaw: {
                        from: string;
                        to: string;
                    };
                };
                dataFrames: ({
                    name: string;
                    refId: string;
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                            __name__: string;
                            cluster: string;
                            container: string;
                            instance: string;
                            job: string;
                            method: string;
                            namespace: string;
                            pod: string;
                            route: string;
                            status_code: string;
                            ws: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                    meta?: undefined;
                } | {
                    name: string;
                    refId: string;
                    meta: {
                        type: string;
                        custom: {
                            resultType: string;
                        };
                        executedQueryString: string;
                        preferredVisualisationType: string;
                    };
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                            __name__: string;
                            cluster: string;
                            container: string;
                            instance: string;
                            job: string;
                            method: string;
                            namespace: string;
                            pod: string;
                            route: string;
                            status_code: string;
                            ws: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                })[];
                originalRange: undefined;
                timeSrv: {
                    from: string;
                    to: string;
                };
            };
            second: {
                request: {
                    app: string;
                    requestId: string;
                    timezone: string;
                    panelId: number;
                    dashboardId: number;
                    dashboardUID: string;
                    publicDashboardAccessToken: string;
                    range: {
                        from: string;
                        to: string;
                        raw: {
                            from: string;
                            to: string;
                        };
                    };
                    timeInfo: string;
                    interval: string;
                    intervalMs: number;
                    targets: {
                        datasource: {
                            type: string;
                            uid: string;
                        };
                        editorMode: string;
                        expr: string;
                        legendFormat: string;
                        range: boolean;
                        refId: string;
                        exemplar: boolean;
                        requestId: string;
                        utcOffsetSec: number;
                    }[];
                    maxDataPoints: number;
                    scopedVars: {
                        __interval: {
                            text: string;
                            value: string;
                        };
                        __interval_ms: {
                            text: string;
                            value: number;
                        };
                    };
                    startTime: number;
                    rangeRaw: {
                        from: string;
                        to: string;
                    };
                };
                dataFrames: {
                    name: string;
                    refId: string;
                    meta: {
                        type: string;
                        custom: {
                            resultType: string;
                        };
                        executedQueryString: string;
                        preferredVisualisationType: string;
                    };
                    fields: ({
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        config: {
                            interval: number;
                            displayNameFromDS?: undefined;
                        };
                        values: number[];
                        entities: {};
                        labels?: undefined;
                    } | {
                        name: string;
                        type: string;
                        typeInfo: {
                            frame: string;
                        };
                        labels: {
                            le: string;
                            __name__: string;
                            cluster: string;
                            container: string;
                            instance: string;
                            job: string;
                            method: string;
                            namespace: string;
                            pod: string;
                            route: string;
                            status_code: string;
                            ws: string;
                        };
                        config: {
                            displayNameFromDS: string;
                            interval?: undefined;
                        };
                        values: number[];
                        entities: {};
                    })[];
                    length: number;
                }[];
                originalRange: {
                    end: number;
                    start: number;
                };
                timeSrv: {
                    from: string;
                    to: string;
                };
            };
        };
    };
};
