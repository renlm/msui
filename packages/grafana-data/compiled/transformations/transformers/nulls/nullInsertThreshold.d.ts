import { DataFrame } from '../../../types';
type InsertMode = (prev: number, next: number, threshold: number) => number;
interface NullInsertOptions {
    frame: DataFrame;
    refFieldName?: string | null;
    refFieldPseudoMax?: number;
    refFieldPseudoMin?: number;
    insertMode?: InsertMode;
}
/** @internal */
export declare function applyNullInsertThreshold(opts: NullInsertOptions): DataFrame;
export {};
