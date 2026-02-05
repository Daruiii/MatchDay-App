/**
 * Configuration centralisée de l'API PandaScore
 */

export const API_CONFIG = {
  BASE_URL: 'https://api.pandascore.co',
  
  ENDPOINTS: {
    // Teams
    TEAMS: '/teams',
    TEAM_MATCHES: (slug: string) => `/teams/${slug}/matches`,
    TEAM_BY_SLUG: (slug: string) => `/teams/${slug}`,
    
    // Search
    SEARCH_TEAMS: '/teams',
    
    // Auth
    REFRESH_TOKEN: '/dashboard_api/users/me/access_token',
  },
  
  TIMEOUT: 10000, // 10 seconds
  RETRY_COUNT: 3,
  
  // Params par défaut
  DEFAULT_PARAMS: {
    PER_PAGE: 25,
    PER_PAGE_UPCOMING: 20,
  },
  
  // Status codes
  STATUS_CODES: {
    UNAUTHORIZED: 401,
    RATE_LIMIT: 429,
  },
} as const;

/**
 * Helper pour construire les URLs complètes
 */
export const buildUrl = (endpoint: string, params: Record<string, any> = {}): string => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
};
