# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Monorepo for a shift scheduling application deployed on AWS. Three independent components:

- **`backend/`** — FastAPI API (Python 3.13+), deployed as AWS Lambda via Mangum
- **`frontend/`** — React 18 SPA with Vite, deployed to S3/CloudFront
- **`infrastructure/`** — Terraform IaC for AWS (eu-central-1)
- **`scripts/`** — Bash automation helpers (run from repo root)

Authentication is handled by AWS Cognito Hosted UI.

See `AGENTS.md` for coding conventions and `CONTRIBUTING.md` for branch/commit rules.

## Development Commands

All common tasks are available as `just` recipes from the repo root. Run `just` to list them.

Backend requires `backend/config/.env` with `AWS_REGION`, `COGNITO_USER_POOL_ID`, `COGNITO_USER_POOL_CLIENT_ID`.

For coding conventions, formatting, and validation see `AGENTS.md`.
