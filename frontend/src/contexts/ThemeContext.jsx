import React, { createContext, useContext, useEffect, useState } from 'react'
import { getTheme, getThemeNames } from '../themes/tokens'

const ThemeContext = createContext(null)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

const themeNames = getThemeNames()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved && themeNames.includes(saved) ? saved : 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const selectTheme = themeName => {
    if (themeNames.includes(themeName)) {
      setTheme(themeName)
    }
  }

  return (
    <ThemeContext.Provider
      value={{ theme: getTheme(theme), themeName: theme, setTheme: selectTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
