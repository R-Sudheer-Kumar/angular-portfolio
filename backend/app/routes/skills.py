"""
Skill CRUD routes.
Public: GET
Protected: POST, PUT, DELETE (admin only)
"""

from typing import List
from fastapi import APIRouter, HTTPException, status, Depends

from ..models import SkillCreate
from ..data_store import data_store
from ..auth import get_current_admin

router = APIRouter(prefix="/skills", tags=["Skills"])

COLLECTION = "skills"


@router.get("", response_model=List[dict])
async def get_skills():
    """Get all skills, sorted by order."""
    skills = data_store.get_all(COLLECTION)
    skills.sort(key=lambda s: s.get("order", 0))
    return skills


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_skill(
    skill: SkillCreate,
    _: dict = Depends(get_current_admin),
):
    """Create a new skill (admin only)."""
    return data_store.create(COLLECTION, skill.model_dump())


@router.put("/{skill_id}")
async def update_skill(
    skill_id: str,
    skill: SkillCreate,
    _: dict = Depends(get_current_admin),
):
    """Update a skill (admin only)."""
    updated = data_store.update(COLLECTION, skill_id, skill.model_dump())
    if not updated:
        raise HTTPException(status_code=404, detail="Skill not found")
    return updated


@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(
    skill_id: str,
    _: dict = Depends(get_current_admin),
):
    """Delete a skill (admin only)."""
    if not data_store.delete(COLLECTION, skill_id):
        raise HTTPException(status_code=404, detail="Skill not found")
