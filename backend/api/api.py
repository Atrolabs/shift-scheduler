"""FastAPI routes"""

from fastapi import APIRouter

# Router with global prefix will be applied in main.py
router = APIRouter()


# Note: Cognito Hosted UI handles authentication flows directly.
