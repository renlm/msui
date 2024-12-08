import { RegistryItem, Registry } from './Registry';
export declare enum BinaryOperationID {
    Add = "+",
    Subtract = "-",
    Divide = "/",
    Multiply = "*"
}
export type BinaryOperation = (left: number, right: number) => number;
interface BinaryOperatorInfo extends RegistryItem {
    operation: BinaryOperation;
    binaryOperationID: BinaryOperationID;
}
export declare const binaryOperators: Registry<BinaryOperatorInfo>;
export {};
