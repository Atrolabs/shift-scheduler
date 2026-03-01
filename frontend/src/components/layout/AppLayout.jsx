import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import ThemeBackground from '../background/ThemeBackground'
import AppHeader from '../header/AppHeader'
import FooterBar from './FooterBar'

function AppLayout({ variant = 'page', children }) {
  const { theme, themeName } = useTheme()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.background,
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: '80px',
        color: theme.textPrimary,
      }}
    >
      <ThemeBackground theme={theme} themeName={themeName} />
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 24 }}>
        <AppHeader variant={variant} />
        {children}
      </div>
      <FooterBar />
    </div>
  )
}

export default AppLayout
