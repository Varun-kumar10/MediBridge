import joblib
import pandas as pd

# Load model and encoders
model = joblib.load("../models/disease_model.pkl")
mlb = joblib.load("../models/symptom_encoder.pkl")
le = joblib.load("../models/label_encoder.pkl")

# Load CSV files
disease_df = pd.read_csv("../datasets/disease.csv")
medicine_df = pd.read_csv("../datasets/medicines.csv")

def predict_disease(symptoms):

    X = mlb.transform([symptoms])

    prediction = model.predict(X)

    disease = le.inverse_transform(prediction)[0]

    # Description
    description = "Description not found"

    disease_row = disease_df[disease_df["Disease"] == disease]

    if not disease_row.empty:
        description = disease_row.iloc[0]["Description"]

    # Medicine
    medicine = "Medicine not found"

    medicine_row = medicine_df[medicine_df["Disease"] == disease]

    if not medicine_row.empty:
        medicine = medicine_row.iloc[0]["Medicine"]

    return {
        "disease": disease,
        "description": description,
        "medicine": medicine
    }