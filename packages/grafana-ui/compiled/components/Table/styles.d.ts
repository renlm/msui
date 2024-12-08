import { GrafanaTheme2 } from '@grafana/data';
import { TableCellHeight } from '@grafana/schema';
export declare function useTableStyles(theme: GrafanaTheme2, cellHeightOption: TableCellHeight): {
    theme: GrafanaTheme2;
    cellHeight: number;
    buildCellContainerStyle: (color?: string, background?: string, backgroundHover?: string, overflowOnHover?: boolean, asCellText?: boolean, textShouldWrap?: boolean, textWrapped?: boolean, rowStyled?: boolean) => string;
    cellPadding: number;
    cellHeightInner: number;
    rowHeight: number;
    table: string;
    thead: string;
    tfoot: string;
    headerRow: string;
    headerCell: string;
    headerCellLabel: string;
    cellContainerText: string;
    cellContainerTextNoOverflow: string;
    cellContainer: string;
    cellContainerNoOverflow: string;
    cellText: string;
    sortIcon: string;
    cellLink: string;
    cellLinkForColoredCell: string;
    imageCellLink: string;
    headerFilter: string;
    paginationWrapper: string;
    paginationSummary: string;
    tableContentWrapper: (totalColumnsWidth: number) => string;
    row: string;
    imageCell: string;
    resizeHandle: string;
    typeIcon: string;
    noData: string;
    expanderCell: string;
};
export type TableStyles = ReturnType<typeof useTableStyles>;
