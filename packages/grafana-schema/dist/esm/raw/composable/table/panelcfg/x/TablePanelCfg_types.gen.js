import { T as TableCellHeight } from '../../../../../common.gen-8ea2300f.js';

const pluginVersion = "11.1.11";
const defaultOptions = {
  cellHeight: TableCellHeight.Sm,
  footer: {
    /**
     * Controls whether the footer should be shown
     */
    show: false,
    /**
     * Controls whether the footer should show the total number of rows on Count calculation
     */
    countRows: false,
    /**
     * Represents the selected calculations
     */
    reducer: []
  },
  frameIndex: 0,
  showHeader: true,
  showTypeIcons: false,
  sortBy: []
};

export { defaultOptions, pluginVersion };
