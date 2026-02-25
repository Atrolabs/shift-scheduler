import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import SectionTitle from '../components/ui/SectionTitle'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { ROUTES, ROUTE_LABELS } from '../routes'

function AvailabilityPage() {
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
      <SectionTitle theme={theme}>{t(ROUTE_LABELS[ROUTES.AVAILABILITY])}</SectionTitle>
    </AppLayout>
  )
}

export default AvailabilityPage
