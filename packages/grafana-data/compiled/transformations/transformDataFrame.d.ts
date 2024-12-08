import { Observable } from 'rxjs';
import { DataFrame, DataTransformContext, DataTransformerConfig, CustomTransformOperator } from '../types';
/**
 * Apply configured transformations to the input data
 */
export declare function transformDataFrame(options: Array<DataTransformerConfig | CustomTransformOperator>, data: DataFrame[], ctx?: DataTransformContext): Observable<DataFrame[]>;
