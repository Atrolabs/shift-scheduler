import React from 'react'
import { getRoleBg, borderRadius } from '../../themes/tokens'

function Pill({ children, theme, themeName, style, ...props }) {
  const pillStyle = {
    padding: '4px 10px',
    background: getRoleBg(themeName),
    borderRadius: borderRadius.sm,
    fontSize: 12,
    fontWeight: 600,
    color: theme.textPrimary,
    display: 'inline-flex',
    alignItems: 'center',
    ...style,
  }

  return (
    <div style={pillStyle} {...props}>
      {children}
    </div>
  )
}

export default Pill
