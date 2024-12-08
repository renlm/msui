import { DataFrame, Field, FieldConfigSource } from '../types';
/**
 * Get an appropriate display title
 */
export declare function getFrameDisplayName(frame: DataFrame, index?: number): string;
export declare function cacheFieldDisplayNames(frames: DataFrame[]): void;
/**
 *
 * moves each field's config.custom.hideFrom to field.state.hideFrom
 * and mutates orgiginal field.config.custom.hideFrom to one with explicit overrides only, (without the ad-hoc stateful __system override from legend toggle)
 */
export declare function decoupleHideFromState(frames: DataFrame[], fieldConfig: FieldConfigSource<any>): void;
export declare function getFieldDisplayName(field: Field, frame?: DataFrame, allFrames?: DataFrame[]): string;
/**
 * Get an appropriate display name. If the 'displayName' field config is set, use that.
 */
export declare function calculateFieldDisplayName(field: Field, frame?: DataFrame, allFrames?: DataFrame[]): string;
export declare function getUniqueFieldName(field: Field, frame?: DataFrame): string;
