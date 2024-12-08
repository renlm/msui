import { Registry, RegistryItem } from './Registry';
export declare enum UnaryOperationID {
    Abs = "abs",
    Exp = "exp",
    Ln = "ln",
    Floor = "floor",
    Ceil = "ceil"
}
export type UnaryOperation = (value: number) => number;
interface UnaryOperatorInfo extends RegistryItem {
    operation: UnaryOperation;
    unaryOperationID: UnaryOperationID;
}
export declare const unaryOperators: Registry<UnaryOperatorInfo>;
export {};
