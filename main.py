from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db, engine
from app.models import models
from app.routes import auth, symptoms, predictions, chat

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Healthcare API",
    description="A FastAPI backend for healthcare application with user authentication and symptom tracking",
    version="1.0.0"
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(symptoms.router, prefix="/symptoms", tags=["Symptoms"])
app.include_router(predictions.router, prefix="/predictions", tags=["Predictions"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Healthcare API"}

