# Shift Scheduler Backend

FastAPI service deployed as AWS Lambda via Mangum.

## Setup

1. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -e ".[dev]"   # includes black, ruff, pytest
```

3. Configure environment variables in `backend/config/.env`:

```env
AWS_REGION=eu-central-1
COGNITO_USER_POOL_ID=your-user-pool-id
COGNITO_USER_POOL_CLIENT_ID=your-client-id
```

4. Start the development server:

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

## Tech Overview

- **Python** 3.13+ with **FastAPI** 0.116
- **Uvicorn** 0.35 (ASGI server)
- **Mangum** 0.19 (Lambda adapter)
- **Boto3** 1.34 (AWS SDK)
- **Pydantic** 2.11 + **Pydantic Settings** 2.11

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
