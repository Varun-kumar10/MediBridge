const axios = require("axios");
const db = require("../config/db");

// =======================================
// DISEASE PREDICTION
// =======================================

const predictDisease = async (req, res) => {

    try {

        // Get data from request
        const userId = req.user.id;
        const { symptoms } = req.body;

        if (!symptoms) {
            return res.status(400).json({
                success: false,
                message: "Symptoms are required"
            });
        }

        // Call Flask ML API
        const response = await axios.post(
            "http://127.0.0.1:5000/predict",
            {
                symptoms: symptoms
            }
        );

        const predictedDisease = response.data.predicted_disease;
        const description = response.data.description;
        const medicine = response.data.medicine;

        // Save Prediction History
        db.query(
            `INSERT INTO prediction_history
            (user_id, symptoms, predicted_disease)
            VALUES (?, ?, ?)`,
            [
                userId,
                JSON.stringify(symptoms),
                predictedDisease
            ],
            (err) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                return res.status(200).json({
                    success: true,
                    symptoms,
                    predictedDisease,
                    description,
                    medicine
                });

            }
        );

    } catch (error) {

        console.log("========== ML API ERROR ==========");
        console.log(error.message);

        if (error.response) {
            console.log(error.response.data);
        }

        return res.status(500).json({
            success: false,
            message: "Unable to connect to ML API",
            error: error.message,
            flaskResponse: error.response
                ? error.response.data
                : null
        });

    }

};

// =======================================
// GET PREDICTION HISTORY
// =======================================

const getPredictionHistory = (req, res) => {

    db.query(
        "SELECT * FROM prediction_history WHERE user_id=? ORDER BY created_at DESC",
        [req.user.id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                history: result
            });

        }
    );

};

module.exports = {
    predictDisease,
    getPredictionHistory
};