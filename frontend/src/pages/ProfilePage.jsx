import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { ROUTES, ROUTE_LABELS } from '../routes'
import AppLayout from '../components/layout/AppLayout'
import SectionTitle from '../components/ui/SectionTitle'

function ProfilePage() {
  const { theme } = useTheme()
  const { t } = useLanguage()

  return (
    <AppLayout variant="page">
      <SectionTitle theme={theme}>{t(ROUTE_LABELS[ROUTES.PROFILE])}</SectionTitle>
    </AppLayout>
  )
}

export default ProfilePage
