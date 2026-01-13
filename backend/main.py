from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
import pandas as pd

from auth import authenticate_user, create_access_token, role_required

# APP INITIALIZATION

app = FastAPI(
    title="SchemeAssist AI",
    description="AI-based Government Scheme Recommendation System",
    version="1.0"
)

# SCHEME DATABASE (SIMULATED)

schemes_df = pd.DataFrame([
    {
        "scheme_name": "PM Awas Yojana",
        "min_income": 0,
        "max_income": 600000,
        "age_min": 18,
        "age_max": 70,
        "rural": 1,
        "urban": 1,
        "benefit": "Housing subsidy for citizens"
    },
    {
        "scheme_name": "PM Kisan Samman Nidhi",
        "min_income": 0,
        "max_income": 200000,
        "age_min": 18,
        "age_max": 65,
        "rural": 1,
        "urban": 0,
        "benefit": "Income support to farmers"
    },
    {
        "scheme_name": "Skill India Mission",
        "min_income": 0,
        "max_income": 1000000,
        "age_min": 18,
        "age_max": 45,
        "rural": 0,
        "urban": 1,
        "benefit": "Skill development and training programs"
    }
])

# DATA MODELS

class UserProfile(BaseModel):
    age: int
    income: int
    location: str   # rural / urban
    need: str

# AUTHENTICATION ENDPOINT

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token = create_access_token(
        data={"sub": user["username"]}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user["role"]
    }

# ELIGIBILITY SCORING LOGIC

def calculate_eligibility_score(user: UserProfile, scheme):
    score = 0

    # Income eligibility
    if scheme["min_income"] <= user.income <= scheme["max_income"]:
        score += 40

    # Age eligibility
    if scheme["age_min"] <= user.age <= scheme["age_max"]:
        score += 30

    # Location eligibility
    if user.location == "rural" and scheme["rural"] == 1:
        score += 20
    elif user.location == "urban" and scheme["urban"] == 1:
        score += 20

    return score

# CITIZEN API (PROTECTED)

@app.post("/recommend")
def recommend_schemes(
    user_profile: UserProfile,
    user=Depends(role_required("citizen"))
):
    recommendations = []

    for _, scheme in schemes_df.iterrows():
        score = calculate_eligibility_score(user_profile, scheme)

        if score > 40:
            recommendations.append({
                "scheme_name": scheme["scheme_name"],
                "eligibility_score": score,
                "benefit": scheme["benefit"]
            })

    recommendations.sort(
        key=lambda x: x["eligibility_score"],
        reverse=True
    )

    return {
        "citizen_profile": user_profile,
        "recommended_schemes": recommendations
    }

# ADMIN API (PROTECTED)

@app.get("/admin/schemes")
def view_all_schemes(
    user=Depends(role_required("admin"))
):
    return schemes_df.to_dict(orient="records")

# HEALTH CHECK

@app.get("/")
def root():
    return {"message": "SchemeAssist AI backend is running successfully"}