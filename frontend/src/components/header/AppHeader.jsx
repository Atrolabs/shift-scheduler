import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { useEmployee } from '../../contexts/EmployeeContext'
import { ROUTES } from '../../routes'
import { spacing } from '../../themes/tokens'
import LanguageSelector from '../controls/LanguageSelector'
import ThemeSelector from '../controls/ThemeSelector'
import IconButton from '../ui/IconButton'
import Pill from '../ui/Pill'

function AppHeader({ variant = 'dashboard' }) {
  const navigate = useNavigate()
  const { theme, themeName } = useTheme()
  const { t } = useLanguage()
  const employee = useEmployee()
  const nameRef = useRef(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    const check = () => setIsOverflowing(el.scrollWidth > el.clientWidth)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: 24 }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}></div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <LanguageSelector />
          <ThemeSelector />
          <IconButton
            icon={LogOut}
            onClick={() => navigate(ROUTES.LOGIN)}
            ariaLabel="Logout"
            theme={theme}
            themeName={themeName}
            size={48}
            variant="logout"
          />
        </div>
      </div>
      {variant === 'dashboard' && (
        <div style={{ paddingRight: 8 }}>
          <p style={{ color: theme.textSecondary, fontSize: 13, marginBottom: 4, fontWeight: 500 }}>
            {t('welcomeBack')}
          </p>
          <div
            ref={nameRef}
            style={{
              position: 'relative',
              overflow: 'hidden',
              maxWidth: '100%',
              height: '2.2em',
              marginBottom: 8,
            }}
          >
            {isOverflowing ? (
              <div
                style={{
                  display: 'flex',
                  gap: 32,
                  width: 'max-content',
                  animation: 'nameScroll 12s linear infinite',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(1.25rem, 5vw, 1.75rem)',
                    fontWeight: 800,
                    color: theme.textPrimary,
                    letterSpacing: '-0.5px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {employee.name}
                </div>
                <div
                  style={{
                    fontSize: 'clamp(1.25rem, 5vw, 1.75rem)',
                    fontWeight: 800,
                    color: theme.textPrimary,
                    letterSpacing: '-0.5px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {employee.name}
                </div>
              </div>
            ) : (
              <h1
                style={{
                  fontSize: 'clamp(1.25rem, 5vw, 1.75rem)',
                  fontWeight: 800,
                  color: theme.textPrimary,
                  letterSpacing: '-0.5px',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                {employee.name}
              </h1>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' }}>
            <Pill theme={theme} themeName={themeName}>
              {employee.role}
            </Pill>
          </div>
        </div>
      )}
      <style>{`
        @keyframes nameScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  )
}

export default AppHeader
