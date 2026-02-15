"""
Project CRUD routes.
Public: GET (list, detail)
Protected: POST, PUT, DELETE (admin only)
"""

from typing import List
from fastapi import APIRouter, HTTPException, status, Depends

from ..models import ProjectCreate, ProjectUpdate, ProjectResponse
from ..data_store import data_store
from ..auth import get_current_admin

router = APIRouter(prefix="/projects", tags=["Projects"])

COLLECTION = "projects"


def _to_response(item: dict) -> dict:
    """Convert snake_case data store fields to camelCase for frontend compatibility."""
    return {
        "id": item.get("id"),
        "title": item.get("title"),
        "description": item.get("description"),
        "longDescription": item.get("long_description"),
        "techStack": item.get("tech_stack", []),
        "imageUrl": item.get("image_url"),
        "liveUrl": item.get("live_url"),
        "githubUrl": item.get("github_url"),
        "featured": item.get("featured", False),
        "category": item.get("category", "General"),
        "order": item.get("order", 0),
        "createdAt": item.get("created_at"),
        "updatedAt": item.get("updated_at"),
    }


@router.get("", response_model=List[dict])
async def get_projects():
    """Get all projects, sorted by order."""
    projects = data_store.get_all(COLLECTION)
    projects.sort(key=lambda p: p.get("order", 0))
    return [_to_response(p) for p in projects]


@router.get("/{project_id}")
async def get_project(project_id: str):
    """Get a single project by ID."""
    project = data_store.get_by_id(COLLECTION, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return _to_response(project)


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_project(
    project: ProjectCreate,
    _: dict = Depends(get_current_admin),
):
    """Create a new project (admin only)."""
    created = data_store.create(COLLECTION, project.model_dump())
    return _to_response(created)


@router.put("/{project_id}")
async def update_project(
    project_id: str,
    project: ProjectUpdate,
    _: dict = Depends(get_current_admin),
):
    """Update an existing project (admin only)."""
    updated = data_store.update(COLLECTION, project_id, project.model_dump())
    if not updated:
        raise HTTPException(status_code=404, detail="Project not found")
    return _to_response(updated)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: str,
    _: dict = Depends(get_current_admin),
):
    """Delete a project (admin only)."""
    if not data_store.delete(COLLECTION, project_id):
        raise HTTPException(status_code=404, detail="Project not found")
