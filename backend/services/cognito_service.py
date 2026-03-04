"""Cognito Service for user management"""

import logging

import boto3
from botocore.exceptions import ClientError
from fastapi import HTTPException

from config.aws_config import CognitoSettings

logger = logging.getLogger(__name__)


class CognitoService:
    """Service for managing Cognito users"""

    def __init__(self):
        self.settings = CognitoSettings()
        self.user_pool_id = self.settings.user_pool_id
        self.user_pool_client_id = self.settings.user_pool_client_id
        self.cognito_client = boto3.client(
            "cognito-idp",
            region_name=self.settings.region,
        )

    def get_user(self, username: str) -> dict:
        """Get user information from Cognito."""
        try:
            response = self.cognito_client.admin_get_user(
                UserPoolId=self.user_pool_id, Username=username
            )
            return {"user": response}
        except ClientError as e:
            error_code = e.response["Error"]["Code"]
            logger.error(
                "Cognito get_user failed: %s — %s", error_code, e.response["Error"]["Message"]
            )
            if error_code == "UserNotFoundException":
                raise HTTPException(status_code=404, detail="User not found")
            raise HTTPException(status_code=500, detail="Failed to retrieve user")

    def list_users(self, limit: int = 10) -> dict:
        """List users in the user pool."""
        try:
            response = self.cognito_client.list_users(UserPoolId=self.user_pool_id, Limit=limit)
            return {"users": response["Users"]}
        except ClientError as e:
            logger.error(
                "Cognito list_users failed: %s — %s",
                e.response["Error"]["Code"],
                e.response["Error"]["Message"],
            )
            raise HTTPException(status_code=500, detail="Failed to list users")
