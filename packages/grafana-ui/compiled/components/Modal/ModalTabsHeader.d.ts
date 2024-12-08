import React from 'react';
import { NavModelItem } from '@grafana/data';
import { IconName } from '../../types';
interface ModalTab {
    value: string;
    label: string;
    icon?: IconName;
    tabSuffix?: NavModelItem['tabSuffix'];
}
interface Props {
    icon: IconName;
    title: string;
    tabs: ModalTab[];
    activeTab: string;
    onChangeTab(tab: ModalTab): void;
}
export declare const ModalTabsHeader: ({ icon, title, tabs, activeTab, onChangeTab }: Props) => React.JSX.Element;
export {};
