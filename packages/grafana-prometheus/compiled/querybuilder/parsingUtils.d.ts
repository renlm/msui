import { SyntaxNode, TreeCursor } from '@lezer/common';
import { QueryBuilderOperation } from './shared/types';
export declare const ErrorId = 0;
export declare function getLeftMostChild(cur: SyntaxNode): SyntaxNode;
export declare function makeError(expr: string, node: SyntaxNode): {
    text: string;
    from: number;
    to: number;
    parentType: string | undefined;
};
/**
 * As variables with $ are creating parsing errors, we first replace them with magic string that is parsable and at
 * the same time we can get the variable and its format back from it.
 * @param expr
 */
export declare function replaceVariables(expr: string): string;
/**
 * Get back the text with variables in their original format.
 * @param expr
 */
export declare function returnVariables(expr: string): string;
/**
 * Get the actual string of the expression. That is not stored in the tree so we have to get the indexes from the node
 * and then based on that get it from the expression.
 * @param expr
 * @param node
 */
export declare function getString(expr: string, node: SyntaxNode | TreeCursor | null | undefined): string;
/**
 * Create simple scalar binary op object.
 * @param opDef - definition of the op to be created
 * @param expr
 * @param numberNode - the node for the scalar
 * @param hasBool - whether operation has a bool modifier. Is used only for ops for which it makes sense.
 */
export declare function makeBinOp(opDef: {
    id: string;
    comparison?: boolean;
}, expr: string, numberNode: SyntaxNode, hasBool: boolean): QueryBuilderOperation;
/**
 * Get all nodes with type in the tree. This traverses the tree so it is safe only when you know there shouldn't be
 * too much nesting but you just want to skip some of the wrappers. For example getting function args this way would
 * not be safe is it would also find arguments of nested functions.
 * @param expr
 * @param cur
 * @param type
 */
export declare function getAllByType(expr: string, cur: SyntaxNode, type: number): string[];
/**
 * There aren't any spaces in the metric names, so let's introduce a wildcard into the regex for each space to better facilitate a fuzzy search
 */
export declare const regexifyLabelValuesQueryString: (query: string) => string;
