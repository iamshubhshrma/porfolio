from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Rate limiter setup
limiter = Limiter(key_func=get_remote_address)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Add rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)
    
    @validator('name')
    def validate_name(cls, v):
        if not re.match(r'^[a-zA-Z\s]+$', v):
            raise ValueError('Name must contain only letters and spaces')
        return v.strip()
    
    @validator('message')
    def validate_message(cls, v):
        return v.strip()

class ContactResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Shubham Sharma Portfolio API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ContactResponse)
@limiter.limit("5/minute")
async def submit_contact(request: Request, contact_data: ContactSubmission):
    try:
        # Create contact object
        contact = Contact(
            name=contact_data.name,
            email=contact_data.email,
            message=contact_data.message,
            ip_address=get_remote_address(request),
            user_agent=request.headers.get("user-agent", "")
        )
        
        # Save to database
        result = await db.contacts.insert_one(contact.dict())
        
        if result.inserted_id:
            logging.info(f"New contact submission from {contact_data.email}")
            return ContactResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon.",
                id=contact.id
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact")
            
    except Exception as e:
        logging.error(f"Contact submission error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts(limit: int = 50):
    """Admin endpoint to view contacts (for development/testing)"""
    contacts = await db.contacts.find().sort("created_at", -1).limit(limit).to_list(limit)
    return [Contact(**contact) for contact in contacts]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
