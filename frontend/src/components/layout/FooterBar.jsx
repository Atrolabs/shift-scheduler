import React from 'react'
import { Home } from 'lucide-react'
import { ROUTES } from '../../routes'
import { zIndex, needsShadow, shadows } from '../../themes/tokens'
import IconButton from '../ui/IconButton'

function FooterBar({ theme, themeName, navigate }) {
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
