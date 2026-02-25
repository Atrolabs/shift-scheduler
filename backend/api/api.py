"""FastAPI routes"""

from fastapi import APIRouter
from services.cognito_service import CognitoService

# Router with global prefix will be applied in main.py
router = APIRouter()

# Initialize Cognito service
cognito_service = CognitoService()


# Note: Cognito Hosted UI handles authentication flows directly.
