import { PanelOptionsEditorBuilder } from '@grafana/data';
import { OptionsWithTooltip } from '@grafana/schema';
export declare function addTooltipOptions<T extends OptionsWithTooltip>(builder: PanelOptionsEditorBuilder<T>, singleOnly?: boolean, setProximity?: boolean, defaultOptions?: Partial<OptionsWithTooltip>): void;
