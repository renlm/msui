import React from 'react';
import { DataQuery, DataSourceJsonData } from '@grafana/schema';
import { ScopedVars } from './ScopedVars';
import { DataSourcePluginMeta, DataSourceSettings } from './datasource';
import { IconName } from './icon';
import { PanelData } from './panel';
import { RawTimeRange, TimeZone } from './time';
export declare enum PluginExtensionTypes {
    link = "link",
    component = "component"
}
type PluginExtensionBase = {
    id: string;
    type: PluginExtensionTypes;
    title: string;
    description: string;
    pluginId: string;
};
export type PluginExtensionLink = PluginExtensionBase & {
    type: PluginExtensionTypes.link;
    path?: string;
    onClick?: (event?: React.MouseEvent) => void;
    icon?: IconName;
    category?: string;
};
export type PluginExtensionComponent<Props = {}> = PluginExtensionBase & {
    type: PluginExtensionTypes.component;
    component: React.ComponentType<Props>;
};
export type PluginExtension = PluginExtensionLink | PluginExtensionComponent;
export type PluginExtensionLinkConfig<Context extends object = object> = {
    type: PluginExtensionTypes.link;
    title: string;
    description: string;
    path?: string;
    onClick?: (event: React.MouseEvent | undefined, helpers: PluginExtensionEventHelpers<Context>) => void;
    /**
     * The unique identifier of the Extension Point
     * (Core Grafana extension point ids are available in the `PluginExtensionPoints` enum)
     */
    extensionPointId: string;
    configure?: (context?: Readonly<Context>) => Partial<{
        title: string;
        description: string;
        path: string;
        onClick: (event: React.MouseEvent | undefined, helpers: PluginExtensionEventHelpers<Context>) => void;
        icon: IconName;
        category: string;
    }> | undefined;
    icon?: IconName;
    category?: string;
};
export type PluginExtensionComponentConfig<Props = {}> = {
    type: PluginExtensionTypes.component;
    title: string;
    description: string;
    component: React.ComponentType<Props>;
    /**
     * The unique identifier of the Extension Point
     * (Core Grafana extension point ids are available in the `PluginExtensionPoints` enum)
     */
    extensionPointId: string;
};
export type PluginExtensionConfig = PluginExtensionLinkConfig | PluginExtensionComponentConfig;
export type PluginExtensionOpenModalOptions = {
    title: string;
    body: React.ElementType<{
        onDismiss?: () => void;
    }>;
    width?: string | number;
    height?: string | number;
};
export type PluginExtensionEventHelpers<Context extends object = object> = {
    context?: Readonly<Context>;
    openModal: (options: PluginExtensionOpenModalOptions) => void;
};
export declare enum PluginExtensionPoints {
    AlertInstanceAction = "grafana/alerting/instance/action",
    AlertingHomePage = "grafana/alerting/home",
    AlertingAlertingRuleAction = "grafana/alerting/alertingrule/action",
    AlertingRecordingRuleAction = "grafana/alerting/recordingrule/action",
    CommandPalette = "grafana/commandpalette/action",
    DashboardPanelMenu = "grafana/dashboard/panel/menu",
    DataSourceConfig = "grafana/datasources/config",
    ExploreToolbarAction = "grafana/explore/toolbar/action",
    UserProfileTab = "grafana/user/profile/tab"
}
export type PluginExtensionPanelContext = {
    pluginId: string;
    id: number;
    title: string;
    timeRange: RawTimeRange;
    timeZone: TimeZone;
    dashboard: Dashboard;
    targets: DataQuery[];
    scopedVars?: ScopedVars;
    data?: PanelData;
};
export type PluginExtensionDataSourceConfigContext<JsonData extends DataSourceJsonData = DataSourceJsonData> = {
    dataSource: DataSourceSettings<JsonData>;
    dataSourceMeta: DataSourcePluginMeta;
    testingStatus?: {
        message?: string | null;
        status?: string | null;
    };
    setJsonData: (jsonData: JsonData) => void;
};
export type PluginExtensionCommandPaletteContext = {};
type Dashboard = {
    uid: string;
    title: string;
    tags: string[];
};
export {};
