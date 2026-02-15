"""
Profile route for fetching portfolio owner's information.
"""

from fastapi import APIRouter

from ..data_store import data_store

router = APIRouter(prefix="/profile", tags=["Profile"])


def _to_response(profile: dict) -> dict:
    """Convert to frontend-compatible camelCase format."""
    return {
        "name": profile.get("name"),
        "title": profile.get("title"),
        "tagline": profile.get("tagline"),
        "bio": profile.get("bio"),
        "email": profile.get("email"),
        "phone": profile.get("phone"),
        "location": profile.get("location"),
        "photoUrl": profile.get("photo_url"),
        "resumeUrl": profile.get("resume_url"),
        "socialLinks": profile.get("social_links", []),
    }


@router.get("")
async def get_profile():
    """Get the portfolio owner's profile information."""
    profile = data_store.get_profile()
    return _to_response(profile)
