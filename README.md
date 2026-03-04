<div align="center">

# Shift Scheduler

**Cloud-native shift scheduling application built with React, FastAPI, and Terraform on AWS.**

![Python](https://img.shields.io/badge/Python-3.14+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22_LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-≥1.0-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![License](https://img.shields.io/github/license/Atrolabs/shift-scheduler?style=for-the-badge)

</div>

---

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| [Node.js](https://nodejs.org/) | 22.x LTS | Frontend runtime (`frontend/.nvmrc`) |
| [Python](https://www.python.org/) | 3.14+ | Backend runtime (`backend/.python-version`) |
| [Terraform](https://www.terraform.io/) | >= 1.0 | Infrastructure provisioning (`infrastructure/versions.tf`) |
| [just](https://github.com/casey/just) | Latest | Task runner (optional but recommended) |

## Quick Start

All common tasks are available as [`just`](https://github.com/casey/just) recipes. Install it and run `just` to see every available command.

```bash
brew install just   # macOS
just                # list all recipes
```

#### Frontend

| Recipe | Description |
|--------|-------------|
| `just fe-install` | Install frontend dependencies |
| `just fe-dev` | Start Vite dev server (:3000) |
| `just fe-build` | Production build to `dist/` |
| `just fe-format` | Format with Prettier |
| `just fe-format-check` | Check Prettier formatting |

#### Backend

| Recipe | Description |
|--------|-------------|
| `just be-install` | Create venv & install deps |
| `just be-dev` | Start FastAPI dev server (:8000) |
| `just be-format` | Format Python with Black |
| `just be-lint` | Lint Python with Ruff |

#### Infrastructure

| Recipe | Description |
|--------|-------------|
| `just tf-fmt` | Format Terraform files |
| `just tf-docs` | Regenerate Terraform module docs |

#### Cross-cutting

| Recipe | Description |
|--------|-------------|
| `just format` | Format everything |
| `just lint` | Lint/check everything |
| `just dev` | Start both dev servers in parallel |

## Manual Setup

### Frontend

```bash
cd frontend
npm install
npm run dev           # dev server on :3000
```

### Backend

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

> [!NOTE]
> The backend requires `backend/config/.env` with `AWS_REGION`, `COGNITO_USER_POOL_ID`, and `COGNITO_USER_POOL_CLIENT_ID`. See [backend/README.md](backend/README.md) for details.

### Infrastructure

```bash
cd infrastructure
terraform init --reconfigure -backend-config=backend/backend-dev.tfvars
terraform apply -var-file="vars/dev.tfvars"
```

> [!IMPORTANT]
> Never commit `.tfvars` files — they contain sensitive values and are git-ignored. See [infrastructure/README.md](infrastructure/README.md) for full setup.

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
| `deploy_frontend_to_s3.sh` | Build frontend and upload artifacts to S3 | `./scripts/deploy_frontend_to_s3.sh [environment]` |
| `generate_terraform_docs.sh` | Regenerate `terraform-docs` tables in READMEs | `./scripts/generate_terraform_docs.sh` |
| `create_terraform_module.sh` | Scaffold a new module under `infrastructure/modules/` | `./scripts/create_terraform_module.sh <module-name>` |
