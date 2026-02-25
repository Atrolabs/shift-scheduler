"""Configuration module for setting up AWS clients"""

from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class BaseAWSSettings(BaseSettings):
    """Base settings for AWS Client"""

    model_config = SettingsConfigDict(
        env_file=Path(__file__).with_name(".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    region: str = Field(validation_alias="AWS_REGION")


class CognitoSettings(BaseAWSSettings):
    """Settings for Cognito Client"""

    user_pool_id: str = Field(validation_alias="COGNITO_USER_POOL_ID")
    user_pool_client_id: str = Field(validation_alias="COGNITO_USER_POOL_CLIENT_ID")
