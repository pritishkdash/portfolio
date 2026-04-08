from sqlalchemy import Column, String, Text, Boolean, Integer, DateTime, ARRAY, BigInteger, JSON
from sqlalchemy.sql import func
import uuid

from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False)
    description = Column(Text)
    tech_stack = Column(String(500))
    category = Column(String(50))
    demo_type = Column(String(50))
    demo_endpoint = Column(String(100))
    github_url = Column(String(300))
    live_url = Column(String(300))
    thumbnail = Column(String(300))
    featured = Column(Boolean, default=False)
    order_idx = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100))
    email = Column(String(200))
    message = Column(Text)
    status = Column(String(20), default="new")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class PageAnalytics(Base):
    __tablename__ = "page_analytics"

    id = Column(Integer, primary_key=True, autoincrement=True)
    page = Column(String(100))
    event = Column(String(100))
    event_metadata = Column(JSON)
    ip_hash = Column(String(64))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(300))
    slug = Column(String(300), unique=True)
    content = Column(Text)
    published = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
