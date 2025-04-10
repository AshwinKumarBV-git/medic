# Healthcare API

A FastAPI-based backend for a healthcare application with user authentication, symptom tracking, and basic condition prediction.

## Features

- User registration and login with JWT authentication
- Symptom submission and tracking
- Basic condition prediction based on symptoms
- Optional chat interface (stub implementation)
- PostgreSQL database integration
- SQLAlchemy ORM with Pydantic models

## Prerequisites

- Python 3.8+
- PostgreSQL database
- pip (Python package manager)

## Setup

1. Clone the repository

2. Create a virtual environment:
```bash
python -m venv venv
.\venv\Scripts\activate  # On Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up your PostgreSQL database and update the `.env` file with your configuration:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/healthcare_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Running the Application

1. Start the FastAPI server:
```bash
python main.py
```

2. Access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication
- POST `/auth/register` - Register a new user
- POST `/auth/token` - Login and get access token

### Symptoms
- POST `/symptoms/` - Submit new symptoms
- GET `/symptoms/` - Get user's symptoms
- GET `/symptoms/{symptom_id}` - Get specific symptom

### Predictions
- POST `/predict` - Get condition prediction based on symptoms

### Chat (Stub)
- POST `/chat` - Chat interface for future AI integration

## Security

- JWT token-based authentication
- Password hashing with bcrypt
- PostgreSQL for secure data storage

## Development

The project follows a modular structure:
```
├── app/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   └── utils/
├── main.py
├── requirements.txt
└── .env
```

## Note

This is a development version. For production:
- Use proper security measures
- Set up proper error handling
- Configure CORS
- Use environment-specific configurations
- Implement proper logging