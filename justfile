# List all available recipes
default:
    @just --list

# ── Frontend ──────────────────────────────────────────────

# Install frontend dependencies
fe-install:
    cd frontend && npm install

# Start Vite dev server (:3000)
fe-dev:
    cd frontend && npm run dev

# Production build to dist/
fe-build:
    cd frontend && npm run build

# Format with Prettier
fe-format:
    cd frontend && npm run format

# Check Prettier formatting
fe-format-check:
    cd frontend && npm run format:check

# ── Backend ───────────────────────────────────────────────

# Create venv & install deps
be-install:
    cd backend && python -m venv .venv && source .venv/bin/activate && pip install -e ".[dev]"

# Start FastAPI dev server (:8000)
be-dev:
    cd backend && source .venv/bin/activate && uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Format Python with Black
be-format:
    black backend/

# Lint Python with Ruff
be-lint:
    ruff check backend/

# ── Infrastructure ────────────────────────────────────────

# Format Terraform files
tf-fmt:
    terraform -chdir=infrastructure fmt -recursive

# Regenerate Terraform module docs
tf-docs:
    ./scripts/generate_terraform_docs.sh

# ── Cross-cutting ────────────────────────────────────────

# Format everything
format: fe-format be-format tf-fmt

# Lint/check everything
lint: fe-format-check be-lint

# Start both dev servers in parallel
dev:
    just be-dev & just fe-dev & wait
