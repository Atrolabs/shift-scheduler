# Shift Scheduler

Cloud-native shift scheduling application built with React, FastAPI, and Terraform on AWS.

## Runtime Versions

| Tool | Version | Source |
|------|---------|--------|
| Node.js | 22.x LTS | `frontend/.nvmrc` |
| Python | 3.13.x | `backend/.python-version` |
| Terraform | >= 1.0 | `infrastructure/versions.tf` |

## Repository Structure

```
.
├── backend/          # FastAPI API (Python, Lambda-ready via Mangum)
├── frontend/         # React SPA (Vite, deployed to S3/CloudFront)
├── infrastructure/   # Terraform IaC (AWS eu-central-1)
├── scripts/          # Automation helpers
└── justfile          # Task runner recipes (run `just` to list)
```

## Documentation

| Document | Purpose |
|----------|---------|
| [backend/README.md](backend/README.md) | Backend setup, structure, and tech overview |
| [frontend/README.md](frontend/README.md) | Frontend setup, architecture, and tutorials |
| [infrastructure/README.md](infrastructure/README.md) | Terraform setup and common commands |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Branch naming, commit messages, PR workflow |
| [AGENTS.md](AGENTS.md) | Conventions for AI coding agents |

## Scripts

Run all scripts from the repository root.

| Script | Description | Usage |
|--------|-------------|-------|
| `deploy_frontend_to_s3.sh` | Build frontend and upload artifacts to S3 for the target environment. Requires `npm`, `aws-cli`. | `./scripts/deploy_frontend_to_s3.sh [environment]` |
| `generate_terraform_docs.sh` | Run `terraform-docs` against `infrastructure/` and all module subdirectories to update README tables. Requires `terraform-docs`. | `./scripts/generate_terraform_docs.sh` |
| `create_terraform_module.sh` | Scaffold a new module under `infrastructure/modules/` with standard files and tagging boilerplate. | `./scripts/create_terraform_module.sh <module-name>` |

## Quick Start

All common tasks are available as [`just`](https://github.com/casey/just) recipes from the repo root. Install `just` and run it to see all available commands:

```bash
brew install just   # macOS
just                # list all recipes
```

| Recipe | Description |
|--------|-------------|
| `just fe-install` | Install frontend dependencies |
| `just fe-dev` | Start Vite dev server (:3000) |
| `just fe-build` | Production build to dist/ |
| `just fe-format` | Format with Prettier |
| `just fe-format-check` | Check Prettier formatting |
| `just be-install` | Create venv & install deps |
| `just be-dev` | Start FastAPI dev server (:8000) |
| `just be-format` | Format Python with Black |
| `just be-lint` | Lint Python with Ruff |
| `just tf-fmt` | Format Terraform files |
| `just tf-docs` | Regenerate Terraform module docs |
| `just format` | Format everything |
| `just lint` | Lint/check everything |
| `just dev` | Start both dev servers in parallel |

Or run the commands manually:

### Frontend

```bash
cd frontend
npm install
npm run dev           # dev server on :3000
```

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Infrastructure

```bash
cd infrastructure
terraform init --reconfigure -backend-config=backend/backend-dev.tfvars
terraform apply -var-file="vars/dev.tfvars"
```
