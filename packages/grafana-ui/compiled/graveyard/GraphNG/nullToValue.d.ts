import { DataFrame } from '@grafana/data';
/** @deprecated */
export declare function nullToValue(frame: DataFrame): {
    fields: import("@grafana/data").Field<any>[];
    name?: string | undefined;
    length: number;
    refId?: string | undefined;
    meta?: import("@grafana/data").QueryResultMeta | undefined;
};
