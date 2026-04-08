from app.routers.projects import router as projects_router
from app.routers.contact import router as contact_router
from app.routers.analytics import router as analytics_router
from app.routers.resume import router as resume_router

__all__ = ["projects_router", "contact_router", "analytics_router", "resume_router"]
