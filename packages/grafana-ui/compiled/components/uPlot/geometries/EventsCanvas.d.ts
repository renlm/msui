import React from 'react';
import { DataFrame, DataFrameFieldIndex } from '@grafana/data';
import { UPlotConfigBuilder } from '../config/UPlotConfigBuilder';
interface EventsCanvasProps {
    id: string;
    config: UPlotConfigBuilder;
    events: DataFrame[];
    renderEventMarker: (dataFrame: DataFrame, dataFrameFieldIndex: DataFrameFieldIndex) => React.ReactNode;
    mapEventToXYCoords: (dataFrame: DataFrame, dataFrameFieldIndex: DataFrameFieldIndex) => {
        x: number;
        y: number;
    } | undefined;
}
export declare function EventsCanvas({ id, events, renderEventMarker, mapEventToXYCoords, config }: EventsCanvasProps): React.JSX.Element | null;
export {};
