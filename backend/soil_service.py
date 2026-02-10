import csv
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "soil_data.csv"

def get_locations():
    """
    Reads the soil_data.csv and returns a nested dictionary:
    {
        "State1": {
            "District1": "SoilType",
            "District2": "SoilType"
        },
        ...
    }
    """
    locations = {}
    
    if not DATA_FILE.exists():
        return locations

    with open(DATA_FILE, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            state = row['State']
            district = row['District']
            soil_type = row['SoilType']
            rainfall = row.get('AvgRainfall', None)
            
            if state not in locations:
                locations[state] = []
            
            locations[state].append({
                "district": district,
                "soil_type": soil_type,
                "avg_rainfall": float(rainfall) if rainfall else None
            })
            
    return locations
