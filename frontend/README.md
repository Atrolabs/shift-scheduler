# Shift Scheduler Frontend

React SPA with centralized theming, i18n, and a mobile-first UI. Deployed to S3/CloudFront.

## Setup

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000` and proxies API calls to `http://localhost:8000`.

## Project Structure

```
src/
├── components/
│   ├── background/     # Themed background visuals
│   ├── controls/       # Inputs and selectors (ThemeSelector, LanguageSelector)
│   ├── dashboard/      # Dashboard building blocks (QuickMenu)
│   ├── header/         # AppHeader
│   ├── layout/         # AppLayout, FooterBar
│   ├── ui/             # Primitives (Button, IconButton, Pill, SectionTitle)
│   └── visuals/        # Decorative visuals (KoiFish, PapajElements)
├── contexts/           # ThemeContext, LanguageContext, EmployeeContext
├── hooks/              # Custom hooks (useClickOutside)
├── i18n/               # Translation JSON files
├── pages/              # Page components
├── themes/             # Theme tokens (single source of truth)
├── utils/              # Utilities (apiCall)
├── routes.js           # Route constants and labels
├── App.jsx             # Routing and providers
└── main.jsx            # Entry point
```

## Tech Overview

- **React** 18.2 with **React Router DOM** 6.20
- **Vite** 5.0 (build tool and dev server)
- **Framer Motion** 11.18 (animations)
- **Lucide React** 0.555 (icons)

## Architecture

### State Management

All state is managed via React Contexts consumed through hooks:

| Context | Hook | Purpose |
|---------|------|---------|
| `ThemeContext` | `useTheme()` | Theme tokens from `themes/tokens.js` |
| `LanguageContext` | `useLanguage()` | i18n translations from `i18n/*.json` |
| `EmployeeContext` | `useEmployee()` | Current employee data |

Pages and layout components consume contexts directly — no prop drilling.

### Layout

- `AppLayout` provides the shared shell (background, header, footer)
- Pages render content inside `AppLayout` with a `variant` prop (`"dashboard"` or `"page"`)
- `FooterBar` is sticky and handles navigation via `useNavigate()`

### Theming

All theme values live in `themes/tokens.js`. Components read tokens from context — no scattered conditionals or inline color literals.

## Tutorials

### Add a New Page

1. Create `src/pages/YourPage.jsx`:

```jsx
import React from "react";
import AppLayout from "../components/layout/AppLayout";
import SectionTitle from "../components/ui/SectionTitle";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

function YourPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <AppLayout variant="page">
      <SectionTitle theme={theme}>{t("yourPageTitle")}</SectionTitle>
      {/* Page content */}
    </AppLayout>
  );
}

export default YourPage;
```

2. Add a route constant in `src/routes.js`.

3. Wire the route in `src/App.jsx`:

```jsx
import YourPage from "./pages/YourPage";
// Inside <Routes>:
<Route path={ROUTES.YOUR_PAGE} element={<YourPage />} />;
```

### Add a New Language

1. Create a translation file in `src/i18n/` (e.g., `de.json`).
2. Add all keys used by the UI (`myShifts`, `settings`, `quickAccess`, etc.).

### Add a New Theme

Add an entry in `src/themes/tokens.js`:

```js
mytheme: {
  displayName: 'My Theme',
  background: 'linear-gradient(...)',
  cardBg: '...',
  cardBorder: '...',
  textPrimary: '#hex',
  textSecondary: '#hex',
  // ... see existing themes for full shape
}
```

The theme picker auto-discovers new themes via `getThemeNames()`.

### Add a Dashboard Quick-Access Tile

1. Extend `menuItems` in `src/pages/DashboardPage.jsx`.
2. Use a color from `getMenuColors(themeName).<key>`.
3. Add a route constant in `routes.js` and translation keys in `i18n/` files.

## API Calls

Use the `apiCall` utility for backend requests:

```js
import { apiCall } from "./utils/api";

const data = await apiCall("/auth/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});
```

In development, Vite proxies `/api` to the backend. In production, set `VITE_API_URL` in `.env`.

## Production Build

```bash
npm run build
```

Deploy the `dist/` folder to S3. CloudFront must return `index.html` for 403/404 errors (React Router SPA fallback).

## Conventions

- Theme values in `themes/tokens.js` only — never scatter color literals
- Use `AppLayout` for page shells — pages render content only
- Use `routes.js` constants — avoid hardcoded route strings
- Use `useLanguage().t(key)` for all user-facing text
