import { appConfig } from "~/config/app"

export const getAuthToken = (): string | null => {
  return localStorage.getItem(appConfig.auth.tokenKey)
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(appConfig.auth.refreshTokenKey)
}

export const setAuthToken = (token: string): void => {
  localStorage.setItem(appConfig.auth.tokenKey, token)
}

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(appConfig.auth.refreshTokenKey, token)
}

export const removeAuthToken = (): void => {
  localStorage.removeItem(appConfig.auth.tokenKey)
  localStorage.removeItem(appConfig.auth.refreshTokenKey)
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  } catch (error) {
    return true
  }
}

export const hasPermission = (userPermissions: string[], requiredPermission: string): boolean => {
  return userPermissions.includes(requiredPermission) || userPermissions.includes('admin')
}

export const hasRole = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = {
    admin: ['admin', 'user'],
    user: ['user'],
  }
  
  return roleHierarchy[userRole as keyof typeof roleHierarchy]?.includes(requiredRole) || false
}