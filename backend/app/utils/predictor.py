import numpy as np
from sklearn.linear_model import LinearRegression

def train_salary_predictor(data):
    """
    Train simple regression model:
    features → experience
    target → salary_amount
    """
    if len(data) < 2:
        return None

    X = np.array([[d["experience_years"]] for d in data])
    y = np.array([d["salary_amount"] for d in data])

    model = LinearRegression()
    model.fit(X, y)
    return model

def predict_salary(model, experience):
    if not model:
        return None
    return int(model.predict([[experience]])[0])
