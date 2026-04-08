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
            Project(id=str(uuid.uuid4()), title="LLM-Powered Document Intelligence (RAG)", slug="rag-document-intelligence", description="Retrieval-Augmented Generation system enabling intelligent document querying across large PDF datasets. Implemented semantic search using embedding models and FAISS vector database for contextual responses. Built with OpenAI API, LangChain, and FastAPI for production-grade performance. Optimized prompt engineering strategies reduced hallucination by 60% while improving response accuracy. Deployed as Docker containers with CI/CD pipelines for automated testing and seamless updates.", tech_stack="Python,OpenAI,LangChain,FAISS,FastAPI,Docker", category="nlp", demo_type="text", github_url="https://github.com/pritishkdash", featured=True, order_idx=1),
            Project(id=str(uuid.uuid4()), title="Video Analytics for Object Detection", slug="video-object-detection", description="Scalable real-time video analytics pipeline leveraging YOLOv8 for state-of-the-art object detection and tracking. Implemented TensorFlow models optimized for edge deployment with OpenCV preprocessing pipelines. Integrated CI/CD workflows with automated testing reducing deployment time by 40%. Achieved 95% detection accuracy on custom datasets with support for 30+ object classes. Features include motion tracking, anomaly detection, and real-time alerting system.", tech_stack="Python,YOLOv8,TensorFlow,OpenCV,Docker,CICD", category="cv", demo_type="image", github_url="https://github.com/pritishkdash", featured=True, order_idx=2),
            Project(id=str(uuid.uuid4()), title="Enterprise Workflow Automation", slug="n8n-workflow-automation", description="End-to-end workflow automation platform using n8n orchestrating complex business processes. Built event-driven pipelines integrating Webhooks, REST APIs, and PostgreSQL for lead management, email notifications, and database operations. Implemented robust error handling with retry mechanisms and dead-letter queues ensuring 99.9% uptime. Automated repetitive tasks saving 20+ hours weekly across marketing and sales teams.", tech_stack="n8n,PostgreSQL,Docker,REST APIs,Webhooks", category="mlops", demo_type="none", github_url="https://github.com/pritishkdash", featured=True, order_idx=3),
            Project(id=str(uuid.uuid4()), title="ANPR & RFID Bus Fleet Management", slug="anpr-rfid-bus-management", description="Automated bus fleet management system combining Automatic Number Plate Recognition (ANPR) and RFID technology for seamless vehicle tracking at BSABT Bhubaneswar. Implemented real-time fleet monitoring dashboard with predictive maintenance alerts. Reduced manual check-in time by 70% and improved fleet utilization through intelligent allocation algorithms. Collaborated with cross-functional teams achieving 30% improvement in on-time reliability.", tech_stack="Python,OpenCV,RFID,ANPR,Docker", category="cv", demo_type="none", github_url="https://github.com/pritishkdash", featured=False, order_idx=4),
            Project(id=str(uuid.uuid4()), title="Brain Tumor Segmentation", slug="brain-tumor-segmentation", description="Deep learning system for accurate brain tumor segmentation using U-Net and attention-based variants for medical diagnosis support. Achieved 92% Dice score on BRATS 2020 benchmark dataset. Integrated Grad-CAM visualization for interpretable predictions helping radiologists understand model decisions. Deployed as API service for integration with hospital PACS systems enabling faster diagnosis and treatment planning.", tech_stack="Python,PyTorch,Unet,Medical Imaging", category="cv", demo_type="none", github_url="https://github.com/pritishkdash", featured=False, order_idx=5),
            Project(id=str(uuid.uuid4()), title="Mitochondrial Segmentation", slug="mitochondrial-segmentation", description="Advanced deep learning solution for mitochondrial segmentation using hybrid U-Net, U-Net++, SE-U-Net architectures. Built custom loss functions addressing class imbalance achieving 89% IoU on electron microscopy images. Generated high-quality segmentation masks supporting biological research and disease analysis. Contributed to open-source microscopy analysis toolkit used by 50+ research institutions globally.", tech_stack="Python,PyTorch,Unet,Deep Learning", category="cv", demo_type="none", github_url="https://github.com/pritishkdash", featured=False, order_idx=6),
            Project(id=str(uuid.uuid4()), title="Facial Recognition Payroll System", slug="facial-recognition-payroll", description="Production-ready facial recognition attendance system integrated with enterprise ERP payroll via REST APIs. Implemented face detection using MTCNN and embedding generation with FaceNet for accurate matching. Achieved 98.5% recognition accuracy with anti-spoofing measures preventing photo-based fraud. Reduced payroll processing time by 50% and eliminated buddy punching through automated time tracking.", tech_stack="Python,OpenCV,FastAPI,Face Recognition", category="cv", demo_type="none", github_url="https://github.com/pritishkdash", featured=False, order_idx=7),
            Project(id=str(uuid.uuid4()), title="Higher Education Data Analytics", slug="higher-education-analytics", description="Comprehensive data analytics platform for Odisha Department of Higher Education analyzing enrollment, completion rates, and student performance across 1000+ institutions. Built automated data pipelines with Pandas processing 5M+ records with validation and cleaning. Created interactive Tableau dashboards for policymakers enabling data-driven decisions. Reduced manual reporting time by 80% and improved accuracy of government statistics.", tech_stack="Python,Pandas,SQL,Tableau,Data Analysis", category="mlops", demo_type="none", github_url="https://github.com/pritishkdash", featured=False, order_idx=8),
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
