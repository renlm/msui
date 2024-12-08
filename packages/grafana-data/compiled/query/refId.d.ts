import { DataQuery } from '@grafana/schema';
/**
 * Finds the next available refId for a query
 */
export declare const getNextRefId: (queries: DataQuery[]) => string;
