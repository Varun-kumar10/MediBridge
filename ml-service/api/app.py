from flask import Flask, request, jsonify
from predict import predict_disease
from chatbot import chatbot_response
from report_analyzer import analyze_report

app = Flask(__name__)

# Home Route
@app.route("/")
def home():
    return "MediBridge AI Disease Prediction API Running"


# Disease Prediction API
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    if not data or "symptoms" not in data:
        return jsonify({
            "error": "Please provide symptoms"
        }), 400

    symptoms = data["symptoms"]

    result = predict_disease(symptoms)

    return jsonify({
        "predicted_disease": result["disease"],
        "description": result["description"],
        "medicine": result["medicine"]
    })


# Chatbot API
@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({
            "error": "Please provide a message"
        }), 400

    message = data["message"]

    result = chatbot_response(message)

    return jsonify(result)


# Report Analyzer API
@app.route("/analyze-report", methods=["POST"])
def analyze():

    data = request.get_json()

    if not data or "report" not in data:
        return jsonify({
            "error": "Please provide report text"
        }), 400

    report_text = data["report"]

    result = analyze_report(report_text)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)