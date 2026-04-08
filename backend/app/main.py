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
    allow_origins=["*"],
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
@app.get("/health")
@app.get("/healthz")
@app.get("/ready")
def root():
    return {"status": "healthy"}

@app.get("/api/seed")
def seed_data():
    from app.database import SessionLocal
    from app.models.project import Project
    import uuid
    
    db = SessionLocal()
    
    if db.query(Project).count() == 0:
        projects = [
            Project(id=str(uuid.uuid4()), title="LLM-Powered Document Intelligence (RAG)", slug="rag-document-intelligence", description="RAG system using OpenAI API, LangChain, and FAISS for intelligent document querying.", tech_stack="Python,OpenAI,LangChain,FAISS,FastAPI,Docker", category="nlp", demo_type="text", github_url="https://github.com/pritishkdash", featured=True, order_idx=1),
            Project(id=str(uuid.uuid4()), title="Video Analytics for Object Detection", slug="video-object-detection", description="Video analytics pipeline with YOLOv8, TensorFlow, and OpenCV for object detection.", tech_stack="Python,YOLOv8,TensorFlow,OpenCV,Docker", category="cv", demo_type="image", github_url="https://github.com/pritishkdash", featured=True, order_idx=2),
            Project(id=str(uuid.uuid4()), title="Enterprise Workflow Automation", slug="n8n-workflow-automation", description="Automated workflows using n8n with Webhooks, REST APIs, PostgreSQL.", tech_stack="n8n,PostgreSQL,Docker,REST APIs", category="mlops", demo_type="none", github_url="https://github.com/pritishkdash", featured=True, order_idx=3),
            Project(id=str(uuid.uuid4()), title="ANPR & RFID Bus Fleet Management", slug="anpr-rfid-bus-management", description="RFID and ANPR systems for bus fleet management at BSABT Bhubaneswar.", tech_stack="Python,OpenCV,RFID,ANPR", category="cv", demo_type="none", github_url="https://github.com/pritishkdash", featured=False, order_idx=4),
            Project(id=str(uuid.uuid4()), title="Brain Tumor Segmentation", slug="brain-tumor-segmentation", description="Brain tumor segmentation using Unet variants for medical imaging.", tech_stack="Python,PyTorch,Unet,Medical Imaging", category="cv", demo_type="none", github_url="https://github.com/pritishkdash", featured=False, order_idx=5),
            Project(id=str(uuid.uuid4()), title="Mitochondrial Segmentation", slug="mitochondrial-segmentation", description="Hybrid model using Unet, SE-Unet for mitochondrial tracking.", tech_stack="Python,PyTorch,Unet,Deep Learning", category="cv", demo_type="none", github_url="https://github.com/pritishkdash", featured=False, order_idx=6),
            Project(id=str(uuid.uuid4()), title="Facial Recognition Payroll System", slug="facial-recognition-payroll", description="Facial recognition system integrated with ERP payroll.", tech_stack="Python,OpenCV,FastAPI,Face Recognition", category="cv", demo_type="none", github_url="https://github.com/pritishkdash", featured=False, order_idx=7),
            Project(id=str(uuid.uuid4()), title="Higher Education Data Analytics", slug="higher-education-analytics", description="Data cleaning and analysis using Pandas for Department of Higher Education.", tech_stack="Python,Pandas,SQL,Tableau", category="mlops", demo_type="none", github_url="https://github.com/pritishkdash", featured=False, order_idx=8),
        ]
        db.add_all(projects)
        db.commit()
        db.close()
        return {"message": f"Seeded {len(projects)} projects!"}
    
    db.close()
    return {"message": "Projects already exist"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
