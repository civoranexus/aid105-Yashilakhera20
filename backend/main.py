from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from datetime import date

app = FastAPI(title="Gov-Yojnaarthi API")

# -------------------- CORS --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- SCHEMAS --------------------

class SignupRequest(BaseModel):
    first_name: str = Field(..., min_length=2)
    middle_name: Optional[str] = None
    last_name: str = Field(..., min_length=2)

    mobile: str = Field(..., min_length=10, max_length=10)
    alternate_mobile: Optional[str] = None

    email: EmailStr
    dob: date

    nationality: str
    aadhaar: Optional[str] = None

    state: str
    city: str

    area_type: Literal["Urban", "Rural"]
    locality: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


class EligibilityRequest(BaseModel):
    age: int = Field(..., ge=0, le=120)
    gender: Literal["Male", "Female", "Other"]
    category: Literal["General", "OBC", "SC", "ST"]
    annual_income: int = Field(..., ge=0)
    state: str
    urban_rural: Literal["Urban", "Rural"]


# -------------------- ROUTES --------------------

@app.get("/")
def root():
    return {"message": "Gov-Yojnaarthi backend running successfully"}


@app.post("/signup")
def signup(data: SignupRequest):
    # Aadhaar rule
    if data.nationality.lower() == "india" and not data.aadhaar:
        raise HTTPException(
            status_code=400,
            detail="Aadhaar number is required for Indian citizens"
        )

    if data.nationality.lower() != "india":
        raise HTTPException(
            status_code=403,
            detail="Currently this service is only available for Indian citizens"
        )

    return {
        "status": "success",
        "message": "User registered successfully"
    }


@app.post("/login")
def login(data: LoginRequest):
    # Dummy login (replace with DB later)
    if data.email and data.password:
        return {
            "status": "success",
            "token": "dummy-jwt-token"
        }

    raise HTTPException(status_code=401, detail="Invalid credentials")


@app.post("/eligibility")
def check_eligibility(data: EligibilityRequest):
    schemes = []

    if data.annual_income <= 250000:
        schemes.append("PM Jan Dhan Yojana")

    if data.gender == "Female":
        schemes.append("Beti Bachao Beti Padhao")

    if data.category in ["SC", "ST"]:
        schemes.append("Scholarship Scheme for SC/ST")

    if data.age >= 60:
        schemes.append("Senior Citizen Pension Scheme")

    return {
        "eligible": True if schemes else False,
        "schemes": schemes
    }