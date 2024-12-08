import { Column as RTColumn } from 'react-table';
import { Column } from './types';
export declare const EXPANDER_CELL_ID: "__expander";
type InternalColumn<T extends object> = RTColumn<T> & {
    visible?: (data: T[]) => boolean;
};
export declare function getColumns<K extends object>(columns: Array<Column<K>>, showExpandAll?: boolean): Array<InternalColumn<K>>;
export {};
