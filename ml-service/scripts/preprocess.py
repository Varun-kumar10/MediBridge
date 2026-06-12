import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Load dataset
df = pd.read_csv("../datasets/symptoms.csv")

# Fill missing values if any
df.fillna("None", inplace=True)

# Combine symptoms into one string
df["Symptoms"] = (
    df["Symptom_1"] + "," +
    df["Symptom_2"] + "," +
    df["Symptom_3"] + "," +
    df["Symptom_4"]
)

# Encode disease labels
label_encoder = LabelEncoder()
df["Disease_Encoded"] = label_encoder.fit_transform(df["Disease"])

# Create models folder if not exists
os.makedirs("../models", exist_ok=True)

# Save label encoder
joblib.dump(label_encoder, "../models/label_encoder.pkl")

print("Preprocessing Completed Successfully")
print(df[["Disease", "Disease_Encoded"]].head())