from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Dict, List

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- TEMP DATABASE ----------------
users: Dict[str, dict] = {}
credentials: Dict[str, str] = {}

# ---------------- REAL GOVERNMENT SCHEMES ----------------
schemes = [
    {
        "name": "PM Awas Yojana",
        "min_income": 0,
        "max_income": 300000,
        "gender": "all"
    },
    {
        "name": "PM Kisan Samman Nidhi",
        "min_income": 0,
        "max_income": 500000,
        "gender": "all"
    },
    {
        "name": "Beti Bachao Beti Padhao",
        "min_income": 0,
        "max_income": 400000,
        "gender": "female"
    },
    {
        "name": "Ayushman Bharat Yojana",
        "min_income": 0,
        "max_income": 250000,
        "gender": "all"
    },
    {
        "name": "PM Mudra Loan",
        "min_income": 0,
        "max_income": 800000,
        "gender": "all"
    }
]

# ---------------- MODELS ----------------

class SignupRequest(BaseModel):
    firstName: str
    lastName: str
    mobile: str
    email: EmailStr
    dob: str
    nationality: str
    state: str
    city: str
    areaType: str
    aadhaar: str

class CreateAccountRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

class EligibilityRequest(BaseModel):
    age: int
    income: int
    category: str
    state: str
    gender: str

# ---------------- ROUTES ----------------

@app.get("/")
def root():
    return {"message": "Gov-Yojnaarthi backend running"}

@app.post("/signup")
def signup(data: SignupRequest):
    user_id = f"USER{len(users)+1}"
    users[user_id] = data.dict()
    return {"message": "Registered", "userId": user_id}

@app.post("/create-account")
def create_account(data: CreateAccountRequest):
    if data.username in credentials:
        raise HTTPException(status_code=400, detail="Username already exists")

    credentials[data.username] = data.password
    return {"message": "Account created"}

@app.post("/login")
def login(data: LoginRequest):
    if credentials.get(data.username) != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login success"}

# ---------------- ELIGIBILITY ENGINE ----------------

@app.post("/eligibility")
def check_eligibility(data: EligibilityRequest):

    matched_schemes: List[str] = []

    for scheme in schemes:
        if (
            scheme["min_income"] <= data.income <= scheme["max_income"]
            and (scheme["gender"] == "all" or scheme["gender"] == data.gender.lower())
        ):
            matched_schemes.append(scheme["name"])

    # Always return at least 2 suggestions
    if len(matched_schemes) == 0:
        matched_schemes = [
            "PM Awas Yojana",
            "Ayushman Bharat Yojana"
        ]

    return {
        "schemes": matched_schemes
    }
