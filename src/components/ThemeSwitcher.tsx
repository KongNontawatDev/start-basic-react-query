// src/components/ThemeSwitcher.tsx
import { Button } from 'antd'
import { useTheme } from './provider/ThemeProvider'
import { MoonOutlined,SunOutlined } from '@ant-design/icons';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      shape="circle"
      size="middle"
      type="text"
      className="flex items-center justify-center transition hover:bg-gray-100 dark:hover:bg-gray-700"
      icon={
        theme === 'light' ? (
          <MoonOutlined className="w-4 h-4 text-gray-800" />
        ) : (
          <SunOutlined className="w-4 h-4 text-yellow-400" />
        )
      }
      aria-label="Toggle theme"
    />
  )
}
