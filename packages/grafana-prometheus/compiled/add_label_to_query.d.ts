/**
 * Adds label filter to existing query. Useful for query modification for example for ad hoc filters.
 *
 * It uses PromQL parser to find instances of metric and labels, alters them and then splices them back into the query.
 * Ideally we could use the parse -> change -> render is a simple 3 steps but right now building the visual query
 * object does not support all possible queries.
 *
 * So instead this just operates on substrings of the query with labels and operates just on those. This makes this
 * more robust and can alter even invalid queries, and preserves in general the query structure and whitespace.
 * @param query
 * @param key
 * @param value
 * @param operator
 */
export declare function addLabelToQuery(query: string, key: string, value: string | number, operator?: string): string;
