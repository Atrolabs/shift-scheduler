import React, { useState, useMemo } from 'react'
import { Calendar, User, CheckCircle2, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { ROUTES, ROUTE_LABELS } from '../routes'
import { getMenuColors } from '../themes/tokens'
import QuickMenu from '../components/dashboard/QuickMenu'
import AppLayout from '../components/layout/AppLayout'

function DashboardPage() {
  const navigate = useNavigate()
  const { theme, themeName } = useTheme()
  const { t } = useLanguage()

  const [employee] = useState({
    name: 'John Doe',
    role: 'Server',
  })

  const menuColors = useMemo(() => getMenuColors(themeName), [themeName])

  const menuItems = useMemo(
    () => [
      {
        id: 1,
        label: t(ROUTE_LABELS[ROUTES.SHIFTS]),
        icon: Calendar,
        path: ROUTES.SHIFTS,
        color: menuColors.shifts,
      },
      {
        id: 2,
        label: t(ROUTE_LABELS[ROUTES.AVAILABILITY]),
        icon: CheckCircle2,
        path: ROUTES.AVAILABILITY,
        color: menuColors.availability,
      },
      {
        id: 3,
        label: t(ROUTE_LABELS[ROUTES.PROFILE]),
        icon: User,
        path: ROUTES.PROFILE,
        color: menuColors.profile,
      },
      {
        id: 4,
        label: t(ROUTE_LABELS[ROUTES.SETTINGS]),
        icon: Settings,
        path: ROUTES.SETTINGS,
        color: menuColors.settings,
      },
    ],
    [t, menuColors]
  )

  return (
    <AppLayout
      theme={theme}
      themeName={themeName}
      t={t}
      employee={employee}
      navigate={navigate}
      variant="dashboard"
    >
      <QuickMenu
        menuItems={menuItems}
        theme={theme}
        themeName={themeName}
        onNavigate={path => navigate(path)}
        t={t}
      />
    </AppLayout>
  )
}

export default DashboardPage
