from app.database import engine, Base, SessionLocal
from app.models.project import Project
import uuid

def reset_and_seed():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("Database reset!")
    
    db = SessionLocal()
    
    projects = [
        Project(
            id=str(uuid.uuid4()),
            title="LLM-Powered Document Intelligence (RAG)",
            slug="rag-document-intelligence",
            description="Retrieval-Augmented Generation system using OpenAI API, LangChain, and FAISS for intelligent document querying. Built semantic search with embedding models and vector databases for contextual responses from large PDF datasets. Implemented prompt engineering to optimize accuracy and reduce hallucination.",
            tech_stack="Python,OpenAI,LangChain,FAISS,FastAPI,Docker",
            category="nlp",
            demo_type="text",
            github_url="https://github.com/dashpritish97/rag-document-intelligence",
            featured=True,
            order_idx=1
        ),
        Project(
            id=str(uuid.uuid4()),
            title="Video Analytics for Object Detection",
            slug="video-object-detection",
            description="Scalable video analytics pipeline leveraging YOLOv8, TensorFlow, and OpenCV for robust object detection and tracking. Integrated CI/CD workflows reducing model deployment time by 40%. Ensured production-grade reliability with automated testing pipelines.",
            tech_stack="Python,YOLOv8,TensorFlow,OpenCV,Docker,CICD",
            category="cv",
            demo_type="image",
            github_url="https://github.com/dashpritish97/video-analytics",
            featured=True,
            order_idx=2
        ),
        Project(
            id=str(uuid.uuid4()),
            title="Enterprise Workflow Automation",
            slug="n8n-workflow-automation",
            description="Automated workflows using n8n integrating Webhooks, REST APIs, PostgreSQL for lead management, email notifications, and database updates. Built event-driven pipelines with conditional logic, error handling, and retry mechanisms ensuring production-grade reliability.",
            tech_stack="n8n,PostgreSQL,Docker,REST APIs,Webhooks",
            category="mlops",
            demo_type="none",
            github_url="https://github.com/dashpritish97/n8n-workflows",
            featured=True,
            order_idx=3
        ),
        Project(
            id=str(uuid.uuid4()),
            title="ANPR & RFID Bus Fleet Management",
            slug="anpr-rfid-bus-management",
            description="Implemented RFID and ANPR systems to streamline bus allocation at BSABT Bhubaneswar. Collaborated with cross-functional teams achieving 30% improvement in reliability. Enhanced transportation efficiency through automation and optimized processes.",
            tech_stack="Python,OpenCV,RFID,ANPR,Docker",
            category="cv",
            demo_type="none",
            github_url="https://github.com/dashpritish97",
            featured=False,
            order_idx=4
        ),
        Project(
            id=str(uuid.uuid4()),
            title="Brain Tumor Segmentation",
            slug="brain-tumor-segmentation",
            description="Accurate brain tumor segmentation using Unet and its variants for medical diagnosis and treatment planning. Achieved high precision outcomes supporting medical research and clinical decision-making.",
            tech_stack="Python,PyTorch,Unet,Medical Imaging",
            category="cv",
            demo_type="none",
            github_url="https://github.com/dashpritish97/brain-tumor-segmentation",
            featured=False,
            order_idx=5
        ),
        Project(
            id=str(uuid.uuid4()),
            title="Mitochondrial Segmentation",
            slug="mitochondrial-segmentation",
            description="Hybrid model using Unet, Unet++, SE-Unet, and SE-Unet++ for accurate mitochondrial tracking and segmentation. Contributed high-quality segmented data supporting biological research and scientific analysis.",
            tech_stack="Python,PyTorch,Unet,Deep Learning",
            category="cv",
            demo_type="none",
            github_url="https://github.com/dashpritish97/mitochondrial-segmentation",
            featured=False,
            order_idx=6
        ),
        Project(
            id=str(uuid.uuid4()),
            title="Facial Recognition Payroll System",
            slug="facial-recognition-payroll",
            description="Facial recognition system integrated with ERP payroll systems via API for seamless data exchange. Improved personnel management security and accuracy through automated face detection and matching.",
            tech_stack="Python,OpenCV,FastAPI,Face Recognition",
            category="cv",
            demo_type="none",
            github_url="https://github.com/dashpritish97",
            featured=False,
            order_idx=7
        ),
        Project(
            id=str(uuid.uuid4()),
            title="Higher Education Data Analytics",
            slug="higher-education-analytics",
            description="Comprehensive data cleaning and analysis using Pandas on large datasets for the Department of Higher Education. Created robust database enabling data-driven decision-making and effective policy planning.",
            tech_stack="Python,Pandas,SQL,Tableau,Data Analysis",
            category="mlops",
            demo_type="none",
            github_url="https://github.com/dashpritish97",
            featured=False,
            order_idx=8
        ),
    ]
    db.add_all(projects)
    db.commit()
    print(f"Seeded {len(projects)} projects!")
    db.close()

if __name__ == "__main__":
    reset_and_seed()
