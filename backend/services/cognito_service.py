"""Cognito Service for user management"""

import boto3
from botocore.exceptions import ClientError
from typing import Dict, Any
from config.aws_config import CognitoSettings


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

    def get_user(self, username: str) -> Dict[str, Any]:
        """
        Get user information from Cognito

        Args:
            username: Username (email) of the user

        Returns:
            Dict containing user information
        """
        try:
            response = self.cognito_client.admin_get_user(
                UserPoolId=self.user_pool_id, Username=username
            )

            return {"success": True, "user": response}

        except ClientError as e:
            return {
                "success": False,
                "error": e.response["Error"]["Code"],
                "message": e.response["Error"]["Message"],
            }

    def list_users(self, limit: int = 10) -> Dict[str, Any]:
        """
        List users in the user pool

        Args:
            limit: Maximum number of users to return

        Returns:
            Dict containing list of users
        """
        try:
            response = self.cognito_client.list_users(
                UserPoolId=self.user_pool_id, Limit=limit
            )

            return {"success": True, "users": response["Users"]}

        except ClientError as e:
            return {
                "success": False,
                "error": e.response["Error"]["Code"],
                "message": e.response["Error"]["Message"],
            }
