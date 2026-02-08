import pandas as pd

rain = pd.read_csv("data/rainfall_state_avg.csv")

def get_rainfall(state):
    row = rain[rain["state"].str.lower()==state.lower()]
    if row.empty:
        return 800
    return float(row.iloc[0]["avg_rainfall"])
