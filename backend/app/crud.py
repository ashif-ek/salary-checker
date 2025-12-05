from sqlalchemy.orm import Session
from .models import Salary
from . import models


def create_salary(db: Session, data):
    new_salary = Salary(
        job_role=data.job_role,
        city=data.city,
        experience_years=data.experience_years,
        salary_amount=data.salary_amount,
        source=getattr(data, "source", None),
    )
    db.add(new_salary)
    db.commit()
    db.refresh(new_salary)
    return new_salary


def get_salary_insights(db: Session, job_role: str, city: str, experience: int):
    """
    Return salary percentiles for a given job_role / city / experience.
    If no data is found, return a no_data flag so frontend can handle it safely.
    """

    rows = (
        db.query(Salary.salary_amount)
        .filter(Salary.job_role == job_role)
        .filter(Salary.city == city)
        .filter(Salary.experience_years == experience)
        .all()
    )

    amounts = [r[0] for r in rows]

    if not amounts:
        # No data: explicitly tell frontend
        return {
            "no_data": True,
            "message": "No salary data found for this combination.",
            "p10": None,
            "p25": None,
            "p50": None,
            "p75": None,
            "p90": None,
        }

    amounts.sort()
    n = len(amounts)

    def percentile(prob: float) -> int:
        """
        prob: 0.10, 0.25, 0.50, 0.75, 0.90
        Uses nearest-rank on sorted list.
        """
        if n == 1:
            return amounts[0]
        idx = int(round(prob * (n - 1)))
        idx = max(0, min(idx, n - 1))
        return amounts[idx]

    return {
        "no_data": False,
        "message": None,
        "p10": percentile(0.10),
        "p25": percentile(0.25),
        "p50": percentile(0.50),
        "p75": percentile(0.75),
        "p90": percentile(0.90),
    }


def bulk_create_salaries(db: Session, items):
    objects = [
        models.Salary(
            job_role=item.job_role,
            city=item.city,
            experience_years=item.experience_years,
            salary_amount=item.salary_amount,
            source=getattr(item, "source", None),
        )
        for item in items
    ]
    db.bulk_save_objects(objects)
    db.commit()
    return len(objects)
