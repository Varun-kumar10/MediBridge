import pandas as pd
import joblib
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("../datasets/symptoms.csv")

# Load model and encoders
model = joblib.load("../models/disease_model.pkl")
mlb = joblib.load("../models/symptom_encoder.pkl")
le = joblib.load("../models/label_encoder.pkl")

# Prepare features
symptoms = df[["Symptom_1", "Symptom_2", "Symptom_3", "Symptom_4"]].astype(str).values.tolist()

X = mlb.transform(symptoms)
y_true = le.transform(df["Disease"])

# Predict
y_pred = model.predict(X)

# Accuracy
accuracy = accuracy_score(y_true, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")