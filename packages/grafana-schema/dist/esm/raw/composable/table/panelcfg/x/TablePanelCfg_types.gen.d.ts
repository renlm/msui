import * as ui from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options {
    /**
     * Controls the height of the rows
     */
    cellHeight?: ui.TableCellHeight;
    /**
     * Controls footer options
     */
    footer?: ui.TableFooterOptions;
    /**
     * Represents the index of the selected frame
     */
    frameIndex: number;
    /**
     * Controls whether the panel should show the header
     */
    showHeader: boolean;
    /**
     * Controls whether the header should show icons for the column types
     */
    showTypeIcons?: boolean;
    /**
     * Used to control row sorting
     */
    sortBy?: Array<ui.TableSortByFieldState>;
}
export declare const defaultOptions: Partial<Options>;
export interface FieldConfig extends ui.TableFieldOptions {
}
