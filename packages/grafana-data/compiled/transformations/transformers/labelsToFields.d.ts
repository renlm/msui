import { SynchronousDataTransformerInfo } from '../../types';
export declare enum LabelsToFieldsMode {
    Columns = "columns",// default mode
    Rows = "rows"
}
export interface LabelsToFieldsOptions {
    mode?: LabelsToFieldsMode;
    /** When empty, this will keep all labels, otherwise it will keep only labels matching the value */
    keepLabels?: string[];
    /**
     * When in column mode and if set this will use this label's value as the value field name.
     */
    valueLabel?: string;
}
export declare const labelsToFieldsTransformer: SynchronousDataTransformerInfo<LabelsToFieldsOptions>;
