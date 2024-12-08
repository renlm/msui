import { UPlotConfigBuilder } from '../../../components';
interface ZoomPluginProps {
    onZoom: (range: {
        from: number;
        to: number;
    }) => void;
    withZoomY?: boolean;
    config: UPlotConfigBuilder;
}
/**
 * @alpha
 */
export declare const ZoomPlugin: ({ onZoom, config, withZoomY }: ZoomPluginProps) => null;
export {};
