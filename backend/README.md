<div align="center">

# Shift Scheduler Backend

**FastAPI service deployed as AWS Lambda via Mangum.**

![Python](https://img.shields.io/badge/Python-3.14+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.135-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-Mangum-FF9900?style=for-the-badge&logo=awslambda&logoColor=white)

</div>

---

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| [Python](https://www.python.org/) | 3.14+ | Runtime (`backend/.python-version`) |
| [pip](https://pip.pypa.io/) | Latest | Package manager |

## Environment Setup

**1. Create a virtual environment and install dependencies** (from the repo root):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"   # includes black, ruff, pytest
```

Or use the `just` shortcut:

```bash
just be-install
```

**2. Configure environment variables** in `backend/config/.env`:

```env
AWS_REGION=eu-central-1
COGNITO_USER_POOL_ID=your-user-pool-id
COGNITO_USER_POOL_CLIENT_ID=your-client-id
```

> [!IMPORTANT]
> `BaseAWSSettings` reads `.env` from `backend/config/.env`, not the repo root. Never commit this file.

## Running Locally

> [!NOTE]
> The backend runs on AWS Lambda in production. Local mode is for quick testing only.

```bash
just be-dev
```

Or directly:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

| Endpoint | URL |
|----------|-----|
| API | `http://localhost:8000/api` |
| Swagger UI | `http://localhost:8000/docs` |

## Project Structure

```
backend/
├── api/
│   └── api.py              # API routes and endpoints
├── config/
│   └── aws_config.py       # AWS/Cognito settings (Pydantic)
├── models/
│   ├── inputs/             # Request models
│   ├── exceptions/         # Custom exception classes
│   └── responses/          # Response models
├── services/               # AWS service methods
├── tests/                  # Test files
└── main.py                 # FastAPI entrypoint
```

> [!NOTE]
> Dependencies are defined in [`pyproject.toml`](../pyproject.toml) at the repo root, not inside `backend/`.

## Tech Stack

| Technology | Version | Purpose | Docs |
|------------|---------|---------|------|
| FastAPI | 0.135 | Web framework | [fastapi.tiangolo.com](https://fastapi.tiangolo.com/) |
| Uvicorn | 0.41 | ASGI server | [uvicorn.org](https://www.uvicorn.org/) |
| Mangum | 0.21 | Lambda adapter | [GitHub](https://github.com/jordanerr/mangum) |
| Boto3 | 1.42 | AWS SDK | [boto3.amazonaws.com](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) |
| Pydantic | 2.12 | Data validation | [docs.pydantic.dev](https://docs.pydantic.dev/) |
| Pydantic Settings | 2.13 | Config management | [docs.pydantic.dev](https://docs.pydantic.dev/latest/concepts/pydantic_settings/) |

<details>
<summary><strong>Dev Dependencies</strong></summary>

<br>

| Tool | Version | Purpose |
|------|---------|---------|
| Black | 26.1 | Code formatter |
| Ruff | 0.15 | Linter |
| pytest | 9.0 | Test runner |

Formatting config is in `pyproject.toml` (line length 100, `py314` target).

</details>

## Development

| Task | Just Recipe | Direct Command |
|------|-------------|----------------|
| Format | `just be-format` | `black backend/` |
| Lint | `just be-lint` | `ruff check backend/` |
| Format + lint all | `just format && just lint` | — |

> [!TIP]
> Run `just` from the repo root to see all available recipes.

## Deployment

The application runs on AWS Lambda behind API Gateway. Mangum wraps the FastAPI ASGI app as a Lambda handler:

```python
handler = Mangum(app)
```

Infrastructure is managed via Terraform — see [infrastructure/README.md](../infrastructure/README.md).
