from pydantic import BaseModel, EmailStr, conint
from typing import Optional, List
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Symptom schemas
class SymptomBase(BaseModel):
    symptom_type: str
    severity: conint(ge=1, le=10)  # Ensure severity is between 1-10
    description: Optional[str] = None

class SymptomCreate(SymptomBase):
    pass

class Symptom(SymptomBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Prediction Response schema
class Prediction(BaseModel):
    condition: str
    confidence: float
    recommendations: List[str]

# Chat schemas
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str