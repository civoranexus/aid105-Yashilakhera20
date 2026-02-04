from pydantic import BaseModel, EmailStr
from typing import Optional

# ---------- SIGNUP ----------
class SignupRequest(BaseModel):
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    mobile: str
    alternate_mobile: Optional[str] = None
    email: EmailStr
    dob: str
    nationality: str
    state: str
    city: str
    area_type: str  # Urban / Rural
    locality: str
    aadhaar: Optional[str] = None


# ---------- ELIGIBILITY ----------
class EligibilityRequest(BaseModel):
    age: int
    gender: str
    category: str
    annual_income: int
    state: str
    city: str
