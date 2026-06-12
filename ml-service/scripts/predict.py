import joblib

model = joblib.load("../models/disease_model.pkl")
mlb = joblib.load("../models/symptom_encoder.pkl")
le = joblib.load("../models/label_encoder.pkl")

user_symptoms = [
    "Fever",
    "Cough",
    "Headache",
    "Fatigue"
]

X = mlb.transform([user_symptoms])

prediction = model.predict(X)

disease = le.inverse_transform(prediction)

print("Predicted Disease:", disease[0])