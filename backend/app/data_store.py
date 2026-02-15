"""
In-memory data store for portfolio content.
Provides CRUD operations for all entities.
Can be replaced with Firebase or any database in production.
Follows DRY - generic CRUD operations reused across entity types.
"""

import uuid
from datetime import datetime
from typing import Dict, List, Optional, Any
from copy import deepcopy


class DataStore:
    """
    Generic in-memory data store with CRUD operations.
    Acts as a repository pattern implementation.
    """

    def __init__(self):
        self._collections: Dict[str, Dict[str, dict]] = {
            "projects": {},
            "skills": {},
            "experiences": {},
            "contacts": {},
        }
        self._initialize_default_data()

    # ─── Generic CRUD ─────────────────────────────────────

    def get_all(self, collection: str) -> List[dict]:
        """Get all items from a collection."""
        return list(self._collections.get(collection, {}).values())

    def get_by_id(self, collection: str, item_id: str) -> Optional[dict]:
        """Get a single item by ID."""
        return self._collections.get(collection, {}).get(item_id)

    def create(self, collection: str, data: dict) -> dict:
        """Create a new item with auto-generated ID and timestamp."""
        item_id = str(uuid.uuid4())[:8]
        item = {
            "id": item_id,
            **data,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }
        self._collections[collection][item_id] = item
        return deepcopy(item)

    def update(self, collection: str, item_id: str, data: dict) -> Optional[dict]:
        """Update an existing item. Only updates provided fields."""
        existing = self._collections.get(collection, {}).get(item_id)
        if not existing:
            return None

        # Filter out None values (partial update support)
        updates = {k: v for k, v in data.items() if v is not None}
        existing.update(updates)
        existing["updated_at"] = datetime.utcnow().isoformat()
        return deepcopy(existing)

    def delete(self, collection: str, item_id: str) -> bool:
        """Delete an item by ID. Returns True if found and deleted."""
        if item_id in self._collections.get(collection, {}):
            del self._collections[collection][item_id]
            return True
        return False

    # ─── Default Data ─────────────────────────────────────

    def _initialize_default_data(self):
        """Seed the data store with default portfolio data."""

        # ─── Profile (stored as a special single item)
        self._profile = {
            "name": "R. Sudheer Kumar",
            "title": "Full Stack Developer",
            "tagline": "Building Modern Web Experiences with Angular, .NET & Cloud Technologies",
            "bio": (
                "Enthusiastic, self-motivated, and reliable full-stack developer with expertise "
                "in microfrontends, microservices, and modern web technologies. Currently working "
                "at Snovasys Software Solutions, contributing to enterprise-grade applications "
                "using Angular, .NET 8, SQL Server, and MongoDB."
            ),
            "email": "rsudheerkumar40@gmail.com",
            "phone": "+91 7780664087",
            "location": "Andhra Pradesh, India",
            "photo_url": None,
            "resume_url": "/assets/resume/SudheerKumar_Resume.pdf",
            "social_links": [
                {"platform": "GitHub", "url": "https://github.com/R-Sudheer-Kumar", "icon": "github"},
                {"platform": "LinkedIn", "url": "https://www.linkedin.com/in/rachamadugu-sudheer-kumar", "icon": "linkedin"},
            ],
        }

        # ─── Projects
        default_projects = [
            {
                "title": "FieldStaff Management System",
                "description": "Enterprise field staff management application with real-time tracking, task assignment, and reporting capabilities.",
                "long_description": "A comprehensive group project built using Angular for the frontend, .NET 8 for the backend API, with SQL Server and MongoDB for data persistence.",
                "tech_stack": ["Angular", ".NET 8", "SQL Server", "MongoDB", "REST APIs", "Angular Material"],
                "featured": True,
                "category": "Enterprise",
                "order": 1,
                "github_url": "https://github.com/R-Sudheer-Kumar",
            },
            {
                "title": "Custom UI Kit / UI Library",
                "description": "Reusable component library for rapid application development with theming support and accessibility.",
                "long_description": "Developed a custom UI kit and component library to standardize UI development across projects.",
                "tech_stack": ["Angular", "TypeScript", "SCSS", "Storybook", "npm"],
                "featured": True,
                "category": "Library",
                "order": 2,
                "github_url": "https://github.com/R-Sudheer-Kumar",
            },
            {
                "title": "Microfrontend Architecture Demo",
                "description": "Demonstration site showcasing microfrontend patterns and module federation.",
                "tech_stack": ["Angular", "Module Federation", "Webpack", "Microservices", "Docker"],
                "featured": True,
                "category": "Architecture",
                "order": 3,
                "github_url": "https://github.com/R-Sudheer-Kumar",
            },
            {
                "title": "AI-Powered Web Application",
                "description": "Currently developing an AI-integrated web application using modern web technologies and Cursor IDE.",
                "tech_stack": ["Angular", "Python", "FastAPI", "AI/ML", "Firebase"],
                "featured": False,
                "category": "AI",
                "order": 4,
                "github_url": "https://github.com/R-Sudheer-Kumar",
            },
            {
                "title": "Diabetes Prediction System",
                "description": "Deep learning model for diabetes prediction with a web interface for healthcare professionals.",
                "tech_stack": ["Python", "Deep Learning", "TensorFlow", "Flask", "HTML/CSS"],
                "featured": False,
                "category": "AI/ML",
                "order": 5,
                "github_url": "https://github.com/R-Sudheer-Kumar",
            },
            {
                "title": "Online Examination Portal",
                "description": "Full-stack examination portal with admin dashboard, question management, and automated grading.",
                "tech_stack": ["Python", "Django", "PostgreSQL", "HTML", "CSS", "JavaScript"],
                "featured": False,
                "category": "Web App",
                "order": 6,
                "github_url": "https://github.com/R-Sudheer-Kumar",
            },
        ]

        for proj in default_projects:
            self.create("projects", proj)

        # ─── Skills
        default_skills = [
            {"name": "Angular", "category": "Frontend", "proficiency": 90, "order": 1},
            {"name": "TypeScript", "category": "Frontend", "proficiency": 88, "order": 2},
            {"name": "JavaScript", "category": "Frontend", "proficiency": 85, "order": 3},
            {"name": "HTML5/CSS3", "category": "Frontend", "proficiency": 92, "order": 4},
            {"name": "Angular Material", "category": "Frontend", "proficiency": 88, "order": 5},
            {"name": "TailwindCSS", "category": "Frontend", "proficiency": 80, "order": 6},
            {"name": "RxJS", "category": "Frontend", "proficiency": 82, "order": 7},
            {"name": ".NET 8", "category": "Backend", "proficiency": 82, "order": 8},
            {"name": "Python", "category": "Backend", "proficiency": 80, "order": 9},
            {"name": "FastAPI", "category": "Backend", "proficiency": 75, "order": 10},
            {"name": "Django", "category": "Backend", "proficiency": 70, "order": 11},
            {"name": "REST APIs", "category": "Backend", "proficiency": 88, "order": 12},
            {"name": "SQL Server", "category": "Database", "proficiency": 80, "order": 13},
            {"name": "MongoDB", "category": "Database", "proficiency": 78, "order": 14},
            {"name": "Firebase", "category": "Database", "proficiency": 75, "order": 15},
            {"name": "MySQL", "category": "Database", "proficiency": 78, "order": 16},
            {"name": "Microservices", "category": "Architecture", "proficiency": 80, "order": 17},
            {"name": "Microfrontends", "category": "Architecture", "proficiency": 82, "order": 18},
            {"name": "Git", "category": "Tools", "proficiency": 85, "order": 19},
            {"name": "Docker", "category": "Tools", "proficiency": 70, "order": 20},
            {"name": "Responsive Design", "category": "Design", "proficiency": 90, "order": 21},
            {"name": "UI/UX Design", "category": "Design", "proficiency": 80, "order": 22},
            {"name": "Machine Learning", "category": "AI/ML", "proficiency": 72, "order": 23},
            {"name": "Deep Learning", "category": "AI/ML", "proficiency": 68, "order": 24},
        ]

        for skill in default_skills:
            self.create("skills", skill)

        # ─── Experiences
        default_experiences = [
            {
                "company": "Snovasys Software Solutions Pvt. Ltd.",
                "role": "Software Developer",
                "start_date": "2024-05-27",
                "end_date": None,
                "current": True,
                "description": (
                    "Working as a full-stack developer on enterprise applications, "
                    "focusing on microfrontend architectures, custom UI library development, "
                    "and modern Angular applications."
                ),
                "responsibilities": [
                    "Developed and maintained microfrontend architectures and microservices",
                    "Created a comprehensive demo site showcasing company capabilities",
                    "Built a custom UI kit / UI library for standardized application development",
                    "Collaborated on FieldStaff group project using Angular, .NET 8, SQL Server, MongoDB",
                    "Pioneered web development using Cursor IDE for AI-assisted coding",
                    "Upgraded legacy Angular projects to the latest Angular versions",
                    "Currently working on an AI-integrated web application project",
                ],
                "tech_used": ["Angular", ".NET 8", "SQL Server", "MongoDB", "TypeScript", "Microservices", "REST APIs"],
                "order": 1,
            },
            {
                "company": "IBM SkillsBuild",
                "role": "Front End Development Intern",
                "start_date": "2023-06-05",
                "end_date": "2023-07-10",
                "current": False,
                "description": "Completed a front-end development internship program focusing on HTML, CSS, JavaScript.",
                "responsibilities": [
                    "Built responsive web interfaces using HTML5, CSS3, and JavaScript",
                    "Learned and applied modern front-end development best practices",
                    "Completed certification in front-end development",
                ],
                "tech_used": ["HTML", "CSS", "JavaScript", "Responsive Design"],
                "order": 2,
            },
        ]

        for exp in default_experiences:
            self.create("experiences", exp)

    def get_profile(self) -> dict:
        """Get the profile data."""
        return deepcopy(self._profile)

    def update_profile(self, data: dict) -> dict:
        """Update profile data."""
        updates = {k: v for k, v in data.items() if v is not None}
        self._profile.update(updates)
        return deepcopy(self._profile)


# Singleton data store instance
data_store = DataStore()
