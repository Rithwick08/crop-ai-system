import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier

df = pd.read_csv("data/crop.csv")

X = df.drop("label", axis=1)
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

rf = RandomForestClassifier(
    n_estimators=300,
    max_depth=12
)

xgb = XGBClassifier(
    tree_method="hist",
    eval_metric="mlogloss"
)

lgb = LGBMClassifier(
    num_leaves=31
)

ensemble = VotingClassifier(
    estimators=[
        ("rf", rf),
        ("xgb", xgb),
        ("lgb", lgb)
    ],
    voting="soft"
)

ensemble.fit(X_train, y_train)

print("Accuracy:", ensemble.score(X_test, y_test))

joblib.dump(ensemble, "model.pkl")
print("Model saved")
