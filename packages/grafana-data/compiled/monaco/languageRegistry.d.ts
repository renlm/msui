import { Registry, RegistryItem } from '../utils/Registry';
/**
 * @alpha
 */
export interface MonacoLanguageRegistryItem extends RegistryItem {
    init: () => Worker;
}
/**
 * @alpha
 */
export declare const monacoLanguageRegistry: Registry<MonacoLanguageRegistryItem>;
