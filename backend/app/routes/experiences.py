"""
Experience routes (read-only for public, admin can manage).
"""

from typing import List
from fastapi import APIRouter

from ..data_store import data_store

router = APIRouter(prefix="/experiences", tags=["Experience"])

COLLECTION = "experiences"


def _to_response(item: dict) -> dict:
    """Convert to frontend-compatible format."""
    return {
        "id": item.get("id"),
        "company": item.get("company"),
        "role": item.get("role"),
        "startDate": item.get("start_date"),
        "endDate": item.get("end_date"),
        "current": item.get("current", False),
        "description": item.get("description"),
        "responsibilities": item.get("responsibilities", []),
        "techUsed": item.get("tech_used", []),
        "order": item.get("order", 0),
    }


@router.get("", response_model=List[dict])
async def get_experiences():
    """Get all experiences, sorted by order."""
    experiences = data_store.get_all(COLLECTION)
    experiences.sort(key=lambda e: e.get("order", 0))
    return [_to_response(e) for e in experiences]
