import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { ROUTES } from '../routes'
import AppLayout from '../components/layout/AppLayout'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'

function NotFoundPage() {
  const navigate = useNavigate()
  const { theme, themeName } = useTheme()
  const { t } = useLanguage()
  const [employee] = useState({ name: 'John Doe', role: 'Server' })

  return (
    <AppLayout
      theme={theme}
      themeName={themeName}
      t={t}
      employee={employee}
      navigate={navigate}
      variant="page"
    >
      <SectionTitle theme={theme}>{t('notFound')}</SectionTitle>
      <p style={{ color: theme.textSecondary, marginBottom: 24 }}>{t('notFoundMessage')}</p>
      <Button onClick={() => navigate(ROUTES.DASHBOARD)} theme={theme} themeName={themeName}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Home size={18} />
          <span>{t('goHome')}</span>
        </div>
      </Button>
    </AppLayout>
  )
}

export default NotFoundPage
