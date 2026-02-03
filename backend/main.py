from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import List, Optional

# ---------------- APP ----------------
app = FastAPI(title="Gov-Yojnaarthi API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DATABASE ----------------
DATABASE_URL = "sqlite:///./govyojnaarthi.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    middle_name = Column(String, nullable=True)
    last_name = Column(String)
    mobile = Column(String)
    alternate_mobile = Column(String, nullable=True)
    email = Column(String, unique=True)
    dob = Column(String)
    nationality = Column(String)
    state = Column(String)
    city = Column(String)
    area_type = Column(String)
    locality = Column(String)
    aadhaar = Column(String)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- AUTH ----------------
fake_users_db = {
    "citizen1": {"password": "citizen123", "role": "citizen"},
    "admin1": {"password": "admin123", "role": "admin"}
}

class LoginResponse(BaseModel):
    message: str
    role: str

@app.post("/login", response_model=LoginResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_users_db.get(form_data.username)
    if not user or user["password"] != form_data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "role": user["role"]}

# ---------------- SIGNUP ----------------
class SignupRequest(BaseModel):
    firstName: str
    middleName: Optional[str] = None
    lastName: str
    mobile: str
    alternateMobile: Optional[str] = None
    email: EmailStr
    dob: str
    nationality: str
    state: str
    city: str
    areaType: str
    locality: str
    aadhaar: str

@app.post("/signup")
def signup(user: SignupRequest, db: Session = Depends(get_db)):
    if user.nationality != "India":
        raise HTTPException(status_code=403, detail="Only Indian citizens allowed")

    if not user.aadhaar.isdigit() or len(user.aadhaar) != 12:
        raise HTTPException(status_code=400, detail="Invalid Aadhaar number")

    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=409, detail="User already exists")

    new_user = User(
        first_name=user.firstName,
        middle_name=user.middleName,
        last_name=user.lastName,
        mobile=user.mobile,
        alternate_mobile=user.alternateMobile,
        email=user.email,
        dob=user.dob,
        nationality=user.nationality,
        state=user.state,
        city=user.city,
        area_type=user.areaType,
        locality=user.locality,
        aadhaar=user.aadhaar
    )

    db.add(new_user)
    db.commit()
    return {"message": "Registration successful"}

# ---------------- SCHEME RECOMMENDATION ----------------
class EligibilityRequest(BaseModel):
    age: int
    income: int
    category: str
    gender: str
    state: str

class Scheme(BaseModel):
    name: str
    description: str
    eligibility: str

@app.post("/recommend", response_model=List[Scheme])
def recommend(data: EligibilityRequest):
    schemes = []

    if data.age >= 60:
        schemes.append(Scheme(
            name="Senior Citizen Pension Scheme",
            description="Monthly pension for senior citizens",
            eligibility="Age 60+"
        ))

    if data.income <= 250000:
        schemes.append(Scheme(
            name="PM Jan Dhan Yojana",
            description="Zero balance banking scheme",
            eligibility="Income below ₹2.5L"
        ))

    if data.category.lower() in ["sc", "st"]:
        schemes.append(Scheme(
            name="Post Matric Scholarship",
            description="Scholarship for SC/ST students",
            eligibility="SC/ST category"
        ))

    if data.gender.lower() == "female":
        schemes.append(Scheme(
            name="Sukanya Samriddhi Yojana",
            description="Savings scheme for girl child",
            eligibility="Female applicants"
        ))

    if not schemes:
        schemes.append(Scheme(
            name="No Matching Scheme",
            description="No scheme found for given profile",
            eligibility="—"
        ))

    return schemes
