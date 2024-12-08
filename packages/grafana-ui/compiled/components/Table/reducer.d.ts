import { GrafanaTableColumn, GrafanaTableState, Props } from './types';
export interface ActionType {
    type: string;
    id: string | undefined;
}
export declare function useTableStateReducer({ onColumnResize, onSortByChange, data }: Props): (newState: GrafanaTableState, action: ActionType) => GrafanaTableState;
export declare function getInitialState(initialSortBy: Props['initialSortBy'], columns: GrafanaTableColumn[]): Partial<GrafanaTableState>;
