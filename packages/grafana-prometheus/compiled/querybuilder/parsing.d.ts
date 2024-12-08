import { SyntaxNode } from '@lezer/common';
import { PromVisualQuery } from './types';
/**
 * Parses a PromQL query into a visual query model.
 *
 * It traverses the tree and uses sort of state machine to update the query model. The query model is modified
 * during the traversal and sent to each handler as context.
 *
 * @param expr
 */
export declare function buildVisualQueryFromString(expr: string): Context;
interface ParsingError {
    text: string;
    from?: number;
    to?: number;
    parentType?: string;
}
interface Context {
    query: PromVisualQuery;
    errors: ParsingError[];
}
/**
 * Handler for default state. It will traverse the tree and call the appropriate handler for each node. The node
 * handled here does not necessarily need to be of type == Expr.
 * @param expr
 * @param node
 * @param context
 */
export declare function handleExpression(expr: string, node: SyntaxNode, context: Context): void;
export {};
