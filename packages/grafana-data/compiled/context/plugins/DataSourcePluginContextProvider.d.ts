import { PropsWithChildren, ReactElement } from 'react';
import { DataSourceInstanceSettings } from '../../types';
export type DataSourcePluginContextProviderProps = {
    instanceSettings: DataSourceInstanceSettings;
};
export declare function DataSourcePluginContextProvider(props: PropsWithChildren<DataSourcePluginContextProviderProps>): ReactElement;
