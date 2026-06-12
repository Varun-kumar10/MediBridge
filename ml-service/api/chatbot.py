def chatbot_response(message):

    message = message.lower()

    if "fever" in message and "cough" in message:
        return {
            "response": "You may have Flu. Please consult a doctor."
        }

    elif "headache" in message:
        return {
            "response": "You may have Migraine symptoms."
        }

    elif "chest pain" in message:
        return {
            "response": "You may have Heart Disease symptoms. Please seek medical advice."
        }

    elif "high sugar" in message:
        return {
            "response": "You may have Diabetes symptoms."
        }

    elif "shortness of breath" in message:
        return {
            "response": "You may have Asthma symptoms."
        }

    else:
        return {
            "response": "Please provide more symptoms for analysis."
        }