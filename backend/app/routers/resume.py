from fastapi import APIRouter
from fastapi.responses import FileResponse
from pathlib import Path

router = APIRouter(prefix="/resume", tags=["resume"])

@router.get("/download")
def download_resume():
    resume_path = Path("backend/knowledge_base/resume.pdf")
    
    if not resume_path.exists():
        return {"error": "Resume not found. Please add resume.pdf to knowledge_base folder."}
    
    return FileResponse(
        path=resume_path,
        filename="Pritish_Kumar_Dash_Resume.pdf",
        media_type="application/pdf"
    )

@router.get("/info")
def get_resume_info():
    return {
        "name": "Pritish Kumar Dash",
        "title": "Data Scientist & AI Engineer",
        "email": "dashpritish97@gmail.com",
        "phone": "+91 8270813751",
        "location": "Bhubaneswar, India",
        "linkedin": "https://linkedin.com/in/pritish-kumar-dash",
        "github": "https://github.com/dashpritish97",
        "summary": "Data Scientist and AI Engineer with 2.5+ years of experience building production-grade AI systems. Specialized in LLM applications, RAG, and computer vision including object detection and medical image segmentation. Passionate about cost-efficient, reliable, high-impact AI solutions.",
        "experience": [
            {
                "title": "Software Engineer",
                "company": "Soul Limited",
                "period": "Aug 2023 - Present",
                "highlights": [
                    "YOLOv8, TensorFlow, OpenCV for object detection and tracking",
                    "CI/CD pipelines for ML workflows",
                    "Facial recognition system for ERP payroll integration",
                    "RFID and ANPR systems deployment"
                ]
            },
            {
                "title": "Junior Research Fellow",
                "company": "Xavier University",
                "period": "May 2023 - Aug 2023",
                "highlights": [
                    "Image segmentation on mitochondrial data using Unet variants",
                    "SE-Unet and SE-Unet++ for accurate segmentation"
                ]
            }
        ],
        "education": {
            "degree": "M.Sc in Data Science",
            "institution": "Silicon Institute of Technology, Bhubaneswar",
            "period": "2021 - 2023",
            "cgpa": "8.67/10"
        },
        "skills": {
            "languages": ["Python", "SQL"],
            "ml_dl": ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"],
            "cv": ["OpenCV", "YOLOv8", "Mask R-CNN", "Unet", "Unet++"],
            "llm": ["OpenAI API", "LangChain", "RAG", "FAISS", "HuggingFace"],
            "mlops": ["Docker", "MLflow", "DVC", "Airflow", "AWS"],
            "databases": ["PostgreSQL", "MongoDB", "MySQL"]
        }
    }
