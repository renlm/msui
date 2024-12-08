import { DataTransformerInfo } from '../../types';
import { OrderFieldsTransformerOptions } from './order';
import { RenameFieldsTransformerOptions } from './rename';
export interface OrganizeFieldsTransformerOptions extends OrderFieldsTransformerOptions, RenameFieldsTransformerOptions {
    excludeByName: Record<string, boolean>;
    includeByName?: Record<string, boolean>;
}
export declare const organizeFieldsTransformer: DataTransformerInfo<OrganizeFieldsTransformerOptions>;
