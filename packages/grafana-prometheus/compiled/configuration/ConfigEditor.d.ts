import React from 'react';
import { DataSourcePluginOptionsEditorProps, GrafanaTheme2 } from '@grafana/data';
import { PromOptions } from '../types';
export declare const PROM_CONFIG_LABEL_WIDTH = 30;
export type PrometheusConfigProps = DataSourcePluginOptionsEditorProps<PromOptions>;
export declare const ConfigEditor: (props: PrometheusConfigProps) => React.JSX.Element;
/**
 * Use this to return a url in a tooltip in a field. Don't forget to make the field interactive to be able to click on the tooltip
 * @param url
 * @returns
 */
export declare function docsTip(url?: string): React.JSX.Element;
export declare const validateInput: (input: string, pattern: string | RegExp, errorMessage?: string) => boolean | JSX.Element;
export declare function overhaulStyles(theme: GrafanaTheme2): {
    additionalSettings: string;
    secondaryGrey: string;
    inlineError: string;
    switchField: string;
    sectionHeaderPadding: string;
    sectionBottomPadding: string;
    subsectionText: string;
    hrBottomSpace: string;
    hrTopSpace: string;
    textUnderline: string;
    versionMargin: string;
    advancedHTTPSettingsMargin: string;
    advancedSettings: string;
    alertingTop: string;
    overhaulPageHeading: string;
    container: string;
};
