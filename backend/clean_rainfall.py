import pandas as pd

print("Loading rainfall file...")

df = pd.read_csv("data/rainfall_raw.csv")

print("Columns:", df.columns)

# ✅ Use correct columns from your dataset
STATE_COL = "state_name"
RAIN_COL = "actual"

# remove missing rainfall rows
df = df.dropna(subset=[RAIN_COL])

print("Grouping rainfall by state...")

rain_state = (
    df.groupby(STATE_COL)[RAIN_COL]
    .mean()
    .reset_index()
)

rain_state.columns = ["state", "avg_rainfall"]

rain_state.to_csv("data/rainfall_state_avg.csv", index=False)

print("Saved rainfall_state_avg.csv ✅")
print(rain_state.head())
