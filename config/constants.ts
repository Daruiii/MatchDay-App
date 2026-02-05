/**
 * Constantes métier de l'application
 */

// Cache
export const CACHE_CONFIG = {
  MATCHES_TTL: 5 * 60 * 1000, // 5 minutes en millisecondes
  STALE_TIME: 2 * 60 * 1000,  // 2 minutes
} as const;

// Validation
export const VALIDATION = {
  TOKEN_MIN_LENGTH: 20,
  TOKEN_REGEX: /^[a-zA-Z0-9_-]+$/,
  TEAM_NAME_MIN_LENGTH: 2,
  TEAM_NAME_MAX_LENGTH: 50,
} as const;

// Timing
export const TIMING = {
  NOTIFICATION_CLEANUP_DELAY: 5000, // 5 secondes
  TOAST_DURATION: 3000,              // 3 secondes
  DEBOUNCE_SEARCH: 300,              // 300ms pour la recherche
} as const;

// URLs autorisées (whitelist)
export const ALLOWED_URLS = {
  PANDASCORE_LOGIN: 'https://app.pandascore.co/login',
  PANDASCORE_API: 'https://api.pandascore.co',
  YOUTUBE: 'https://www.youtube.com',
  TWITCH: 'https://www.twitch.tv',
} as const;

// Dimensions images
export const IMAGE_SIZES = {
  TEAM_LOGO_SMALL: { width: 40, height: 40 },
  TEAM_LOGO_MEDIUM: { width: 60, height: 60 },
  TEAM_LOGO_LARGE: { width: 80, height: 80 },
  GAME_LOGO: { width: 25, height: 25 },
  GAME_LOGO_SMALL: { width: 20, height: 20 },
} as const;

// Notifications
export const NOTIFICATION_CONFIG = {
  DEFAULT_DELAY_MINUTES: [0, 15, 30, 60], // Options de délai avant match
  MAX_SCHEDULED: 64, // Limite iOS
} as const;
