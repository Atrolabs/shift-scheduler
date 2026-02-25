import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { ROUTES, ROUTE_LABELS } from '../routes'
import AppLayout from '../components/layout/AppLayout'
import SectionTitle from '../components/ui/SectionTitle'

function SettingsPage() {
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
      <SectionTitle theme={theme}>{t(ROUTE_LABELS[ROUTES.SETTINGS])}</SectionTitle>
    </AppLayout>
  )
}

export default SettingsPage
