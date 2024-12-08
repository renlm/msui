export * from './string';
export * from './markdown';
export * from './text';
import { escapeHtml, hasAnsiCodes, sanitize, sanitizeUrl, sanitizeTextPanelContent, sanitizeSVGContent, sanitizeTrustedTypes, sanitizeTrustedTypesRSS } from './sanitize';
export declare const textUtil: {
    escapeHtml: typeof escapeHtml;
    hasAnsiCodes: typeof hasAnsiCodes;
    sanitize: typeof sanitize;
    sanitizeTextPanelContent: typeof sanitizeTextPanelContent;
    sanitizeUrl: typeof sanitizeUrl;
    sanitizeSVGContent: typeof sanitizeSVGContent;
    sanitizeTrustedTypes: typeof sanitizeTrustedTypes;
    sanitizeTrustedTypesRSS: typeof sanitizeTrustedTypesRSS;
};
