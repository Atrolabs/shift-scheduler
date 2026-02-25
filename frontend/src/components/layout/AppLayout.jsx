import React from 'react'
import ThemeBackground from '../background/ThemeBackground'
import AppHeader from '../header/AppHeader'
import FooterBar from './FooterBar'

function AppLayout({ theme, themeName, t, employee, navigate, variant = 'page', children }) {
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
        <AppHeader
          theme={theme}
          themeName={themeName}
          t={t}
          employee={employee}
          navigate={navigate}
          variant={variant}
        />
        {children}
      </div>
      <FooterBar theme={theme} themeName={themeName} navigate={navigate} />
    </div>
  )
}

export default AppLayout
