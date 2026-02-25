# AGENTS.md

Guidance for AI coding agents working in this repository.

## Scope

This file applies to the entire monorepo:

- `backend/` (FastAPI + Cognito integration)
- `frontend/` (React + Vite)
- `infrastructure/` (Terraform)
- `scripts/` (repo automation helpers)

## Repo Baseline

- Monorepo layout:
  - `backend/` FastAPI API
  - `frontend/` React SPA (Vite)
  - `infrastructure/` Terraform AWS stack
- Primary deployment region: `eu-central-1`
- Environments at root Terraform level: `dev`, `prod`

## Working Rules

- Keep changes minimal and scoped to the user request.
- Follow existing patterns in the touched area; do not refactor unrelated code.
- Do not commit secrets or generated local env files (`.env`, `*.tfvars`, credentials).
- Prefer updating existing files over introducing parallel patterns.
- If you change behavior, update the nearest README/docs in the same area.
- For branch, commit, and ticket conventions, follow `CONTRIBUTING.md` as the single source of truth.

## Formatting And Validation

Run only what is relevant to files you changed.

- Backend (`backend/`)
  - Format: `black backend/`
  - Lint: `ruff check backend/`
- Frontend (`frontend/`)
  - Format: `npm run format`
  - Format check: `npm run format:check`
- Terraform (`infrastructure/`)
  - Format: `terraform fmt --recursive`
  - If variables/outputs/resources changed, refresh docs: `./scripts/generate_terraform_docs.sh`

Notes:

- `pyproject.toml` currently defines Black style (line length 100, `py311` target).
- Ruff is used for linting; no repository Ruff formatting config is defined yet.

## Backend Conventions (`backend/`)

- API entrypoint is `backend/main.py`; all routes are mounted under `/api`.
- API route definitions live in `backend/api/api.py`.
- AWS/Cognito business logic belongs in `backend/services/`.
- Settings use Pydantic settings classes from `backend/config/aws_config.py`.
- Keep request/response models in `backend/models/` (expand as needed).
- Prefer typed function signatures and explicit return shapes.
- Handle boto3 `ClientError` paths explicitly and return structured error payloads.

Important config detail:

- `BaseAWSSettings` reads `.env` from `backend/config/.env` (not repo root).

## Frontend Conventions (`frontend/`)

- Use functional components and hooks.
- Routing constants live in `frontend/src/routes.js`; avoid hardcoded route strings.
- Keep page shells based on `AppLayout` and shared UI primitives in `src/components/ui/`.
- Keep theme tokens centralized in `frontend/src/themes/tokens.js` (single source of truth).
- Keep translation keys in `frontend/src/i18n/*.json` and access text via `LanguageContext`.
- Use `apiCall` from `frontend/src/utils/api.js` for backend HTTP calls.

When adding UI features:

- New page: add component in `src/pages/`, route wiring in `src/App.jsx`, and route constant in `src/routes.js`.
- New i18n key: add it consistently across language files.
- New theme: add it in `src/themes/tokens.js`; do not scatter theme literals across components.

## Terraform Conventions (`infrastructure/`)

- Reusable code goes in `infrastructure/modules/*`.
- Environment config comes from `vars/*.tfvars` and backend config from `backend/*.tfvars`.
- Never commit non-example `.tfvars` files.
- Keep naming predictable via the shared `suffix` pattern in root module.
- Prefer explicit variables/outputs over hardcoded values.

Tagging strategy (must stay consistent):

1. Global tags are defined in `infrastructure/locals.tf` and applied via provider `default_tags`.
2. Each module defines `local.module_tags` in its own `main.tf`.
3. Each module accepts `additional_tags` and merges as:
   `merge(local.module_tags, var.additional_tags)`.

Do not bypass this pattern on new taggable resources.

## Scripts And Automation

Run scripts from repo root unless script docs say otherwise.

- `./scripts/deploy_frontend_to_s3.sh [environment]`
  - Builds frontend and syncs to Terraform-managed S3 bucket.
- `./scripts/generate_terraform_docs.sh`
  - Regenerates terraform-docs sections in infrastructure READMEs.
- `./scripts/create_terraform_module.sh <module-name>`
  - Scaffolds a new Terraform module.

## Change Coupling Checklist

Apply these when relevant:

- Backend API change:
  - Update route/service/model files.
  - Update `backend/README.md` if interface/usage changed.
- Frontend route/page change:
  - Keep `src/App.jsx` and `src/routes.js` aligned.
  - Add/update i18n keys if labels/UI text changed.
- Terraform input/output/module change:
  - Run `terraform fmt --recursive`.
  - Run `./scripts/generate_terraform_docs.sh`.
  - Update `infrastructure/README.md` if workflow changes.

## Out Of Scope / Safety

- Do not rotate or overwrite live cloud resources unless explicitly requested.
- Do not destroy infrastructure as part of routine edits.
- Do not change environment defaults (`dev`/`prod`, region, naming) without explicit request.
