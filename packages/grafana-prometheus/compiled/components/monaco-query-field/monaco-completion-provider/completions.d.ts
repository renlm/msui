import { DataProvider } from './data_provider';
import type { Situation } from './situation';
export type CompletionType = 'HISTORY' | 'FUNCTION' | 'METRIC_NAME' | 'DURATION' | 'LABEL_NAME' | 'LABEL_VALUE';
type Completion = {
    type: CompletionType;
    label: string;
    insertText: string;
    detail?: string;
    documentation?: string;
    triggerOnInsert?: boolean;
};
export declare function getCompletions(situation: Situation, dataProvider: DataProvider): Promise<Completion[]>;
export {};
