from pydantic import BaseModel

class SalaryBase(BaseModel):
    job_role: str
    city: str
    experience_years: int
    salary_amount: int

class SalaryCreate(SalaryBase):
    pass

class SalaryOut(SalaryBase):
    id: int

    class Config:
        orm_mode = True
