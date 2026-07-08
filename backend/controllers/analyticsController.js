const db = require("../config/db");

// ======================================
// DASHBOARD ANALYTICS
// ======================================

const getAnalytics = (req, res) => {

    const userId = req.user.id;

    const analytics = {};

    // Total Appointments
    db.query(
        "SELECT COUNT(*) AS totalAppointments FROM appointments WHERE user_id=?",
        [userId],
        (err, appointments) => {

            if (err) {
                return res.status(500).json(err);
            }

            analytics.totalAppointments = appointments[0].totalAppointments;

            // Total Reports
            db.query(
                "SELECT COUNT(*) AS totalReports FROM medical_reports WHERE user_id=?",
                [userId],
                (err, reports) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    analytics.totalReports = reports[0].totalReports;

                    // Total Water Intake
                    db.query(
                        "SELECT SUM(intake_ml) AS totalWater FROM water_tracker WHERE user_id=?",
                        [userId],
                        (err, water) => {

                            if (err) {
                                return res.status(500).json(err);
                            }

                            analytics.totalWater = water[0].totalWater || 0;

                            // Average Sleep
                            db.query(
                                "SELECT AVG(sleep_hours) AS averageSleep FROM sleep_tracker WHERE user_id=?",
                                [userId],
                                (err, sleep) => {

                                    if (err) {
                                        return res.status(500).json(err);
                                    }

                                    analytics.averageSleep =
                                        Number(sleep[0].averageSleep || 0).toFixed(1);

                                    // Medicine Reminders
                                    db.query(
                                        "SELECT COUNT(*) AS totalReminders FROM medicine_reminders WHERE user_id=?",
                                        [userId],
                                        (err, reminders) => {

                                            if (err) {
                                                return res.status(500).json(err);
                                            }

                                            analytics.totalReminders =
                                                reminders[0].totalReminders;

                                            // Disease Predictions
                                            db.query(
                                                "SELECT COUNT(*) AS totalPredictions FROM prediction_history WHERE user_id=?",
                                                [userId],
                                                (err, predictions) => {

                                                    if (err) {
                                                        return res.status(500).json(err);
                                                    }

                                                    analytics.totalPredictions =
                                                        predictions[0].totalPredictions;

                                                    res.status(200).json({
                                                        success: true,
                                                        analytics
                                                    });

                                                }
                                            );

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};


// ======================================
// WEEKLY WATER INTAKE
// ======================================

const getWeeklyWater = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            intake_date,
            SUM(intake_ml) AS totalWater
        FROM water_tracker
        WHERE user_id = ?
        AND intake_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        GROUP BY intake_date
        ORDER BY intake_date;
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            waterHistory: result
        });

    });

};

// ======================================
// MEDICINE ADHERENCE
// ======================================

const getMedicineAdherence = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            COUNT(*) AS totalMedicines,
            SUM(CASE WHEN taken_today = 1 THEN 1 ELSE 0 END) AS taken,
            SUM(CASE WHEN taken_today = 0 THEN 1 ELSE 0 END) AS missed,
            AVG(adherence_score) AS adherence
        FROM medicine_reminders
        WHERE user_id = ?;
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            medicineAnalytics: {
                totalMedicines: result[0].totalMedicines || 0,
                taken: result[0].taken || 0,
                missed: result[0].missed || 0,
                adherence:
                    Number(result[0].adherence || 0).toFixed(1)
            }
        });

    });

};

// ======================================
// LAST 7 DAYS SLEEP TREND
// ======================================

const getSleepTrend = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            sleep_date,
            sleep_hours
        FROM sleep_tracker
        WHERE user_id = ?
        AND sleep_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        ORDER BY sleep_date;
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            sleepHistory: result
        });

    });

};
// ======================================
// APPOINTMENT ANALYTICS
// ======================================

const getAppointmentAnalytics = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            COUNT(*) AS totalAppointments,

            SUM(CASE WHEN status='Pending' THEN 1 ELSE 0 END) AS pending,

            SUM(CASE WHEN status='Confirmed' THEN 1 ELSE 0 END) AS confirmed,

            SUM(CASE WHEN status='Completed' THEN 1 ELSE 0 END) AS completed,

            SUM(CASE WHEN status='Cancelled' THEN 1 ELSE 0 END) AS cancelled

        FROM appointments

        WHERE user_id = ?;
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({

            success: true,

            appointmentAnalytics: {

                totalAppointments:
                    result[0].totalAppointments || 0,

                pending:
                    result[0].pending || 0,

                confirmed:
                    result[0].confirmed || 0,

                completed:
                    result[0].completed || 0,

                cancelled:
                    result[0].cancelled || 0

            }

        });

    });

};
// ======================================
// MONTHLY REPORT ANALYTICS
// ======================================

const getReportAnalytics = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            DATE_FORMAT(uploaded_at, '%Y-%m') AS month,
            COUNT(*) AS totalReports
        FROM medical_reports
        WHERE user_id = ?
        GROUP BY DATE_FORMAT(uploaded_at, '%Y-%m')
        ORDER BY month;
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            reportAnalytics: result
        });

    });

};
// ======================================
// DISEASE PREDICTION TIMELINE
// ======================================

const getPredictionAnalytics = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            predicted_disease,
            symptoms,
            created_at
        FROM prediction_history
        WHERE user_id = ?
        ORDER BY created_at DESC;
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.status(200).json({
            success: true,
            predictionHistory: result
        });

    });

};
module.exports = {
    getAnalytics,
    getWeeklyWater,
    getSleepTrend,
    getMedicineAdherence,
    getAppointmentAnalytics,
    getReportAnalytics,
    getPredictionAnalytics
};