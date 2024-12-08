import React from 'react';
import { MetricsModalState } from './state/state';
type AdditionalSettingsProps = {
    state: MetricsModalState;
    onChangeFullMetaSearch: () => void;
    onChangeIncludeNullMetadata: () => void;
    onChangeDisableTextWrap: () => void;
    onChangeUseBackend: () => void;
};
export declare function AdditionalSettings(props: AdditionalSettingsProps): React.JSX.Element;
export {};
