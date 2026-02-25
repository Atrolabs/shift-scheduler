import React from 'react'
import { motion } from 'framer-motion'
import { getButtonBg, getLogoutBg, borderRadius, needsShadow, shadows } from '../../themes/tokens'

function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  theme,
  themeName,
  style,
  ...props
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: `2px solid ${theme.cardBorder}`,
    fontWeight: 600,
    transition: 'all 0.2s ease',
    ...style,
  }

  const sizeStyles = {
    sm: { height: 40, padding: '0 14px', borderRadius: borderRadius.xxl, fontSize: 13 },
    md: { height: 48, padding: '0 16px', borderRadius: borderRadius.xl, fontSize: 14 },
    lg: { height: 56, padding: '0 20px', borderRadius: borderRadius.xl, fontSize: 15 },
  }

  const variantStyles = {
    primary: {
      background: getButtonBg(themeName),
      color: theme.textPrimary,
      boxShadow: needsShadow(themeName) ? shadows.sm : 'none',
    },
    logout: {
      background: getLogoutBg(themeName),
      color: theme.textPrimary,
      boxShadow: needsShadow(themeName) ? shadows.sm : 'none',
    },
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
