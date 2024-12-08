import React from 'react';
import { FieldConfigSource, PanelData, VisualizationSuggestion } from '@grafana/data';
/**
 * Describes the properties that can be passed to the PanelDataErrorView.
 *
 * @alpha
 */
export interface PanelDataErrorViewProps {
    message?: string;
    panelId: number;
    data: PanelData;
    fieldConfig?: FieldConfigSource;
    needsTimeField?: boolean;
    needsNumberField?: boolean;
    needsStringField?: boolean;
    suggestions?: VisualizationSuggestion[];
}
/**
 * Simplified type with defaults that describes the PanelDataErrorView.
 *
 * @internal
 */
export type PanelDataErrorViewType = React.ComponentType<PanelDataErrorViewProps>;
/**
 * PanelDataErrorView allows panels to show a consistent error message when
 * the result structure does not meet expected criteria
 *
 * @alpha
 */
export declare let PanelDataErrorView: PanelDataErrorViewType;
/**
 * Used to bootstrap the PanelDataErrorView during application start so the
 * PanelDataErrorView is exposed via runtime.
 *
 * @internal
 */
export declare function setPanelDataErrorView(renderer: PanelDataErrorViewType): void;
