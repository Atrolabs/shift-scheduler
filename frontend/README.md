# Shift Scheduler Frontend

Modern React frontend with centralized theming, i18n, and a clean, mobile-first UI. Works with the FastAPI backend and is deployable to S3/CloudFront.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

On the dev environment, the app will run on `http://localhost:3000` and proxy API calls to the FastAPI backend at `http://localhost:8000`.

## Project Structure

```
src/
├── components/
│   ├── background/     # Themed background visuals
│   ├── controls/       # Inputs and selectors (ThemeSelector, LanguageSelector)
│   ├── dashboard/      # Dashboard-specific building blocks (QuickMenu)
│   ├── header/         # AppHeader
│   ├── layout/         # AppLayout, FooterBar
│   ├── ui/             # UI primitives (Button, IconButton, Pill, SectionTitle)
│   └── visuals/        # Decorative visuals (KoiFish, PapajElements)
├── contexts/           # ThemeContext, LanguageContext
├── i18n/               # Translations (JSON files)
├── pages/              # Pages (DashboardPage, ShiftsPage, ...)
├── routes.js           # Route constants and labels
├── themes/             # Theme tokens and helpers (single source of truth)
├── App.jsx             # Routing
└── main.jsx            # Entry point
```

## Tech Overview

- **React**: 18.2.0
- **React DOM**: 18.2.0
- **React Router DOM**: 6.20.0
- **Vite**: 5.0.8
- **@vitejs/plugin-react**: 4.2.1
- **Framer Motion**: 11.18.2 (animation library)
- **Lucide React**: 0.446.0 (icon library)

### State Management

- **React Contexts**:
  - `ThemeContext` (reads from `themes/tokens.js`)
  - `LanguageContext` (reads JSON files in `i18n/`)

### Architecture

- Theming via `themes/tokens.js` only (no scattered conditionals)
- Mobile-first layout with `AppLayout` + sticky `FooterBar`

## Tutorials

### Add a new page

1. Create a new file in `src/pages/YourPage.jsx`:

```jsx
import React from 'react'

function YourPage() {
  return <div>Your content here</div>
}

export default YourPage
```

2. Add a route in `src/App.jsx` (prefer constants in `routes.js`):

```jsx
import YourPage from './pages/YourPage'
;<Route path="/your-page" element={<YourPage />} />
```

3. Use `AppLayout` to get the shared background/header/footer shell:

```jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import AppLayout from '../components/layout/AppLayout'
import SectionTitle from '../components/ui/SectionTitle'

function YourPage() {
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
      <SectionTitle theme={theme}>{t('myShifts')}</SectionTitle>
      {/* Your content here */}
    </AppLayout>
  )
}

export default YourPage
```

### Add a new language

1. Create a translation file in `src/i18n/` (e.g., `de.json`).
2. Add any new keys used by UI (e.g., `myShifts`, `settings`, `quickAccess`).
3. Restart dev server if files aren’t hot-reloaded.

### Add a new theme (single file change)

Edit `src/themes/tokens.js` and add a new entry to the theme registry:

```js
mytheme: {
  displayName: 'My Theme',
  background: 'linear-gradient(...)',
  cardBg: '...',
  cardBorder: '...',
  textPrimary: '#hex',
  textSecondary: '#hex',
  gridColor: 'rgba(...)',
  footerOverlayBg: 'rgba(...)',
  menu: { shifts: '#hex', availability: '#hex', profile: '#hex', settings: '#hex' },
  buttonBg: '...',
  logoutBg: '...',
  roleBg: '...',
  needsShadow: true,
  backgroundAnimations: true
}
```

- The theme picker auto-discovers the new theme via `getThemeNames()`.
- All components consume tokens from the registry; no other files need changes.

### Add a new quick-access tile on the Dashboard

1. Open `src/pages/DashboardPage.jsx`.
2. Extend the `menuItems` array with a new item, using a color from `getMenuColors(themeName).<key>`.
3. Add route and label in `routes.js` and translation in `i18n` files if needed.

## Calling FastAPI Backend

Use the `apiCall` utility:

```jsx
import { apiCall } from './utils/api'

// In your component:
const data = await apiCall('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email: '...', password: '...' }),
})
```

## Building for Production (S3/CloudFront)

1. Build the app:

```bash
npm run build
```

2. This creates a `dist` folder with static files

3. Upload `dist` folder contents to your S3 bucket

4. Configure CloudFront to:
   - Point to your S3 bucket
   - Set error pages: `404` and `403` should return `index.html` (for React Router)
   - Set default root object to `index.html`

## Environment Variables

Create `.env` file for production:

```
VITE_API_URL=https://your-api-url.com
```

In development, API calls use the proxy from `vite.config.js` (no env needed).

## Conventions

- Keep all theme-related values in `themes/tokens.js`.
- Use `AppLayout` for page shells; pages should render content only.
- Use `routes.js` constants to avoid string routes.
- Use `LanguageContext.t(key)` with keys defined in the JSON files under `i18n/`.

## Troubleshooting

- Theme not appearing in selector: confirm the theme key exists in `themes/tokens.js` and matches the stored `localStorage` value.
- Route not working on CloudFront: ensure 403/404 error responses return `index.html`.
