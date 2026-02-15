"""
Authentication routes for admin login.
"""

from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm

from ..config import settings
from ..auth import create_access_token, get_current_admin
from ..models import TokenResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Authenticate admin and return JWT token.

    Validates credentials against configured admin username/password.
    """
    if (
        form_data.username != settings.admin_username
        or form_data.password != settings.admin_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": form_data.username})
    return TokenResponse(access_token=access_token)


@router.get("/verify")
async def verify(current_admin: dict = Depends(get_current_admin)):
    """Verify if the current token is valid."""
    return {"valid": True, "username": current_admin.get("sub")}
