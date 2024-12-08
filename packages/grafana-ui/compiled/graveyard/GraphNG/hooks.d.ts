import React from 'react';
import { DataFrame, DataFrameFieldIndex, Field } from '@grafana/data';
import { XYFieldMatchers } from './types';
/** @deprecated */
interface GraphNGContextType {
    mapSeriesIndexToDataFrameFieldIndex: (index: number) => DataFrameFieldIndex;
    dimFields: XYFieldMatchers;
    data: DataFrame;
}
/** @deprecated */
export declare const GraphNGContext: React.Context<GraphNGContextType>;
/** @deprecated */
export declare const useGraphNGContext: () => {
    dimFields: XYFieldMatchers;
    mapSeriesIndexToDataFrameFieldIndex: (index: number) => DataFrameFieldIndex;
    getXAxisField: () => Field<any> | null;
    alignedData: DataFrame;
};
export {};
