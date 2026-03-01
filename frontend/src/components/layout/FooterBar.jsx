import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { ROUTES } from '../../routes'
import { zIndex, needsShadow, shadows } from '../../themes/tokens'
import IconButton from '../ui/IconButton'

function FooterBar() {
  const navigate = useNavigate()
  const { theme, themeName } = useTheme()

  const barStyle = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(6px)',
    background: theme.footerOverlayBg,
    borderTop: `2px solid ${theme.cardBorder}`,
    zIndex: zIndex.footer,
  }

  return (
    <div style={barStyle}>
      <IconButton
        icon={Home}
        onClick={() => navigate(ROUTES.DASHBOARD)}
        ariaLabel="Go to home"
        theme={theme}
        themeName={themeName}
        size={56}
        style={{
          borderRadius: 28,
          background: theme.cardBg,
          boxShadow: needsShadow(themeName) ? shadows.lg : shadows.dark,
        }}
      />
    </div>
  )
}

export default FooterBar
