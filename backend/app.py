import joblib
import numpy as np

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from rainfall_lookup import get_rainfall
from weather import get_weather

model = joblib.load("model.pkl")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@app.post("/predict")
def predict(d: InputData):

    w = get_weather(d.city)
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