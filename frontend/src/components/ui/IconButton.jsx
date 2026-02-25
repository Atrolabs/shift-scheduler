import React from 'react'
import { motion } from 'framer-motion'
import {
  getButtonBg,
  getLogoutBg,
  borderRadius,
  needsShadow,
  shadows,
  getLogoutIconColor,
} from '../../themes/tokens'

function IconButton({
  icon: Icon,
  onClick,
  ariaLabel,
  theme,
  themeName,
  size = 48,
  variant = 'primary',
  style,
  ...props
}) {
  const baseStyle = {
    width: size,
    height: size,
    borderRadius: borderRadius.xl,
    border: `2px solid ${theme.cardBorder}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    boxShadow: needsShadow(themeName) ? shadows.sm : 'none',
    background: variant === 'logout' ? getLogoutBg(themeName) : getButtonBg(themeName),
    ...style,
  }

  const iconSize = size === 56 ? 22 : size === 40 ? 18 : 20
  const iconColor = (() => {
    if (variant === 'logout') {
      const special = getLogoutIconColor(themeName)
      return special || theme.textPrimary
    }
    return theme.textPrimary
  })()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={ariaLabel}
      style={baseStyle}
      {...props}
    >
      {Icon && <Icon size={iconSize} color={iconColor} />}
    </motion.button>
  )
}

export default IconButton
