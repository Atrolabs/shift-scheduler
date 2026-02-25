"""Auth Input Models"""

from pydantic import BaseModel, EmailStr, SecretStr
from typing import Optional


class LoginInput(BaseModel):
    """Input model for user login"""

    email: EmailStr
    password: SecretStr


class RegisterInput(BaseModel):
    """Input model for user registration"""

    email: EmailStr
    name: str
    family_name: str
    phone_number: Optional[str] = None
    position: Optional[str] = None
    password: SecretStr
