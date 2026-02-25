export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
}

export const borderRadius = {
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
  xxl: 20,
  full: 9999,
}

export const shadows = {
  sm: '0 2px 8px rgba(0,0,0,0.06)',
  md: '0 4px 16px rgba(0,0,0,0.06)',
  lg: '0 8px 24px rgba(0,0,0,0.08)',
  dark: '0 8px 32px rgba(0,0,0,0.3)',
}

export const zIndex = {
  base: 1,
  header: 10,
  footer: 50,
  modal: 100,
}

// Theme registry: add a new theme by adding a key here
// Each theme is self-contained: change values here only
const registry = {
  dark: {
    displayName: 'Dark',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f172a 100%)',
    cardBg: 'rgba(15, 23, 42, 0.6)',
    cardBorder: 'rgba(59, 130, 246, 0.2)',
    textPrimary: '#e2e8f0',
    textSecondary: '#94a3b8',
    gridColor: 'rgba(59, 130, 246, 0.08)',
    footerOverlayBg: 'rgba(0,0,0,0.25)',
    menu: { shifts: '#06b6d4', availability: '#10b981', profile: '#8b5cf6', settings: '#ec4899' },
    buttonBg: 'rgba(59, 130, 246, 0.2)',
    logoutBg: 'rgba(239, 68, 68, 0.2)',
    roleBg: 'rgba(59, 130, 246, 0.2)',
    needsShadow: false,
    backgroundAnimations: true,
  },
  warm: {
    displayName: 'Warm',
    background: 'linear-gradient(180deg, #fef7ed 0%, #fff7ed 50%, #fef3c7 100%)',
    cardBg: '#fff',
    cardBorder: '#fef3c7',
    textPrimary: '#78350f',
    textSecondary: '#92400e',
    gridColor: 'rgba(249, 115, 22, 0.05)',
    footerOverlayBg: 'rgba(255,255,255,0.6)',
    menu: { shifts: '#f97316', availability: '#22c55e', profile: '#eab308', settings: '#a855f7' },
    buttonBg: '#fff',
    logoutBg: '#fee2e2',
    roleBg: '#fef3c7',
    needsShadow: true,
    backgroundAnimations: true,
  },
  catppuccin: {
    displayName: 'Catppuccin',
    background: 'linear-gradient(135deg, #1e1e2e 0%, #181825 50%, #11111b 100%)',
    cardBg: 'rgba(30, 30, 46, 0.8)',
    cardBorder: 'rgba(137, 180, 250, 0.2)',
    textPrimary: '#cdd6f4',
    textSecondary: '#bac2de',
    gridColor: 'rgba(137, 180, 250, 0.08)',
    footerOverlayBg: 'rgba(0,0,0,0.25)',
    menu: { shifts: '#89b4fa', availability: '#a6e3a1', profile: '#cba6f7', settings: '#f38ba8' },
    buttonBg: 'rgba(30, 30, 46, 0.8)',
    logoutBg: 'rgba(243, 139, 168, 0.2)',
    roleBg: 'rgba(137, 180, 250, 0.2)',
    needsShadow: false,
    backgroundAnimations: true,
  },
  fish: {
    displayName: 'Fish',
    background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 30%, #14b8a6 60%, #10b981 100%)',
    cardBg: 'rgba(15, 23, 42, 0.7)',
    cardBorder: 'rgba(20, 184, 166, 0.4)',
    textPrimary: '#e0f2fe',
    textSecondary: '#bae6fd',
    gridColor: 'rgba(20, 184, 166, 0.15)',
    footerOverlayBg: 'rgba(255,255,255,0.6)',
    menu: { shifts: '#0ea5e9', availability: '#06b6d4', profile: '#14b8a6', settings: '#10b981' },
    buttonBg: 'rgba(20, 184, 166, 0.3)',
    logoutBg: 'rgba(239, 68, 68, 0.2)',
    roleBg: 'rgba(20, 184, 166, 0.3)',
    needsShadow: false,
    backgroundAnimations: true,
  },
  papaj: {
    displayName: 'Papaj',
    background: 'linear-gradient(135deg, #ffff00 0%, #ffd700 30%, #ffff00 60%, #fffacd 100%)',
    cardBg: 'rgba(255, 255, 0, 0.25)',
    cardBorder: 'rgba(255, 255, 255, 0.4)',
    textPrimary: '#1a1a1a',
    textSecondary: '#4a4a00',
    gridColor: 'rgba(255, 255, 255, 0.2)',
    footerOverlayBg: 'rgba(255,255,255,0.6)',
    menu: { shifts: '#ffff00', availability: '#ffd700', profile: '#fffacd', settings: '#ffffff' },
    buttonBg: 'rgba(255, 255, 0, 0.3)',
    logoutBg: 'rgba(255, 255, 0, 0.3)',
    roleBg: 'rgba(255, 255, 0, 0.3)',
    needsShadow: false,
    backgroundAnimations: true,
  },
  evangelion: {
    displayName: 'Evangelion',
    background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 30%, #16213e 60%, #0f0a1a 100%)',
    cardBg: 'rgba(27, 10, 46, 0.7)',
    cardBorder: 'rgba(139, 0, 255, 0.4)',
    textPrimary: '#e0e0ff',
    textSecondary: '#b8b8ff',
    gridColor: 'rgba(0, 255, 255, 0.15)',
    footerOverlayBg: 'rgba(0,0,0,0.25)',
    menu: { shifts: '#8b00ff', availability: '#00ffff', profile: '#ff6b00', settings: '#9d4edd' },
    buttonBg: 'rgba(139, 0, 255, 0.3)',
    logoutBg: 'rgba(255, 107, 0, 0.3)',
    roleBg: 'rgba(139, 0, 255, 0.3)',
    needsShadow: false,
    backgroundAnimations: true,
  },
}

const fallback = 'catppuccin'

export function getMenuColors(themeName) {
  return (registry[themeName] || registry[fallback]).menu
}

export function getThemeNames() {
  return Object.keys(registry)
}

export function getTheme(themeName) {
  return registry[themeName] || registry[fallback]
}

export function getLogoutIconColor(themeName) {
  // Some themes want a special logout icon accent
  if (themeName === 'evangelion' || themeName === 'papaj') return '#ff6b00'
  return null
}

export function getButtonBg(themeName) {
  return (registry[themeName] || registry[fallback]).buttonBg
}

export function getLogoutBg(themeName) {
  return (registry[themeName] || registry[fallback]).logoutBg
}

export function getRoleBg(themeName) {
  return (registry[themeName] || registry[fallback]).roleBg
}

export function needsShadow(themeName) {
  return (registry[themeName] || registry[fallback]).needsShadow
}
