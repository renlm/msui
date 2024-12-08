import React from 'react';
export type Props = {
    llmAppEnabled: boolean;
    metric: string;
    setShowDrawer: (show: boolean) => void;
};
export declare function QueryAssistantButton(props: Props): React.JSX.Element;
