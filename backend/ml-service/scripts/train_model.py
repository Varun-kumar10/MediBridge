import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer

# Load dataset
df = pd.read_csv("../datasets/symptoms.csv")

# Create symptom list
symptoms = df[["Symptom_1", "Symptom_2", "Symptom_3", "Symptom_4"]].values.tolist()

# Convert symptoms to binary features
mlb = MultiLabelBinarizer()
X = mlb.fit_transform(symptoms)

# Encode disease labels
from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()
y = le.fit_transform(df["Disease"])

# Train model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

# Save model and encoder
joblib.dump(model, "../models/disease_model.pkl")
joblib.dump(mlb, "../models/symptom_encoder.pkl")
joblib.dump(le, "../models/label_encoder.pkl")

print("Model trained successfully!")
print("Files saved in models folder.")