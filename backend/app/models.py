from sqlalchemy import Column, Integer, String
from .database import Base

class Salary(Base):
    __tablename__ = "salaries"

    id = Column(Integer, primary_key=True, index=True)
    job_role = Column(String, index=True, nullable=False)
    city = Column(String, index=True, nullable=False)
    experience_years = Column(Integer, nullable=False)
    salary_amount = Column(Integer, nullable=False)
    source = Column(String, nullable=True)
