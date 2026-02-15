"""
Portfolio Backend API - Main Application
=========================================
FastAPI application for R. Sudheer Kumar's portfolio website.

Features:
- RESTful API for projects, skills, experience, and contact
- JWT-based admin authentication
- CORS support for Angular frontend
- In-memory data store with default data seeding
- Input validation with Pydantic models
- Clean error handling
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routes import auth, projects, skills, experiences, contact, profile

# ─── Application Setup ───────────────────────────────────

app = FastAPI(
    title="Portfolio API",
    description="Backend API for R. Sudheer Kumar's portfolio website",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# ─── CORS Middleware ──────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Route Registration ──────────────────────────────────

API_PREFIX = "/api"

app.include_router(auth.router, prefix=API_PREFIX)
app.include_router(profile.router, prefix=API_PREFIX)
app.include_router(projects.router, prefix=API_PREFIX)
app.include_router(skills.router, prefix=API_PREFIX)
app.include_router(experiences.router, prefix=API_PREFIX)
app.include_router(contact.router, prefix=API_PREFIX)

# ─── Root Health Check ────────────────────────────────────


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "online",
        "service": "Portfolio API",
        "version": "1.0.0",
        "docs": "/api/docs",
    }


@app.get("/api")
async def api_root():
    """API root with available endpoints."""
    return {
        "message": "Portfolio API v1.0.0",
        "endpoints": {
            "profile": "/api/profile",
            "projects": "/api/projects",
            "skills": "/api/skills",
            "experiences": "/api/experiences",
            "contact": "/api/contact",
            "auth": "/api/auth/login",
            "docs": "/api/docs",
        },
    }
