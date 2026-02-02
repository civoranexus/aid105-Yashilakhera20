from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from datetime import datetime, timedelta
from pydantic import BaseModel, EmailStr
from typing import Optional

# -------------------------
# APP SETUP
# -------------------------
app = FastAPI(title="Gov-Yojnaarthi Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# AUTH CONFIG
# -------------------------
SECRET_KEY = "secret123"   # for demo (change in production)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# -------------------------
# DUMMY USERS (FOR NOW)
# -------------------------
fake_users_db = {
    
    "citizen1": {
        "username": "citizen1",
        "password": "citizen123",
        "role": "citizen",
    },
    "admin1": {
        "username": "admin1",
        "password": "admin123",
        "role": "admin",
    },
}

registered_users = []

# -------------------------
# HELPER FUNCTIONS
# -------------------------
def authenticate_user(username: str, password: str):
    user = fake_users_db.get(username)
    if not user:
        return None
    if user["password"] != password:
        return None
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# -------------------------
# ROUTES
# -------------------------

@app.get("/")
def root():
    return {"message": "Gov-Yojnaarthi backend running successfully"}


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        {"username": user["username"], "role": user["role"]}
    )
    from pydantic import BaseModel, EmailStr

class SignupRequest(BaseModel):
    firstName: str
    middleName: str | None = None
    lastName: str
    phone: str
    altPhone: str | None = None
    email: EmailStr
    dob: str
    nationality: str
    state: str
    city: str
    areaType: str
    locality: str
    aadhaar: str

@app.post("/signup")
def signup(user: SignupRequest):
    # Nationality rule
    if user.nationality.lower() != "india":
        raise HTTPException(status_code=403, detail="Only Indian citizens allowed")

    # Aadhaar validation (12 digits)
    if not user.aadhaar.isdigit() or len(user.aadhaar) != 12:
        raise HTTPException(status_code=400, detail="Invalid Aadhaar number")

    registered_users.append(user.dict())

    return {"message": "Signup successful"}


    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user["role"],
    }


@app.get("/dashboard")
def dashboard(current_user: dict = Depends(get_current_user)):
    return {
        "message": "Welcome to Gov-Yojnaarthi Dashboard",
        "user": current_user,
    }
