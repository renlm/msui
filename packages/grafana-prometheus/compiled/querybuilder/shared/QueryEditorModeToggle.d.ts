import React from 'react';
import { QueryEditorMode } from './types';
export interface Props {
    mode: QueryEditorMode;
    onChange: (mode: QueryEditorMode) => void;
}
export declare function QueryEditorModeToggle({ mode, onChange }: Props): React.JSX.Element;
