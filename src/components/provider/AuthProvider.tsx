import { createContext, useContext, useEffect, ReactNode } from 'react'
import { User } from '~/utils/users'
import { useStore } from '@tanstack/react-store'
import { authActions, authStore } from '~/stores/authStore'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  checkAuth: () => Promise<boolean>
  updateProfile: (profileData: any) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authState = useStore(authStore)

  // Check authentication on mount
  useEffect(() => {
    authActions.checkAuth()
  }, [])

  const contextValue: AuthContextType = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login: authActions.login,
    logout: authActions.logout,
    checkAuth: authActions.checkAuth,
    updateProfile: authActions.updateProfile,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}