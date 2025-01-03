export interface QueryHistoryPreference {
    /**
     * one of: '' | 'query' | 'starred';
     */
    homeTab?: string;
}
export interface CookiePreferences {
    analytics?: Record<string, unknown>;
    functional?: Record<string, unknown>;
    performance?: Record<string, unknown>;
}
/**
 * Spec defines user, team or org Grafana preferences
 * swagger:model Preferences
 */
export interface Preferences {
    /**
     * Cookie preferences
     */
    cookiePreferences?: CookiePreferences;
    /**
     * UID for the home dashboard
     */
    homeDashboardUID?: string;
    /**
     * Selected language (beta)
     */
    language?: string;
    /**
     * Explore query history preferences
     */
    queryHistory?: QueryHistoryPreference;
    /**
     * light, dark, empty is default
     */
    theme?: string;
    /**
     * The timezone selection
     * TODO: this should use the timezone defined in common
     */
    timezone?: string;
    /**
     * day of the week (sunday, monday, etc)
     */
    weekStart?: string;
}
