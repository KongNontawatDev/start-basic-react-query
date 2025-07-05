/**
 * Query key factory for React Query
 * This ensures consistent and hierarchical query key management
 */

export const queryKeys = {
  // Base keys
  all: ['app'] as const,
  
  // Auth keys
  auth: () => [...queryKeys.all, 'auth'] as const,
  authUser: () => [...queryKeys.auth(), 'user'] as const,
  authProfile: () => [...queryKeys.auth(), 'profile'] as const,
  
  // User keys
  users: () => [...queryKeys.all, 'users'] as const,
  usersList: (filters?: Record<string, any>) => [...queryKeys.users(), 'list', filters] as const,
  usersDetail: (id: string) => [...queryKeys.users(), 'detail', id] as const,
  
  // Dashboard keys
  dashboard: () => [...queryKeys.all, 'dashboard'] as const,
  dashboardStats: () => [...queryKeys.dashboard(), 'stats'] as const,
  dashboardCharts: (period?: string) => [...queryKeys.dashboard(), 'charts', period] as const,
  
  // Products keys (example)
  products: () => [...queryKeys.all, 'products'] as const,
  productsList: (filters?: Record<string, any>) => [...queryKeys.products(), 'list', filters] as const,
  productsDetail: (id: string) => [...queryKeys.products(), 'detail', id] as const,
  productsSearch: (query: string) => [...queryKeys.products(), 'search', query] as const,
  
  // Orders keys (example)
  orders: () => [...queryKeys.all, 'orders'] as const,
  ordersList: (filters?: Record<string, any>) => [...queryKeys.orders(), 'list', filters] as const,
  ordersDetail: (id: string) => [...queryKeys.orders(), 'detail', id] as const,
  ordersHistory: (userId: string) => [...queryKeys.orders(), 'history', userId] as const,
  
  // Settings keys
  settings: () => [...queryKeys.all, 'settings'] as const,
  settingsGeneral: () => [...queryKeys.settings(), 'general'] as const,
  settingsNotifications: () => [...queryKeys.settings(), 'notifications'] as const,
  
  // Analytics keys
  analytics: () => [...queryKeys.all, 'analytics'] as const,
  analyticsOverview: (period?: string) => [...queryKeys.analytics(), 'overview', period] as const,
  analyticsReports: (type: string, period?: string) => [...queryKeys.analytics(), 'reports', type, period] as const,
} as const

/**
 * Type helper for query keys
 */
export type QueryKey = typeof queryKeys[keyof typeof queryKeys]

/**
 * Invalidation helpers
 */
export const invalidationKeys = {
  // Invalidate all auth queries
  auth: () => queryKeys.auth(),
  
  // Invalidate all user queries
  users: () => queryKeys.users(),
  
  // Invalidate specific user
  user: (id: string) => queryKeys.usersDetail(id),
  
  // Invalidate dashboard
  dashboard: () => queryKeys.dashboard(),
  
  // Invalidate all products
  products: () => queryKeys.products(),
  
  // Invalidate specific product
  product: (id: string) => queryKeys.productsDetail(id),
  
  // Invalidate all orders
  orders: () => queryKeys.orders(),
  
  // Invalidate specific order
  order: (id: string) => queryKeys.ordersDetail(id),
  
  // Invalidate settings
  settings: () => queryKeys.settings(),
  
  // Invalidate analytics
  analytics: () => queryKeys.analytics(),
} as const