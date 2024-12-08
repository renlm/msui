import React, { HTMLProps } from 'react';
import { NavModelItem } from '@grafana/data';
import { IconName } from '../../types';
export interface TabProps extends HTMLProps<HTMLElement> {
    label: string;
    active?: boolean;
    /** When provided, it is possible to use the tab as a hyperlink. Use in cases where the tabs update location. */
    href?: string;
    icon?: IconName;
    onChangeTab?: (event: React.MouseEvent<HTMLElement>) => void;
    /** A number rendered next to the text. Usually used to display the number of items in a tab's view. */
    counter?: number | null;
    /** Extra content, displayed after the tab label and counter */
    suffix?: NavModelItem['tabSuffix'];
}
export declare const Tab: React.ForwardRefExoticComponent<Omit<TabProps, "ref"> & React.RefAttributes<HTMLElement>>;
