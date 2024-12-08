import React, { PureComponent } from 'react';
import { DataSourceInstanceSettings, DataSourceRef, SelectableValue } from '@grafana/data';
import { ActionMeta } from '@grafana/ui';
/**
 * Component props description for the {@link DataSourcePicker}
 *
 * @internal
 */
export interface DataSourcePickerProps {
    onChange: (ds: DataSourceInstanceSettings) => void;
    current: DataSourceRef | string | null;
    hideTextValue?: boolean;
    onBlur?: () => void;
    autoFocus?: boolean;
    openMenuOnFocus?: boolean;
    placeholder?: string;
    tracing?: boolean;
    mixed?: boolean;
    dashboard?: boolean;
    metrics?: boolean;
    type?: string | string[];
    annotations?: boolean;
    variables?: boolean;
    alerting?: boolean;
    pluginId?: string;
    /** If true,we show only DSs with logs; and if true, pluginId shouldnt be passed in */
    logs?: boolean;
    noDefault?: boolean;
    width?: number;
    inputId?: string;
    filter?: (dataSource: DataSourceInstanceSettings) => boolean;
    onClear?: () => void;
    invalid?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
}
/**
 * Component state description for the {@link DataSourcePicker}
 *
 * @internal
 */
export interface DataSourcePickerState {
    error?: string;
}
/**
 * Component to be able to select a datasource from the list of installed and enabled
 * datasources in the current Grafana instance.
 *
 * @internal
 */
export declare class DataSourcePicker extends PureComponent<DataSourcePickerProps, DataSourcePickerState> {
    dataSourceSrv: import("../services/dataSourceSrv").DataSourceSrv;
    static defaultProps: Partial<DataSourcePickerProps>;
    state: DataSourcePickerState;
    constructor(props: DataSourcePickerProps);
    componentDidMount(): void;
    onChange: (item: SelectableValue<string>, actionMeta: ActionMeta) => void;
    private getCurrentValue;
    getDataSourceOptions(): {
        value: string;
        label: string;
        imgUrl: string;
        meta: import("@grafana/data").DataSourcePluginMeta<{}>;
    }[];
    render(): React.JSX.Element;
}
