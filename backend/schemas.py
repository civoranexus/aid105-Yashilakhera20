from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import date

class SignupRequest(BaseModel):
    first_name: str = Field(..., min_length=1)
    middle_name: Optional[str] = None
    last_name: str = Field(..., min_length=1)

    mobile: str = Field(..., min_length=10, max_length=10)
    alternate_mobile: Optional[str] = None

    email: EmailStr
    dob: date

    nationality: str
    state: str
    city: str
    area_type: str  # Urban / Rural

    aadhaar: Optional[str] = None
    username: str
    password: str
