import { Property } from 'csstype';
import { GrafanaTheme2 } from '@grafana/data';
import { ResponsiveProp } from './responsiveness';
export interface SizeProps {
    minWidth?: ResponsiveProp<Property.MinWidth<number>>;
    maxWidth?: ResponsiveProp<Property.MaxWidth<number>>;
    width?: ResponsiveProp<Property.Width<number>>;
    minHeight?: ResponsiveProp<Property.MinHeight<number>>;
    maxHeight?: ResponsiveProp<Property.MaxHeight<number>>;
    height?: ResponsiveProp<Property.Height<number>>;
}
export declare const getSizeStyles: (theme: GrafanaTheme2, width: SizeProps['width'], minWidth: SizeProps['minWidth'], maxWidth: SizeProps['maxWidth'], height: SizeProps['height'], minHeight: SizeProps['minHeight'], maxHeight: SizeProps['maxHeight']) => string;
