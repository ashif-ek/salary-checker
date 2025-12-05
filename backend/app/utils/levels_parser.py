import re

# Convert YOE (1, 2, 5, 12...)
def normalize_experience(yoe):
    if yoe is None:
        return None
    try:
        return int(yoe)
    except:
        return None


# Extract city from "Seattle, WA" → "Seattle"
def normalize_city(location):
    if not location:
        return None

    # Remove state/country codes
    city = location.split(",")[0].strip()
    return city


# Extract job role from title
# Examples:
# "Software Engineer" → "Software Engineer"
# "ML Engineer - L5" → "ML Engineer"
def normalize_role(title):
    if not title:
        return None

    title = re.sub(r"- L\d+", "", title).strip()
    return title


# The salary API gives "totalComp"
# You can choose base salary instead.
def normalize_salary(entry):
    base = entry.get("baseSalary")
    total = entry.get("totalComp")

    if total and total > 0:
        return int(total)
    if base and base > 0:
        return int(base)

    return None
