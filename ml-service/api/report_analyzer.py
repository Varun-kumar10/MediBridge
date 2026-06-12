import pandas as pd

# Load disease descriptions
disease_df = pd.read_csv("../datasets/disease.csv")

def analyze_report(report_text):

    report_text = report_text.lower()

    disease_keywords = {
        "Flu": ["fever", "cough", "headache", "fatigue"],
        "Cold": ["sneezing", "runny nose", "sore throat"],
        "Diabetes": ["high sugar", "frequent urination", "increased thirst"],
        "Hypertension": ["high blood pressure", "dizziness"],
        "Asthma": ["wheezing", "shortness of breath"],
        "Heart Disease": ["chest pain", "heart problem"],
        "Anemia": ["low hemoglobin", "weakness"],
        "Migraine": ["severe headache"],
        "COVID-19": ["loss of smell", "loss of taste", "fever"],
        "Dengue": ["platelet", "body pain"],
        "Malaria": ["chills", "fever"],
        "Typhoid": ["prolonged fever"],
        "Pneumonia": ["lung infection", "breathing difficulty"],
        "Tuberculosis": ["persistent cough", "weight loss"]
    }

    scores = {}

    for disease, keywords in disease_keywords.items():

        score = 0

        for keyword in keywords:
            if keyword in report_text:
                score += 1

        if score > 0:
            scores[disease] = score

    if not scores:
        return {
            "message": "No matching disease found"
        }

    best_disease = max(scores, key=scores.get)

    disease_row = disease_df[disease_df["Disease"] == best_disease]

    description = "Description not found"

    if not disease_row.empty:
        description = disease_row.iloc[0]["Description"]

    return {
        "disease": best_disease,
        "description": description,
        "score": scores[best_disease]
    }