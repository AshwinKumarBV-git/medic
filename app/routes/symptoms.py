from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import models
from ..schemas import schemas
from ..utils.auth import get_current_active_user

router = APIRouter()

@router.post("/", response_model=schemas.Symptom)
def create_symptom(
    symptom: schemas.SymptomCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    db_symptom = models.Symptom(
        **symptom.dict(),
        user_id=current_user.id
    )
    db.add(db_symptom)
    db.commit()
    db.refresh(db_symptom)
    return db_symptom

@router.get("/", response_model=List[schemas.Symptom])
def read_symptoms(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    symptoms = db.query(models.Symptom)\
        .filter(models.Symptom.user_id == current_user.id)\
        .offset(skip)\
        .limit(limit)\
        .all()
    return symptoms

@router.get("/{symptom_id}", response_model=schemas.Symptom)
def read_symptom(
    symptom_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    symptom = db.query(models.Symptom)\
        .filter(
            models.Symptom.id == symptom_id,
            models.Symptom.user_id == current_user.id
        ).first()
    if symptom is None:
        raise HTTPException(status_code=404, detail="Symptom not found")
    return symptom