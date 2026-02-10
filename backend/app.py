import joblib
import numpy as np
from datetime import timedelta

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from rainfall_lookup import get_rainfall
from weather import get_weather
from soil_service import get_locations

model = joblib.load("model.pkl")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    N: float
    P: float
    K: float
    ph: float
    state: str
    city: str
    temperature: float | None = None
    humidity: float | None = None
    rainfall: float | None = None

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is running"}

@app.get("/locations")
def locations():
    return get_locations()

@app.post("/predict")
def predict(d: InputData):

    # Use overrides if provided, otherwise fetch from APIs
    if d.temperature is not None and d.humidity is not None:
        w = {"temperature": d.temperature, "humidity": d.humidity}
    else:
        w = get_weather(d.city)

    if d.rainfall is not None:
        rain = d.rainfall
    else:
        rain = get_rainfall(d.state)

    features = np.array([[
        d.N,
        d.P,
        d.K,
        w["temperature"],
        w["humidity"],
        d.ph,
        rain
    ]])

    pred = model.predict(features)[0]
    probs = model.predict_proba(features)[0]
    top3 = sorted(
        zip(model.classes_, probs),
        key=lambda x: x[1],
        reverse=True
        )[:3]
    print("MODEL PROBABILITIES:")
    for crop, prob in top3:
        print(crop, prob)
        
        prediction = top3[0][0]
        confidence = float(top3[0][1])
    
    return {
        "crop": prediction,
        "temperature": w["temperature"],
        "humidity": w["humidity"],
        "rainfall": rain,
        "probabilities": {
            model.classes_[i]: float(probs[i])
            for i in range(len(model.classes_))
        }
    }

# --- Database & Auth Setup ---
# --- Database & Auth Setup ---
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from database_mongo import get_db
import auth

class UserCreate(BaseModel):
    username: str
    email: str | None = None
    phone: str | None = None
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    username: str

@app.post("/signup", response_model=Token)
def signup(user: UserCreate, db = Depends(get_db)):
    # Build query for existing user check
    # Only include email/phone if they are provided and not empty
    query_conditions = [{"username": user.username}]
    
    if user.email and user.email.strip():
        query_conditions.append({"email": user.email})
    
    if user.phone and user.phone.strip():
        query_conditions.append({"phone": user.phone})
        
    # Check if user exists (by username, email, or phone)
    existing_user = db.users.find_one({
        "$or": query_conditions
    })
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username, Email or Phone already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = {
        "username": user.username,
        "email": user.email if user.email and user.email.strip() else None,
        "phone": user.phone if user.phone and user.phone.strip() else None,
        "hashed_password": hashed_password
    }
    result = db.users.insert_one(new_user)
    
    # Generate token
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": new_user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "username": new_user["username"]}

class LoginRequest(BaseModel):
    identifier: str # username or email or phone
    password: str

@app.post("/login", response_model=Token)
def login(login_data: LoginRequest, db = Depends(get_db)):
    # Find user by identifier
    user = db.users.find_one({
        "$or": [
            {"username": login_data.identifier},
            {"email": login_data.identifier},
            {"phone": login_data.identifier}
        ]
    })
    
    if not user or not auth.verify_password(login_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email/phone or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "username": user["username"]}

# --- Analytics Endpoints ---
from analytics import get_yearly_rainfall, get_crop_economics

@app.get("/analytics/rainfall/{state_name}")
def analytics_rainfall(state_name: str):
    data = get_yearly_rainfall(state_name)
    if not data:
         # Return empty list or 404, empty list is better for graphs
        return [] 
    return data

@app.get("/analytics/economics")
def analytics_economics():
    return get_crop_economics()