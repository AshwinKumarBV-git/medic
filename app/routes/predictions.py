from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import random

from ..database import get_db
from ..models import models
from ..schemas import schemas
from ..utils.auth import get_current_active_user

router = APIRouter()

# Dummy data for demonstration
CONDITIONS = [
    {
        "condition": "Common Cold",
        "confidence": 0.85,
        "recommendations": [
            "Rest well",
            "Stay hydrated",
            "Take over-the-counter cold medicine"
        ]
    },
    {
        "condition": "Seasonal Allergies",
        "confidence": 0.75,
        "recommendations": [
            "Avoid allergen exposure",
            "Take antihistamines",
            "Use air purifier"
        ]
    },
    {
        "condition": "Viral Infection",
        "confidence": 0.70,
        "recommendations": [
            "Get plenty of rest",
            "Monitor temperature",
            "Consult doctor if symptoms worsen"
        ]
    }
]

@router.post("/predict", response_model=schemas.Prediction)
def predict_condition(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    # Get user's latest symptoms
    latest_symptoms = db.query(models.Symptom)\
        .filter(models.Symptom.user_id == current_user.id)\
        .order_by(models.Symptom.created_at.desc())\
        .limit(5)\
        .all()

    # For demonstration, return a random prediction
    # In a real application, this would use a proper medical prediction model
    prediction = random.choice(CONDITIONS)
    
    return schemas.Prediction(
        condition=prediction["condition"],
        confidence=prediction["confidence"],
        recommendations=prediction["recommendations"]
    )