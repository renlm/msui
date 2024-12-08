import React from 'react';
import { FeatureState } from '@grafana/data';
interface FeatureBadgeProps {
    featureState: FeatureState;
    tooltip?: string;
}
export declare const FeatureBadge: ({ featureState, tooltip }: FeatureBadgeProps) => React.JSX.Element;
export {};
