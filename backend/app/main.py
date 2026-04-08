from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import projects_router, contact_router, analytics_router, resume_router
from app.database import engine, Base

app = FastAPI(
    title="Pritish Portfolio API",
    version="1.0.0",
    openapi_url="/api/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects_router, prefix="/api")
app.include_router(contact_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")
app.include_router(resume_router, prefix="/api")

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"name": "Pritish Portfolio API", "version": "1.0.0", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/projects-test")
def test_projects():
    from app.database import SessionLocal
    from app.models.project import Project
    db = SessionLocal()
    projects = db.query(Project).all()
    db.close()
    return {"count": len(projects), "projects": [{"id": p.id, "title": p.title} for p in projects]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
