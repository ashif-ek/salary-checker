# 💼 Salary Reality Checker – AI-Powered Salary Insights

A FAANG-style salary analytics platform that calculates market percentiles, 
predicts salaries using machine learning, and auto-corrects user input using fuzzy matching.

Built with:
- FastAPI
- PostgreSQL
- SQLAlchemy
- scikit-learn ML
- React + Vite + TailwindCSS
- Recharts + Framer Motion

---

## 🚀 Features

### 🔹 Smart Percentile Engine
Calculates:
- P10
- P25
- P50 (Median)
- P75
- P90

### 🔹 Fuzzy Matching (AI Auto-Correction)
Even if user types:
`py devloper`, `sofware eng`, `hyd`, `blr`  
→ App finds the closest valid match.

### 🔹 ML Salary Prediction
If database has no entry:
- Trains a Linear Regression model
- Predicts salary based on experience trends

### 🔹 Admin Tools
- Upload CSV dataset
- Bulk insert into PostgreSQL

### 🔹 Modern UI (React)
- Annual / Monthly toggle
- Animated charts
- Shimmer loading state
- Auto-suggest dropdown
- Dark & Light mode

---

## 🏗️ Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- scikit-learn
- RapidFuzz

### Frontend
- React (Vite)
- TailwindCSS
- Recharts
- Framer Motion

---

## 📡 API Endpoints

### ➤ Add Salary
`POST /salary/add`

### ➤ Bulk Upload Dataset
`POST /salary/bulk`

### ➤ Get Salary Insights (Percentiles + ML)
`GET /salary/insights?job_role=&city=&experience=`

### ➤ Predict Salary
`GET /salary/predict?job_role=&city=&experience=`

---

## 🔧 Setup Instructions

### Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd frontend
npm install
npm run dev


---

## 📊 Demo Preview

- Percentile charts
- Salary comparison
- Fuzzy auto-correct input fields
- ML-powered predictions
- Elegant FAANG-grade UI

---



