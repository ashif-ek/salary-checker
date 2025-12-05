from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import Salary

def create_salary(db: Session, data):
    new_salary = Salary(
        job_role=data.job_role,
        city=data.city,
        experience_years=data.experience_years,
        salary_amount=data.salary_amount,
        source=data.source
    )
    db.add(new_salary)
    db.commit()
    db.refresh(new_salary)
    return new_salary

def get_salary_insights(db: Session, job_role: str, city: str, experience: int):
    # Fetch salaries
    salaries = db.query(Salary.salary_amount).filter(
        Salary.job_role == job_role,
        Salary.city == city,
        Salary.experience_years == experience
    ).all()

    # Convert from list of tuples → list of numbers
    salaries = [s[0] for s in salaries]

    # If no salaries found → return safe response
    if not salaries:
        return {
            "p10": None,
            "p25": None,
            "p50": None,
            "p75": None,
            "p90": None,
            "message": "No salary data found for this combination."
        }

    # Sort for percentile logic
    salaries.sort()

    def percentile(values, p):
        index = int(len(values) * p / 100)
        index = min(index, len(values) - 1)
        return values[index]

    return {
        "p10": percentile(salaries, 10),
        "p25": percentile(salaries, 25),
        "p50": percentile(salaries, 50),
        "p75": percentile(salaries, 75),
        "p90": percentile(salaries, 90)
    }
