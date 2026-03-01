# Shift Scheduler Backend

FastAPI service deployed as AWS Lambda via Mangum.

## Setup

1. From the **repo root**, create a virtual environment and install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"   # includes black, ruff, pytest
```

2. Configure environment variables in `backend/config/.env`:

```env
AWS_REGION=eu-central-1
COGNITO_USER_POOL_ID=your-user-pool-id
COGNITO_USER_POOL_CLIENT_ID=your-client-id
```

3. Start the development server:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The server exposes:

- **API**: `http://localhost:8000/api`
- **Swagger UI**: `http://localhost:8000/docs`

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

> Dependencies are defined in [`pyproject.toml`](../pyproject.toml) at the repo root.

## Tech Overview

- **Python** 3.14+ with **FastAPI** 0.135
- **Uvicorn** 0.41 (ASGI server)
- **Mangum** 0.21 (Lambda adapter)
- **Boto3** 1.42 (AWS SDK)
- **Pydantic** 2.12 + **Pydantic Settings** 2.13

## Development

Format and lint (configured in `pyproject.toml`):

```bash
black backend/        # format
ruff check backend/   # lint
```

## Deployment

The application runs on AWS Lambda behind API Gateway using Mangum:

```python
handler = Mangum(app)
```
