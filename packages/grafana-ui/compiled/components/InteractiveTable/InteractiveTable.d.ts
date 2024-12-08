import React, { ReactNode } from 'react';
import { SortingRule, TableOptions } from 'react-table';
import { IconName } from '@grafana/data';
import { PopoverContent } from '../Tooltip';
import { Column } from './types';
export type InteractiveTableHeaderTooltip = {
    content: PopoverContent;
    iconName?: IconName;
};
export type FetchDataArgs<Data> = {
    sortBy: Array<SortingRule<Data>>;
};
export type FetchDataFunc<Data> = ({ sortBy }: FetchDataArgs<Data>) => void;
interface BaseProps<TableData extends object> {
    className?: string;
    /**
     * Table's columns definition. Must be memoized.
     */
    columns: Array<Column<TableData>>;
    /**
     * The data to display in the table. Must be memoized.
     */
    data: TableData[];
    /**
     * Must return a unique id for each row
     */
    getRowId: TableOptions<TableData>['getRowId'];
    /**
     * Optional tooltips for the table headers. The key must match the column id.
     */
    headerTooltips?: Record<string, InteractiveTableHeaderTooltip>;
    /**
     * Number of rows per page. A value of zero disables pagination. Defaults to 0.
     * A React hooks error will be thrown if pageSize goes from greater than 0 to 0 or vice versa. If enabling pagination,
     * make sure pageSize remains a non-zero value.
     */
    pageSize?: number;
    /**
     * A custom function to fetch data when the table is sorted. If not provided, the table will be sorted client-side.
     * It's important for this function to have a stable identity, e.g. being wrapped into useCallback to prevent unnecessary
     * re-renders of the table.
     */
    fetchData?: FetchDataFunc<TableData>;
}
interface WithExpandableRow<TableData extends object> extends BaseProps<TableData> {
    /**
     * Render function for the expanded row. if not provided, the tables rows will not be expandable.
     */
    renderExpandedRow: (row: TableData) => ReactNode;
    /**
     * Whether to show the "Expand all" button. Depends on renderExpandedRow to be provided. Defaults to false.
     */
    showExpandAll?: boolean;
}
interface WithoutExpandableRow<TableData extends object> extends BaseProps<TableData> {
    renderExpandedRow?: never;
    showExpandAll?: never;
}
type Props<TableData extends object> = WithExpandableRow<TableData> | WithoutExpandableRow<TableData>;
/** @alpha */
export declare function InteractiveTable<TableData extends object>({ className, columns, data, getRowId, headerTooltips, pageSize, renderExpandedRow, showExpandAll, fetchData, }: Props<TableData>): React.JSX.Element;
export {};
