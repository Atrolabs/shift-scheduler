import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { ROUTES } from './routes'
import DashboardPage from './pages/DashboardPage'
import ShiftsPage from './pages/ShiftsPage'
import AvailabilityPage from './pages/AvailabilityPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.SHIFTS} element={<ShiftsPage />} />
            <Route path={ROUTES.AVAILABILITY} element={<AvailabilityPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
