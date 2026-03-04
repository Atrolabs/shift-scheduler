<div align="center">

# Shift Scheduler Frontend

**React SPA with centralized theming, i18n, and a mobile-first UI. Deployed to S3/CloudFront.**

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-0055FF?style=for-the-badge&logo=framer&logoColor=white)

</div>

---

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| [Node.js](https://nodejs.org/) | 22.x LTS | Runtime (`frontend/.nvmrc`) |
| [npm](https://www.npmjs.com/) | Latest | Package manager |

## Setup

```bash
just fe-install   # install dependencies
just fe-dev       # start dev server
```

Or directly:

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:3000` and proxies API calls to `http://localhost:8000`.

> [!TIP]
> Run `just dev` from the repo root to start both frontend and backend servers in parallel.

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

## Tech Stack

| Technology | Version | Purpose | Docs |
|------------|---------|---------|------|
| React | 18.2 | UI framework | [react.dev](https://react.dev/) |
| React Router DOM | 6.20 | Client-side routing | [reactrouter.com](https://reactrouter.com/) |
| Vite | 5.0 | Build tool & dev server | [vite.dev](https://vite.dev/) |
| Framer Motion | 11.18 | Animations | [motion.dev](https://motion.dev/) |
| Lucide React | 0.555 | Icons | [lucide.dev](https://lucide.dev/) |

<details>
<summary><strong>Dev Dependencies</strong></summary>

<br>

| Tool | Version | Purpose |
|------|---------|---------|
| @vitejs/plugin-react | 4.2 | Vite React plugin |
| Prettier | — | Code formatter |

</details>

## Architecture

### State Management

All state is managed via React Contexts consumed through hooks — no prop drilling.

| Context | Hook | Purpose |
|---------|------|---------|
| `ThemeContext` | `useTheme()` | Theme tokens from `themes/tokens.js` |
| `LanguageContext` | `useLanguage()` | i18n translations from `i18n/*.json` |
| `EmployeeContext` | `useEmployee()` | Current employee data |

### Layout

| Component | Role |
|-----------|------|
| `AppLayout` | Shared shell (background, header, footer). Pages pass `variant="dashboard"` or `variant="page"` |
| `FooterBar` | Sticky bottom nav, handles routing via `useNavigate()` |

### Theming

All theme values live in `themes/tokens.js`. Components read tokens from context — no scattered conditionals or inline color literals.

## Tutorials

<details>
<summary><strong>Add a New Page</strong></summary>

<br>

**1.** Create `src/pages/YourPage.jsx`:

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

**2.** Add a route constant in `src/routes.js`.

**3.** Wire the route in `src/App.jsx`:

```jsx
import YourPage from "./pages/YourPage";
// Inside <Routes>:
<Route path={ROUTES.YOUR_PAGE} element={<YourPage />} />;
```

</details>

<details>
<summary><strong>Add a New Language</strong></summary>

<br>

1. Create a translation file in `src/i18n/` (e.g., `de.json`).
2. Add all keys used by the UI (`myShifts`, `settings`, `quickAccess`, etc.).

</details>

<details>
<summary><strong>Add a New Theme</strong></summary>

<br>

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

</details>

<details>
<summary><strong>Add a Dashboard Quick-Access Tile</strong></summary>

<br>

1. Extend `menuItems` in `src/pages/DashboardPage.jsx`.
2. Use a color from `getMenuColors(themeName).<key>`.
3. Add a route constant in `routes.js` and translation keys in `i18n/` files.

</details>

## API Integration

Use the `apiCall` utility for backend requests:

```js
import { apiCall } from "./utils/api";

const data = await apiCall("/auth/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});
```

| Environment | Behavior |
|-------------|----------|
| Development | Vite proxies `/api` to `http://localhost:8000` |
| Production | Set `VITE_API_URL` in `.env` |

## Development

| Task | Just Recipe | Direct Command |
|------|-------------|----------------|
| Format | `just fe-format` | `cd frontend && npm run format` |
| Check formatting | `just fe-format-check` | `cd frontend && npm run format:check` |
| Build | `just fe-build` | `cd frontend && npm run build` |
| Format + lint all | `just format && just lint` | — |

> [!TIP]
> Run `just` from the repo root to see all available recipes.

## Production Build & Deploy

```bash
just fe-build
```

Or directly:

```bash
cd frontend && npm run build
```

Deploy the `dist/` folder to S3. CloudFront must return `index.html` for 403/404 errors (React Router SPA fallback).

> [!NOTE]
> Use `./scripts/deploy_frontend_to_s3.sh [environment]` to build and deploy in one step.

## Conventions

| Rule | Details |
|------|---------|
| Theme values | `themes/tokens.js` only — never scatter color literals |
| Page shells | Use `AppLayout` — pages render content only |
| Route strings | Use `routes.js` constants — avoid hardcoded paths |
| User-facing text | Use `useLanguage().t(key)` for all labels |
