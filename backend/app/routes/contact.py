"""
Contact message routes.
Public: POST (submit message)
Protected: GET, PATCH, DELETE (admin only)
"""

from typing import List
from fastapi import APIRouter, HTTPException, status, Depends

from ..models import ContactCreate
from ..data_store import data_store
from ..auth import get_current_admin

router = APIRouter(prefix="/contact", tags=["Contact"])

COLLECTION = "contacts"


@router.post("", status_code=status.HTTP_201_CREATED)
async def send_message(message: ContactCreate):
    """Submit a contact form message (public)."""
    data = message.model_dump()
    data["read"] = False
    created = data_store.create(COLLECTION, data)
    return created


@router.get("", response_model=List[dict])
async def get_messages(_: dict = Depends(get_current_admin)):
    """Get all contact messages (admin only)."""
    messages = data_store.get_all(COLLECTION)
    messages.sort(key=lambda m: m.get("created_at", ""), reverse=True)
    return messages


@router.patch("/{message_id}/read")
async def mark_read(
    message_id: str,
    _: dict = Depends(get_current_admin),
):
    """Mark a message as read (admin only)."""
    updated = data_store.update(COLLECTION, message_id, {"read": True})
    if not updated:
        raise HTTPException(status_code=404, detail="Message not found")
    return updated


@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_message(
    message_id: str,
    _: dict = Depends(get_current_admin),
):
    """Delete a contact message (admin only)."""
    if not data_store.delete(COLLECTION, message_id):
        raise HTTPException(status_code=404, detail="Message not found")
