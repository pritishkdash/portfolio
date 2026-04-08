from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    tech_stack: List[str] = []
    category: Optional[str] = None
    demo_type: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    thumbnail: Optional[str] = None
    featured: bool = False
    order_idx: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    category: Optional[str] = None
    demo_type: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    thumbnail: Optional[str] = None
    featured: Optional[bool] = None
    order_idx: Optional[int] = None

class ProjectResponse(ProjectBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ContactBase(BaseModel):
    name: str
    email: str
    message: str

class ContactCreate(ContactBase):
    pass

class ContactResponse(ContactBase):
    id: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ContactStatusUpdate(BaseModel):
    status: str

class AnalyticsEvent(BaseModel):
    page: str
    event: str
    metadata: Optional[dict] = None

class AnalyticsSummary(BaseModel):
    total_views: int
    demo_runs: int
    chat_messages: int
    downloads: int
    recent_events: List[dict]
