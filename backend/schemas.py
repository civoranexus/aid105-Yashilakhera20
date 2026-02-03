from pydantic import BaseModel, EmailStr

class SignupRequest(BaseModel):
    firstName: str
    middleName: str | None = None
    lastName: str
    mobile: str
    alternateMobile: str | None = None
    email: EmailStr
    dob: str
    nationality: str
    state: str
    city: str
    areaType: str
    locality: str
    aadhaar: str
