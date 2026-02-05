from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- MODELS ----------------

class SignupRequest(BaseModel):
    first_name: str
    last_name: str
    mobile: str
    email: EmailStr
    dob: str
    nationality: str
    state: str
    city: str
    aadhaar: str | None = None
    area_type: str

class CreateAccountRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str


# ---------------- TEMP DATABASE ----------------

users = {}
accounts = {}


# ---------------- ROUTES ----------------

@app.get("/")
def root():
    return {"message": "Gov-Yojnaarthi backend running successfully"}


@app.post("/signup")
def signup(data: SignupRequest):
    user_id = str(uuid.uuid4())

    users[user_id] = data.dict()

    return {
        "message": "Registration successful",
        "user_id": user_id
    }


@app.post("/create-account")
def create_account(data: CreateAccountRequest):
    if len(data.password) < 6:
        raise HTTPException(status_code=400, detail="Password too short")

    if data.username in accounts:
        raise HTTPException(status_code=400, detail="Username already exists")

    accounts[data.username] = data.password

    return {
        "message": "Account created successfully",
        "username": data.username
    }


@app.post("/login")
def login(data: LoginRequest):
    if data.username not in accounts:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if accounts[data.username] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "username": data.username
    }
