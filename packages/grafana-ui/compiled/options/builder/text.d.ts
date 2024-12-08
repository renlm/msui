import { PanelOptionsEditorBuilder } from '@grafana/data';
import { OptionsWithTextFormatting } from '@grafana/schema';
/**
 * Adds common text control options to a visualization options
 * @param builder
 * @param withTitle
 * @public
 */
export declare function addTextSizeOptions<T extends OptionsWithTextFormatting>(builder: PanelOptionsEditorBuilder<T>, withTitle?: boolean): void;
