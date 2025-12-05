from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from . import crud, schemas, models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Salary Reality Checker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/salary/add", response_model=schemas.SalaryOut)
def add_salary(data: schemas.SalaryCreate, db: Session = Depends(get_db)):
    return crud.create_salary(db, data)

@app.get("/salary/insights")
def salary_insights(job_role: str, city: str, experience: int,
                    db: Session = Depends(get_db)):
    return crud.get_salary_insights(db, job_role, city, experience)
