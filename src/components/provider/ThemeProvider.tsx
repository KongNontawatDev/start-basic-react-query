import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useStore } from '@tanstack/react-store'
import { uiActions, uiStore } from '~/stores/uiStore'

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const uiState = useStore(uiStore)
  useEffect(() => {
    // Hydrate state จาก localStorage และขนาดหน้าจอ
    uiActions.hydrateFromClient()
  
    // ✅ Attach resize listener แบบ SSR-safe
    const handleResize = () => {
      uiActions.setMobile(window.innerWidth < 768)
    }
  
    window.addEventListener('resize', handleResize)
  
    // cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(uiState.theme)
    
    // Update meta theme-color
    const themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', uiState.theme === 'dark' ? '#1f2937' : '#0ea5e9')
    }
  }, [uiState.theme])

  const contextValue: ThemeContextType = {
    theme: uiState.theme,
    toggleTheme: uiActions.toggleTheme,
    setTheme: uiActions.setTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}