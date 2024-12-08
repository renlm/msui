import { Property } from 'csstype';
import { Row, HeaderGroup } from 'react-table';
import { DataFrame, Field, SelectableValue, GrafanaTheme2, DisplayValueAlignmentFactors, DisplayValue } from '@grafana/data';
import { TableCellDisplayMode } from '@grafana/schema';
import { TableStyles } from './styles';
import { CellComponent, TableCellOptions, FooterItem, GrafanaTableColumn, TableFooterCalc, CellColors } from './types';
export declare const EXPANDER_WIDTH = 50;
export declare function getTextAlign(field?: Field): Property.JustifyContent;
export declare function getColumns(data: DataFrame, availableWidth: number, columnMinWidth: number, expander: boolean, footerValues?: FooterItem[], isCountRowsSet?: boolean): GrafanaTableColumn[];
export declare function getCellComponent(displayMode: TableCellDisplayMode, field: Field): CellComponent;
export declare function filterByValue(field?: Field): (rows: Row[], id: string, filterValues?: SelectableValue[]) => Row<{}>[];
export declare function calculateUniqueFieldValues(rows: any[], field?: Field): Record<string, string>;
export declare function rowToFieldValue(row: any, field?: Field): string;
export declare function valuesToOptions(unique: Record<string, unknown>): SelectableValue[];
export declare function sortOptions(a: SelectableValue, b: SelectableValue): number;
export declare function getFilteredOptions(options: SelectableValue[], filterValues?: SelectableValue[]): SelectableValue[];
export declare function sortCaseInsensitive(a: Row, b: Row, id: string): number;
export declare function sortNumber(rowA: Row, rowB: Row, id: string): 1 | -1 | 0;
export declare function getFooterItems(filterFields: Array<{
    id: string;
    field?: Field;
} | undefined>, values: any[number], options: TableFooterCalc, theme2: GrafanaTheme2): FooterItem[];
export declare function createFooterCalculationValues(rows: Row[]): any[number];
export declare function getCellOptions(field: Field): TableCellOptions;
/**
 * Migrates table cell display mode to new object format.
 *
 * @param displayMode The display mode of the cell
 * @returns TableCellOptions object in the correct format
 * relative to the old display mode.
 */
export declare function migrateTableDisplayModeToCellOptions(displayMode: TableCellDisplayMode): TableCellOptions;
/**
 * Getting gauge or sparkline values to align is very tricky without looking at all values and passing them through display processor.
 * For very large tables that could pretty expensive. So this is kind of a compromise. We look at the first 1000 rows and cache the longest value.
 * If we have a cached value we just check if the current value is longer and update the alignmentFactor. This can obviously still lead to
 * unaligned gauges but it should a lot less common.
 **/
export declare function getAlignmentFactor(field: Field, displayValue: DisplayValue, rowIndex: number): DisplayValueAlignmentFactors;
export declare function isPointTimeValAroundTableTimeVal(pointTime: number, rowTime: number, threshold: number): boolean;
export declare function calculateAroundPointThreshold(timeField: Field): number;
/**
 * Retrieve colors for a table cell (or table row).
 *
 * @param tableStyles
 *  Styles for the table
 * @param cellOptions
 *  Table cell configuration options
 * @param displayValue
 *  The value that will be displayed
 * @returns CellColors
 */
export declare function getCellColors(tableStyles: TableStyles, cellOptions: TableCellOptions, displayValue: DisplayValue): CellColors;
/**
 * Calculate an estimated bounding box for a block
 * of text using an offscreen canvas.
 */
export declare function guessTextBoundingBox(text: string, headerGroup: HeaderGroup, osContext: OffscreenCanvasRenderingContext2D | null, lineHeight: number, defaultRowHeight: number): {
    width: number;
    height: number;
};
/**
 * A function to guess at which field has the longest text.
 * To do this we either select a single record if there aren't many records
 * or we select records at random and sample their size.
 */
export declare function guessLongestField(fieldConfig: any, data: DataFrame): Field<any> | undefined;
