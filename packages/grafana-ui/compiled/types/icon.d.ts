import { Field, FieldType, IconName } from '@grafana/data';
import { ComponentSize } from './size';
export type { IconName } from '@grafana/data';
export { toIconName } from '@grafana/data';
export type IconType = 'mono' | 'default' | 'solid';
export type IconSize = ComponentSize | 'xl' | 'xxl' | 'xxxl';
export declare const isIconSize: (value: string) => value is IconSize;
export declare const getAvailableIcons: () => string[];
/**
 * Get the icon for a given field
 */
export declare function getFieldTypeIcon(field?: Field): IconName;
/** Get an icon for a given field type  */
export declare function getFieldTypeIconName(type?: FieldType): IconName;
