/// <reference types="react" />
/// <reference types="trusted-types" />
/**
 * Return a sanitized string that is going to be rendered in the browser to prevent XSS attacks.
 * Note that sanitized tags will be removed, such as "<script>".
 * We don't allow form or input elements.
 */
export declare function sanitize(unsanitizedString: string): string;
export declare function sanitizeTrustedTypesRSS(unsanitizedString: string): TrustedHTML;
export declare function sanitizeTrustedTypes(unsanitizedString: string): TrustedHTML;
/**
 * Returns string safe from XSS attacks to be used in the Text panel plugin.
 *
 * Even though we allow the style-attribute, there's still default filtering applied to it
 * Info: https://github.com/leizongmin/js-xss#customize-css-filter
 * Whitelist: https://github.com/leizongmin/js-css-filter/blob/master/lib/default.js
 */
export declare function sanitizeTextPanelContent(unsanitizedString: string): string;
export declare function sanitizeSVGContent(unsanitizedString: string): string;
export declare function sanitizeUrl(url: string): string;
export declare function hasAnsiCodes(input: string): boolean;
export declare function escapeHtml(str: string): string;
