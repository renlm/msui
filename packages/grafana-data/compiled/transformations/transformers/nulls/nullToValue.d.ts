import { DataFrame, Field } from '../../../types';
export declare function nullToValue(frame: DataFrame): {
    fields: Field<any>[];
    name?: string | undefined;
    length: number;
    refId?: string | undefined;
    meta?: import("../../../types").QueryResultMeta | undefined;
};
export declare function nullToValueField(field: Field, noValue: number): {
    values: any[];
    name: string;
    type: import("../../../types").FieldType;
    config: import("../../../types").FieldConfig<any>;
    nanos?: number[] | undefined;
    labels?: import("../../../types").Labels | undefined;
    state?: import("../../../types").FieldState | null | undefined;
    display?: import("../../../types").DisplayProcessor | undefined;
    getLinks?: ((config: import("../../../types").ValueLinkConfig) => import("../../../types").LinkModel<Field<any>>[]) | undefined;
};
