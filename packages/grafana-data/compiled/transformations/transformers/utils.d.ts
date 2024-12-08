import { BootData, DataFrame } from '../../types';
declare global {
    interface Window {
        grafanaBootData?: BootData;
    }
}
export declare const transformationsVariableSupport: () => boolean | undefined;
/**
 * Retrieve the maximum number of fields in a series of a dataframe.
 */
export declare function findMaxFields(data: DataFrame[]): number;
