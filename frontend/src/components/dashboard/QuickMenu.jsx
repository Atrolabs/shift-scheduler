import React from 'react'
import { motion } from 'framer-motion'
import { needsShadow, shadows } from '../../themes/tokens'

function QuickMenu({ menuItems, theme, themeName, onNavigate, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="section"
    >
      <h3
        style={{ color: theme.textPrimary, fontSize: '1.25rem', fontWeight: 700, marginBottom: 16 }}
      >
        {t('quickAccess')}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
        }}
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.6 + index * 0.05,
                duration: 0.4,
                default: { duration: 0.15, ease: 'easeOut' },
              }}
              whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.15, ease: 'easeOut' } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.15, ease: 'easeOut' } }}
              onClick={() => onNavigate(item.path)}
              style={{
                background: theme.cardBg,
                border: `2px solid ${theme.cardBorder}`,
                borderRadius: 20,
                padding: 20,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                alignItems: 'flex-start',
                boxShadow: needsShadow(themeName) ? shadows.lg : shadows.dark,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `${item.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={24} color={item.color} />
              </div>
              <span style={{ color: theme.textPrimary, fontWeight: 600, fontSize: 14 }}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default QuickMenu
