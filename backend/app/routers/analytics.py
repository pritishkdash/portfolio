from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from typing import List
import hashlib
from datetime import datetime, timedelta

from app.database import get_db
from app.models.project import PageAnalytics
from app.schemas.project import AnalyticsEvent, AnalyticsSummary

router = APIRouter(prefix="/analytics", tags=["analytics"])

def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        ip = forwarded.split(",")[0].strip()
    else:
        ip = request.client.host if request.client else "unknown"
    return hashlib.sha256(ip.encode()).hexdigest()

@router.post("/track")
def track_event(event: AnalyticsEvent, request: Request, db: Session = Depends(get_db)):
    ip_hash = get_client_ip(request)
    
    db_event = PageAnalytics(
        page=event.page,
        event=event.event,
        event_metadata=event.metadata,
        ip_hash=ip_hash
    )
    db.add(db_event)
    db.commit()
    
    return {"status": "ok"}

@router.get("/summary", response_model=AnalyticsSummary)
def get_analytics_summary(days: int = 7, db: Session = Depends(get_db)):
    since = datetime.utcnow() - timedelta(days=days)
    
    total_views = db.query(PageAnalytics).filter(
        PageAnalytics.created_at >= since
    ).filter(
        PageAnalytics.event == "view"
    ).count()
    
    demo_runs = db.query(PageAnalytics).filter(
        PageAnalytics.created_at >= since
    ).filter(
        PageAnalytics.event == "demo_run"
    ).count()
    
    chat_messages = db.query(PageAnalytics).filter(
        PageAnalytics.created_at >= since
    ).filter(
        PageAnalytics.event == "chat"
    ).count()
    
    downloads = db.query(PageAnalytics).filter(
        PageAnalytics.created_at >= since
    ).filter(
        PageAnalytics.event == "download"
    ).count()
    
    recent_events = db.query(PageAnalytics).filter(
        PageAnalytics.created_at >= since
    ).order_by(PageAnalytics.created_at.desc()).limit(50).all()
    
    return AnalyticsSummary(
        total_views=total_views,
        demo_runs=demo_runs,
        chat_messages=chat_messages,
        downloads=downloads,
        recent_events=[
            {
                "page": e.page,
                "event": e.event,
                "created_at": e.created_at.isoformat()
            }
            for e in recent_events
        ]
    )
