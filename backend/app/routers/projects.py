from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime

from app.database import get_db
from app.models.project import Project

router = APIRouter(prefix="/projects", tags=["projects"])

class ProjectResponse(BaseModel):
    id: str
    title: str
    slug: str
    description: str | None
    tech_stack: List[str]
    category: str | None
    demo_type: str | None
    github_url: str | None
    live_url: str | None
    thumbnail: str | None
    featured: bool
    order_idx: int
    created_at: datetime
    
    class Config:
        from_attributes = True
    
    @classmethod
    def from_orm(cls, project: Project):
        tech_stack_str = project.tech_stack or ""
        tech_stack_list = [t.strip() for t in tech_stack_str.split(",") if t.strip()]
        
        return cls(
            id=project.id,
            title=project.title,
            slug=project.slug,
            description=project.description,
            tech_stack=tech_stack_list,
            category=project.category,
            demo_type=project.demo_type,
            github_url=project.github_url,
            live_url=project.live_url,
            thumbnail=project.thumbnail,
            featured=project.featured or False,
            order_idx=project.order_idx or 0,
            created_at=project.created_at or datetime.utcnow(),
        )

@router.get("", response_model=List[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).order_by(Project.order_idx, Project.created_at.desc()).all()
    return [ProjectResponse.from_orm(p) for p in projects]

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectResponse.from_orm(project)

@router.get("/slug/{slug}", response_model=ProjectResponse)
def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectResponse.from_orm(project)

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project_data: dict, db: Session = Depends(get_db)):
    tech_stack = project_data.get('tech_stack', [])
    if isinstance(tech_stack, list):
        tech_stack = ','.join(tech_stack)
    
    project = Project(
        title=project_data['title'],
        slug=project_data['slug'],
        description=project_data.get('description'),
        tech_stack=tech_stack,
        category=project_data.get('category'),
        demo_type=project_data.get('demo_type'),
        github_url=project_data.get('github_url'),
        featured=project_data.get('featured', False),
        order_idx=project_data.get('order_idx', 0),
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return ProjectResponse.from_orm(project)

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: str, project_data: dict, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if 'tech_stack' in project_data:
        if isinstance(project_data['tech_stack'], list):
            project_data['tech_stack'] = ','.join(project_data['tech_stack'])
    
    for key, value in project_data.items():
        setattr(db_project, key, value)
    
    db.commit()
    db.refresh(db_project)
    return ProjectResponse.from_orm(db_project)

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: str, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()
    return None
