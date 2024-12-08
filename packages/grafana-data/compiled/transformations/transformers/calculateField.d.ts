import { DataTransformerInfo, NullValueMode } from '../../types';
import { BinaryOperationID } from '../../utils/binaryOperators';
import { UnaryOperationID } from '../../utils/unaryOperators';
import { ReducerID } from '../fieldReducer';
export declare enum CalculateFieldMode {
    ReduceRow = "reduceRow",
    CumulativeFunctions = "cumulativeFunctions",
    WindowFunctions = "windowFunctions",
    BinaryOperation = "binary",
    UnaryOperation = "unary",
    Index = "index"
}
export declare enum WindowSizeMode {
    Percentage = "percentage",
    Fixed = "fixed"
}
export declare enum WindowAlignment {
    Trailing = "trailing",
    Centered = "centered"
}
export interface ReduceOptions {
    include?: string[];
    reducer: ReducerID;
    nullValueMode?: NullValueMode;
}
export interface CumulativeOptions {
    field?: string;
    reducer: ReducerID;
}
export interface WindowOptions extends CumulativeOptions {
    windowSize?: number;
    windowSizeMode?: WindowSizeMode;
    windowAlignment?: WindowAlignment;
}
export interface UnaryOptions {
    operator: UnaryOperationID;
    fieldName: string;
}
export interface BinaryOptions {
    left: string;
    operator: BinaryOperationID;
    right: string;
}
interface IndexOptions {
    asPercentile: boolean;
}
export declare const defaultWindowOptions: WindowOptions;
export interface CalculateFieldTransformerOptions {
    timeSeries?: boolean;
    mode: CalculateFieldMode;
    reduce?: ReduceOptions;
    window?: WindowOptions;
    cumulative?: CumulativeOptions;
    binary?: BinaryOptions;
    unary?: UnaryOptions;
    index?: IndexOptions;
    replaceFields?: boolean;
    alias?: string;
}
export declare const calculateFieldTransformer: DataTransformerInfo<CalculateFieldTransformerOptions>;
export declare function getNameFromOptions(options: CalculateFieldTransformerOptions): string;
export {};
