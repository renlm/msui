import { DataFrame, Field, TimeSeries, FieldType, TableData, DataFrameDTO, DataQueryResponseData, PanelData, DataFrameWithValue } from '../types/index';
/**
 * Given a name and value, this will pick a reasonable field type
 */
export declare function guessFieldTypeFromNameAndValue(name: string, v: unknown): FieldType;
/**
 * Check the field type to see what the contents are
 */
export declare function getFieldTypeFromValue(v: unknown): FieldType;
/**
 * Given a value this will guess the best column type
 *
 * NOTE: this is will try to see if string values can be mapped to other types (like number)
 */
export declare function guessFieldTypeFromValue(v: unknown): FieldType;
/**
 * Looks at the data to guess the column type.  This ignores any existing setting
 */
export declare function guessFieldTypeForField(field: Field): FieldType | undefined;
/**
 * @returns A copy of the series with the best guess for each field type.
 * If the series already has field types defined, they will be used, unless `guessDefined` is true.
 * @param series The DataFrame whose field's types should be guessed
 * @param guessDefined Whether to guess types of fields with already defined types
 */
export declare const guessFieldTypes: (series: DataFrame, guessDefined?: boolean) => DataFrame;
export declare const isTableData: (data: unknown) => data is DataFrame;
export declare const isDataFrame: (data: unknown) => data is DataFrame;
export declare const isDataFrameWithValue: (data: unknown) => data is DataFrameWithValue;
/**
 * Inspect any object and return the results as a DataFrame
 */
export declare function toDataFrame(data: any): DataFrame;
export declare const toLegacyResponseData: (frame: DataFrame) => TimeSeries | TableData;
export declare function sortDataFrame(data: DataFrame, sortIndex?: number, reverse?: boolean): DataFrame;
/**
 * Returns a copy with all values reversed
 */
export declare function reverseDataFrame(data: DataFrame): DataFrame;
/**
 * Wrapper to get an array from each field value
 */
export declare function getDataFrameRow(data: DataFrame, row: number): unknown[];
/**
 * Returns a copy that does not include functions
 */
export declare function toDataFrameDTO(data: DataFrame): DataFrameDTO;
export declare function toFilteredDataFrameDTO(data: DataFrame, fieldPredicate?: (f: Field) => boolean): DataFrameDTO;
export declare const getTimeField: (series: DataFrame) => {
    timeField?: Field;
    timeIndex?: number;
};
/**
 * Given data request results, will return data frames with field types set
 *
 * This is also used by PanelChrome for snapshot support
 */
export declare function getProcessedDataFrames(results?: DataQueryResponseData[]): DataFrame[];
/**
 * Will process the panel data frames and in case of loading state with no data, will return the last result data but with loading state
 * This is to have panels not flicker temporarily with "no data" while loading
 */
export declare function preProcessPanelData(data: PanelData, lastResult?: PanelData): PanelData;
export interface PartialDataFrame extends Omit<DataFrame, 'fields' | 'length'> {
    fields: Array<Partial<Field>>;
}
export declare function createDataFrame(input: PartialDataFrame): DataFrame;
