import os
import joblib
import pandas as pd

# -----------------------------
# Get project base directory
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# -----------------------------
# Paths
# -----------------------------
MODELS_DIR = os.path.join(BASE_DIR, "models")
DATASETS_DIR = os.path.join(BASE_DIR, "datasets")

# -----------------------------
# Load model and encoders
# -----------------------------
model = joblib.load(os.path.join(MODELS_DIR, "disease_model.pkl"))
mlb = joblib.load(os.path.join(MODELS_DIR, "symptom_encoder.pkl"))
le = joblib.load(os.path.join(MODELS_DIR, "label_encoder.pkl"))

# -----------------------------
# Load datasets
# -----------------------------
disease_df = pd.read_csv(os.path.join(DATASETS_DIR, "disease.csv"))
medicine_df = pd.read_csv(os.path.join(DATASETS_DIR, "medicines.csv"))

# -----------------------------
# Prediction Function
# -----------------------------
def predict_disease(symptoms):
    try:
        # Convert symptoms into model input
        X = mlb.transform([symptoms])

        # Predict disease
        prediction = model.predict(X)

        # Decode prediction
        disease = le.inverse_transform(prediction)[0]

        # Default values
        description = "Description not found"
        medicine = "Medicine not found"

        # Get disease description
        disease_row = disease_df[disease_df["Disease"] == disease]
        if not disease_row.empty:
            description = disease_row.iloc[0]["Description"]

        # Get medicine
        medicine_row = medicine_df[medicine_df["Disease"] == disease]
        if not medicine_row.empty:
            medicine = medicine_row.iloc[0]["Medicine"]

        return {
            "disease": disease,
            "description": description,
            "medicine": medicine
        }

    except Exception as e:
        return {
            "error": str(e)
        }