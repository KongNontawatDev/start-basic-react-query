import { ThemeConfig } from 'antd'

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0ea5e9',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    borderRadius: 8,
    wireframe: false,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#fafafa',
      bodyBg: '#ffffff',
    },
    Menu: {
      itemBg: 'transparent',
      itemHoverBg: '#f3f4f6',
      itemSelectedBg: '#e0f2fe',
      itemSelectedColor: '#0ea5e9',
    },
    Button: {
      borderRadius: 8,
      controlHeight: 40,
      fontWeight: 500,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 12,
      paddingLG: 24,
    },
    Table: {
      borderRadius: 8,
      headerBg: '#fafafa',
    },
    Tabs: {
      borderRadius: 8,
    },
    Modal: {
      borderRadius: 12,
    },
    Drawer: {
      borderRadius: 12,
    },
  },
  algorithm: [], // Will be dynamically set based on theme mode
}

export const darkTheme: ThemeConfig = {
  ...antdTheme,
  algorithm: [],
  token: {
    ...antdTheme.token,
    colorBgBase: '#1f2937',
    colorTextBase: '#f9fafb',
  },
  components: {
    ...antdTheme.components,
    Layout: {
      headerBg: '#1f2937',
      siderBg: '#111827',
      bodyBg: '#1f2937',
    },
    Menu: {
      itemBg: 'transparent',
      itemHoverBg: '#374151',
      itemSelectedBg: '#1e40af',
      itemSelectedColor: '#60a5fa',
    },
  },
}