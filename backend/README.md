# Shift Scheduler Backend API

FastAPI backend service for the application.

## Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs

## Setup

1. From the **repo root**, create a virtual environment and install dependencies:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -e ".[dev]"
   ```

3. Configure AWS credentials:
   Create a `.env` file in the backend directory:

   ```env
   AWS_REGION=eu-central-1
   COGNITO_USER_POOL_ID=your-user-pool-id
   COGNITO_USER_POOL_CLIENT_ID=your-client-id
   ...
   # Other environment variables
   ```

4. Start the development server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

The server will be available at:

- **API**: http://localhost:8000/api
- **Docs**: http://localhost:8000/docs

## Project Structure

```
backend/
├── api/
│   └── api.py              # API routes and endpoints
├── config/
│   └── aws_config.py       # AWS configuration settings
├── models/
│   ├── inputs/             # Pydantic input models
│   ├── exceptions/         # Custom exception classes
│   └── responses/          # Response models
├── services/               # AWS Services methods
├── tests/                  # Test files
├── utils/                  # Utility functions
└── main.py                 # FastAPI application entrypoint
```

> Dependencies are defined in [`pyproject.toml`](../pyproject.toml) at the repo root.

## Tech Overview

- **Python**: 3.14+
- **FastAPI**: 0.135.1 (web framework for building APIs)
- **Uvicorn**: 0.41.0 (ASGI server for running FastAPI)
- **Mangum**: 0.21.0 (AWS Lambda adapter for FastAPI)
- **Boto3**: 1.42.60 (AWS SDK for Python)
- **Pydantic**: 2.12.5 (data validation using Python type annotations)
- **Pydantic Settings**: 2.13.1 (settings management for Pydantic)

## Development

### Code Formatting

Format code with Black:

```bash
black backend/
```

### Linting

Lint code with Ruff:

```bash
ruff check backend/
```

## Deployment

The application is configured for AWS Lambda deployment using Mangum:

```python
handler = Mangum(app)
```

This allows the FastAPI app to run as a Lambda function behind API Gateway.
