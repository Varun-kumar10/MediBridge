const db = require("../config/db");

const checkSymptoms = (req, res) => {

    const userId = req.user.id;

    const { symptoms } = req.body;

    // Temporary prediction
    const predictedDisease = "Common Cold";
    const confidence = 87.50;

    db.query(
        `INSERT INTO symptom_history
        (user_id,symptoms,predicted_disease,confidence)
        VALUES(?,?,?,?)`,
        [
            userId,
            symptoms,
            predictedDisease,
            confidence
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                symptoms,
                predictedDisease,
                confidence
            });

        }
    );

};

const getHistory = (req, res) => {

    db.query(
        "SELECT * FROM symptom_history WHERE user_id=? ORDER BY created_at DESC",
        [req.user.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

};

module.exports = {
    checkSymptoms,
    getHistory
};
