import { Labels } from '../types';
/** replace labels in a string.  Used for loki+prometheus legend formats */
export declare function renderLegendFormat(aliasPattern: string, aliasData: Labels): string;
