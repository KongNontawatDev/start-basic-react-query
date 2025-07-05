import { Store } from '@tanstack/store'
import { appConfig } from '~/config/app'

export interface User {
  id: number
  email: string
  name: string
  avatar?: string
  role: string
  permissions: string[]
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export const authStore = new Store<AuthState>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
})

// Auth actions
export const authActions = {
  setLoading: (isLoading: boolean) => {
    authStore.setState((state) => ({
      ...state,
      isLoading,
    }))
  },

  setError: (error: string | null) => {
    authStore.setState((state) => ({
      ...state,
      error,
    }))
  },

  setUser: (user: User | null) => {
    authStore.setState((state) => ({
      ...state,
      user,
      isAuthenticated: !!user,
      error: null,
    }))
  },

  login: async (credentials: { email: string; password: string }) => {
    authActions.setLoading(true)
    authActions.setError(null)

    try {
      // Mock login - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        const user: User = {
          id: 1,
          email: credentials.email,
          name: 'Admin User',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          role: 'admin',
          permissions: ['read', 'write', 'delete'],
        }
        
        // Store tokens
        localStorage.setItem(appConfig.auth.tokenKey, 'mock-jwt-token')
        localStorage.setItem(appConfig.auth.refreshTokenKey, 'mock-refresh-token')
        
        authActions.setUser(user)
        return { success: true }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      authActions.setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      authActions.setLoading(false)
    }
  },

  logout: () => {
    // Remove tokens
    localStorage.removeItem(appConfig.auth.tokenKey)
    localStorage.removeItem(appConfig.auth.refreshTokenKey)
    
    // Clear user state
    authActions.setUser(null)
  },

  checkAuth: async () => {
    const token = localStorage.getItem(appConfig.auth.tokenKey)
    if (!token) {
      authActions.setUser(null)
      return false
    }

    authActions.setLoading(true)
    
    try {
      // Mock auth check - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      const user: User = {
        id: 1,
        email: 'admin@example.com',
        name: 'Admin User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        role: 'admin',
        permissions: ['read', 'write', 'delete'],
      }
      
      authActions.setUser(user)
      return true
    } catch (error) {
      authActions.logout()
      return false
    } finally {
      authActions.setLoading(false)
    }
  },

  updateProfile: async (profileData: Partial<User>) => {
    authActions.setLoading(true)
    
    try {
      // Mock profile update - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const currentUser = authStore.state.user
      if (currentUser) {
        const updatedUser = { ...currentUser, ...profileData }
        authActions.setUser(updatedUser)
        return { success: true }
      }
      
      throw new Error('No user logged in')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed'
      authActions.setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      authActions.setLoading(false)
    }
  },
}