from sqlalchemy import Column, Integer, String
from database import Base

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
