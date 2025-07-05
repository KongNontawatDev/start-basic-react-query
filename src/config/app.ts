export const appConfig = {
  // App information
  name: import.meta.env.VITE_APP_NAME || 'Modern React Starter',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  env: import.meta.env.VITE_APP_ENV || 'development',

  // API configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
    enableMock: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
  },

  // Authentication
  auth: {
    tokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || 'authToken',
    refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refreshToken',
    loginPath: '/login',
    homePath: '/dashboard',
  },

  // Feature flags
  features: {
    enableDevtools: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',
    enableAnalytics: !!import.meta.env.VITE_GA_TRACKING_ID,
    enableErrorReporting: !!import.meta.env.VITE_SENTRY_DSN,
  },

  // Theme
  theme: {
    defaultMode: (import.meta.env.VITE_DEFAULT_THEME || 'light') as 'light' | 'dark',
    storageKey: 'theme-mode',
  },

  // External services
  services: {
    analyticsId: import.meta.env.VITE_GA_TRACKING_ID,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  },

  // Pagination defaults
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100'],
  },

  // File upload limits
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  },
} as const

export type AppConfig = typeof appConfig