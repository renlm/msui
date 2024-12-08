import { ThresholdsConfig, ValueMapping, ValueMappingResult } from '../types';
export declare function getValueMappingResult(valueMappings: ValueMapping[], value: any): ValueMappingResult | null;
export declare function isNumeric(num: unknown): boolean;
/**
 * @deprecated use MappingType instead
 * @internal
 */
export declare enum LegacyMappingType {
    ValueToText = 1,
    RangeToText = 2
}
/**
 * @alpha
 * Converts the old Angular value mappings to new react style
 */
export declare function convertOldAngularValueMappings(panel: any, migratedThresholds?: ThresholdsConfig): ValueMapping[];
