"""
Application configuration using pydantic-settings.
Loads from .env file with environment variable overrides.
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Central configuration for the portfolio backend."""

    # Admin credentials
    admin_username: str = "admin"
    admin_password: str = "admin123"

    # JWT settings
    jwt_secret_key: str = "your-super-secret-key-change-in-production-2024"
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 60

    # Firebase
    use_firebase: bool = False
    firebase_credentials_path: str = "./firebase-credentials.json"

    # CORS
    cors_origins: str = "http://localhost:4200,http://localhost:3000"

    # Server
    host: str = "0.0.0.0"
    port: int = 8000

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse comma-separated CORS origins into a list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Singleton settings instance
settings = Settings()
