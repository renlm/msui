import React from 'react';
import { PromQueryEditorProps } from '../../components/types';
import { QueryEditorMode } from '../shared/types';
interface Props {
    datasourceUid: PromQueryEditorProps['datasource']['uid'];
    editorMode: QueryEditorMode;
}
export declare function PromQueryCodeEditorAutocompleteInfo(props: Readonly<Props>): React.JSX.Element | null;
export {};
