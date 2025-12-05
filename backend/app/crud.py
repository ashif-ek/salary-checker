from sqlalchemy.orm import Session

from .models import Salary
from .utils.smart_match import best_match
from .utils.predictor import train_salary_predictor, predict_salary


def get_salary_insights(db: Session, job_role: str, city: str, experience: int):
    # -------------------------
    # 1) Prepare lists for smart matching
    # -------------------------
    all_roles = [r[0] for r in db.query(Salary.job_role).distinct().all()]
    all_cities = [c[0] for c in db.query(Salary.city).distinct().all()]

    # Smart match
    role_match = best_match(job_role, all_roles)
    city_match = best_match(city, all_cities)

    # If no similar match found → will fallback later
    if not role_match:
        role_match = job_role
    if not city_match:
        city_match = city

    # -------------------------
    # 2) LEVEL 1 — exact smart-matched query
    # -------------------------
    rows = (
        db.query(Salary.salary_amount)
        .filter(Salary.job_role == role_match)
        .filter(Salary.city == city_match)
        .filter(Salary.experience_years == experience)
        .all()
    )

    # -------------------------
    # 3) LEVEL 2 — match only job role
    # -------------------------
    if not rows:
        rows = (
            db.query(Salary.salary_amount)
            .filter(Salary.job_role == role_match)
            .all()
        )

    # -------------------------
    # 4) LEVEL 3 — use ALL salaries
    # -------------------------
    if not rows:
        rows = db.query(Salary.salary_amount).all()

    # If STILL nothing → DB empty
    if not rows:
        return {"no_data": True, "message": "Dataset empty"}

    values = [r[0] for r in rows]
    values.sort()
    n = len(values)

    def pct(p):
        i = int(p * (n - 1))
        return values[i]

    # -------------------------
    # 5) Train ML model for fallback prediction
    # -------------------------
    raw_data = db.query(Salary).all()
    formatted = [
        {
            "experience_years": item.experience_years,
            "salary_amount": item.salary_amount,
        }
        for item in raw_data
    ]

    model = train_salary_predictor(formatted)
    predicted_salary = predict_salary(model, experience)

    return {
        "no_data": False,
        "fallback_mode":
            "exact" if len(rows) == n else
            "role_only" if role_match else
            "global",

        "prediction": predicted_salary,

        "p10": pct(0.10),
        "p25": pct(0.25),
        "p50": pct(0.50),
        "p75": pct(0.75),
        "p90": pct(0.90),
    }
