import { needsShadow, shadows } from './tokens'

export function withAlpha(color, opacity) {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`)
  }
  return color
}

export function getShadow(themeName, level = 'md') {
  if (needsShadow(themeName)) {
    return shadows[level]
  }
  return level === 'lg' ? shadows.dark : 'none'
}
