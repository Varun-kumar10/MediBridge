const db = require("../config/db");

/* ==============================
   ADD WATER INTAKE
============================== */

const addWaterIntake = (req, res) => {

    const userId = req.user.id;

    const { intake_ml, intake_date } = req.body;

    const sql = `
    INSERT INTO water_tracker
    (user_id, intake_ml, intake_date)
    VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [userId, intake_ml, intake_date],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                success: true,
                message: "Water intake added successfully"
            });

        }
    );

};

/* ==============================
   GET WATER HISTORY
============================== */

const getWaterHistory = (req, res) => {

    db.query(
        "SELECT * FROM water_tracker WHERE user_id=? ORDER BY intake_date DESC",
        [req.user.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                waterHistory: result
            });

        }
    );

};

/* ==============================
   UPDATE WATER INTAKE
============================== */

const updateWaterIntake = (req, res) => {

    const { intake_ml, intake_date } = req.body;

    db.query(
        "UPDATE water_tracker SET intake_ml=?, intake_date=? WHERE id=?",
        [intake_ml, intake_date, req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Water intake updated successfully"
            });

        }
    );

};

/* ==============================
   DELETE WATER RECORD
============================== */

const deleteWaterIntake = (req, res) => {

    db.query(
        "DELETE FROM water_tracker WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Water record deleted successfully"
            });

        }
    );

};

module.exports = {
    addWaterIntake,
    getWaterHistory,
    updateWaterIntake,
    deleteWaterIntake
};

