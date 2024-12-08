import React, { ChangeEvent } from 'react';
import { GrafanaTheme2, TimeRange } from '@grafana/data';
import PromQlLanguageProvider from '../language_provider';
export interface BrowserProps {
    languageProvider: PromQlLanguageProvider;
    onChange: (selector: string) => void;
    theme: GrafanaTheme2;
    autoSelect?: number;
    hide?: () => void;
    lastUsedLabels: string[];
    storeLastUsedLabels: (labels: string[]) => void;
    deleteLastUsedLabels: () => void;
    timeRange?: TimeRange;
}
interface BrowserState {
    labels: SelectableLabel[];
    labelSearchTerm: string;
    metricSearchTerm: string;
    status: string;
    error: string;
    validationStatus: string;
    valueSearchTerm: string;
}
interface FacettableValue {
    name: string;
    selected?: boolean;
    details?: string;
}
export interface SelectableLabel {
    name: string;
    selected?: boolean;
    loading?: boolean;
    values?: FacettableValue[];
    hidden?: boolean;
    facets?: number;
}
export declare function buildSelector(labels: SelectableLabel[]): string;
export declare function facetLabels(labels: SelectableLabel[], possibleLabels: Record<string, string[]>, lastFacetted?: string): SelectableLabel[];
/**
 * TODO #33976: Remove duplicated code. The component is very similar to LokiLabelBrowser.tsx. Check if it's possible
 *              to create a single, generic component.
 */
export declare class UnthemedPrometheusMetricsBrowser extends React.Component<BrowserProps, BrowserState> {
    valueListsRef: React.RefObject<HTMLDivElement>;
    state: BrowserState;
    onChangeLabelSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeMetricSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeValueSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    onClickRunQuery: () => void;
    onClickRunRateQuery: () => void;
    onClickClear: () => void;
    onClickLabel: (name: string, value: string | undefined, event: React.MouseEvent<HTMLElement>) => void;
    onClickValue: (name: string, value: string | undefined, event: React.MouseEvent<HTMLElement>) => void;
    onClickMetric: (name: string, value: string | undefined, event: React.MouseEvent<HTMLElement>) => void;
    onClickValidate: () => void;
    updateLabelState(name: string, updatedFields: Partial<SelectableLabel>, status?: string, cb?: () => void): void;
    componentDidMount(): void;
    doFacettingForLabel(name: string): void;
    doFacetting: (lastFacetted?: string) => void;
    fetchValues(name: string, selector: string): Promise<void>;
    fetchSeries(selector: string, lastFacetted?: string): Promise<void>;
    validateSelector(selector: string): Promise<void>;
    render(): React.JSX.Element;
}
export declare const PrometheusMetricsBrowser: React.FunctionComponent<{
    hide?: (() => void) | undefined;
    onChange: (selector: string) => void;
    timeRange?: TimeRange | undefined;
    languageProvider: PromQlLanguageProvider;
    autoSelect?: number | undefined;
    lastUsedLabels: string[];
    storeLastUsedLabels: (labels: string[]) => void;
    deleteLastUsedLabels: () => void;
}>;
export {};
