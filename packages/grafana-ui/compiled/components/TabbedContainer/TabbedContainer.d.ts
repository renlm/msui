import React from 'react';
import { IconName } from '../../types/icon';
export interface TabConfig {
    label: string;
    value: string;
    content: React.ReactNode;
    icon: IconName;
}
export interface TabbedContainerProps {
    tabs: TabConfig[];
    defaultTab?: string;
    closeIconTooltip?: string;
    onClose: () => void;
    testId?: string;
}
export declare function TabbedContainer({ tabs, defaultTab, closeIconTooltip, onClose, testId }: TabbedContainerProps): React.JSX.Element;
