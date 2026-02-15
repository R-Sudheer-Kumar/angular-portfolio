"""
Pydantic models for request/response validation.
Follows Single Responsibility Principle - each model represents one entity.
"""

from pydantic import BaseModel, EmailStr, Field, ConfigDict
from pydantic.alias_generators import to_camel
from typing import List, Optional
from datetime import datetime


# ─── Project Models ───────────────────────────────────────

class ProjectBase(BaseModel):
    """Base project fields shared across create/update."""
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=1000)
    long_description: Optional[str] = None
    tech_stack: List[str] = []
    image_url: Optional[str] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: bool = False
    category: str = "General"
    order: int = 0

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )


class ProjectCreate(ProjectBase):
    """Model for creating a new project."""
    pass


class ProjectUpdate(BaseModel):
    """Model for updating a project - all fields optional."""
    title: Optional[str] = None
    description: Optional[str] = None
    long_description: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    image_url: Optional[str] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: Optional[bool] = None
    category: Optional[str] = None
    order: Optional[int] = None


class ProjectResponse(ProjectBase):
    """Project with ID and timestamps for API responses."""
    id: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


# ─── Skill Models ─────────────────────────────────────────

class SkillBase(BaseModel):
    """Base skill fields."""
    name: str = Field(..., min_length=1, max_length=100)
    category: str = "General"
    proficiency: int = Field(80, ge=0, le=100)
    icon: Optional[str] = None
    icon: Optional[str] = None
    order: int = 0

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )


class SkillCreate(SkillBase):
    pass


class SkillResponse(SkillBase):
    id: str


# ─── Experience Models ────────────────────────────────────

class ExperienceBase(BaseModel):
    """Base experience fields."""
    company: str
    role: str
    start_date: str
    end_date: Optional[str] = None
    current: bool = False
    description: str
    responsibilities: List[str] = []
    tech_used: List[str] = []
    tech_used: List[str] = []
    order: int = 0

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )


class ExperienceResponse(ExperienceBase):
    id: str


# ─── Contact Models ───────────────────────────────────────

class ContactCreate(BaseModel):
    """Model for contact form submission."""
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=5)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )


class ContactResponse(ContactCreate):
    id: str
    read: bool = False
    created_at: Optional[str] = None


# ─── Profile Models ──────────────────────────────────────

class SocialLink(BaseModel):
    platform: str
    url: str
    url: str
    icon: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )


class ProfileResponse(BaseModel):
    name: str
    title: str
    tagline: str
    bio: str
    email: str
    phone: str
    location: str
    photo_url: Optional[str] = None
    resume_url: Optional[str] = None
    social_links: List[SocialLink] = []

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )


# ─── Auth Models ──────────────────────────────────────────

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
