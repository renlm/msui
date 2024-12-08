import { GrafanaTheme2 } from '@grafana/data';
export type DragHandlePosition = 'middle' | 'start' | 'end';
export declare const getDragStyles: (theme: GrafanaTheme2, handlePosition?: DragHandlePosition) => {
    dragHandleVertical: string;
    dragHandleHorizontal: string;
};
