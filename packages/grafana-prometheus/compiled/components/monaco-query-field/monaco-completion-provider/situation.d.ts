type LabelOperator = '=' | '!=' | '=~' | '!~';
export type Label = {
    name: string;
    value: string;
    op: LabelOperator;
};
export type Situation = {
    type: 'IN_FUNCTION';
} | {
    type: 'AT_ROOT';
} | {
    type: 'EMPTY';
} | {
    type: 'IN_DURATION';
} | {
    type: 'IN_LABEL_SELECTOR_NO_LABEL_NAME';
    metricName?: string;
    otherLabels: Label[];
} | {
    type: 'IN_GROUPING';
    metricName: string;
    otherLabels: Label[];
} | {
    type: 'IN_LABEL_SELECTOR_WITH_LABEL_NAME';
    metricName?: string;
    labelName: string;
    betweenQuotes: boolean;
    otherLabels: Label[];
};
export declare function getSituation(text: string, pos: number): Situation | null;
export {};
