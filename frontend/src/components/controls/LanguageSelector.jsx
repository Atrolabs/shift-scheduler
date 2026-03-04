import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Languages, Check } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { getButtonBg, getMenuColors, needsShadow, shadows } from '../../themes/tokens'
import { useLanguage } from '../../contexts/LanguageContext'
import { useClickOutside } from '../../hooks/useClickOutside'

const languages = [
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'pl', name: 'Polski', flag: '🇵🇱' },
  { id: 'ja', name: '日本語', flag: '🇯🇵' },
  { id: 'ru', name: 'Русский', flag: '🇷🇺' },
]

export default function LanguageSelector() {
  const { theme, themeName } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen)

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 48,
          height: 48,
          borderRadius: 16,
          background: getButtonBg(themeName),
          border: `2px solid ${theme.cardBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: needsShadow(themeName) ? shadows.sm : 'none',
        }}
        title="Select language"
      >
        <Languages size={20} color={theme.textPrimary} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              background: theme.cardBg,
              borderRadius: 16,
              border: `2px solid ${theme.cardBorder}`,
              padding: 8,
              minWidth: 160,
              boxShadow: needsShadow(themeName) ? shadows.lg : shadows.dark,
              zIndex: 1000,
              backdropFilter: 'blur(10px)',
            }}
          >
            {languages.map(langOption => {
              const isActive = language === langOption.id
              return (
                <motion.button
                  key={langOption.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setLanguage(langOption.id)
                    setIsOpen(false)
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: isActive ? getButtonBg(themeName) : 'transparent',
                    border: isActive ? `2px solid ${theme.cardBorder}` : '2px solid transparent',
                    color: theme.textPrimary,
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    marginBottom: languages.indexOf(langOption) < languages.length - 1 ? 4 : 0,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{langOption.flag}</span>
                    <span>{langOption.name}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: getMenuColors(themeName).shifts,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={12} color="#fff" />
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
