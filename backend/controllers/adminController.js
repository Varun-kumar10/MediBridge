const db = require("../config/db");

// ======================================
// ADMIN DASHBOARD
// ======================================

const getDashboard = (req, res) => {

    const dashboard = {};

    // Total Users
    db.query(
        "SELECT COUNT(*) AS totalUsers FROM users",
        (err, users) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            dashboard.totalUsers = users[0].totalUsers;

            // Total Appointments
            db.query(
                "SELECT COUNT(*) AS totalAppointments FROM appointments",
                (err, appointments) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    dashboard.totalAppointments =
                        appointments[0].totalAppointments;

                    // Total Reports
                    db.query(
                        "SELECT COUNT(*) AS totalReports FROM medical_reports",
                        (err, reports) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }

                            dashboard.totalReports =
                                reports[0].totalReports;

                            // Total Predictions
                            db.query(
                                "SELECT COUNT(*) AS totalPredictions FROM prediction_history",
                                (err, predictions) => {

                                    if (err) {
                                        return res.status(500).json({
                                            success: false,
                                            message: err.message
                                        });
                                    }

                                    dashboard.totalPredictions =
                                        predictions[0].totalPredictions;

                                    // Total SOS
                                    db.query(
                                        "SELECT COUNT(*) AS totalSOS FROM sos_history",
                                        (err, sos) => {

                                            if (err) {
                                                return res.status(500).json({
                                                    success: false,
                                                    message: err.message
                                                });
                                            }

                                            dashboard.totalSOS =
                                                sos[0].totalSOS;

                                            // Total Medicine Reminders
                                            db.query(
                                                "SELECT COUNT(*) AS totalReminders FROM medicine_reminders",
                                                (err, reminders) => {

                                                    if (err) {
                                                        return res.status(500).json({
                                                            success: false,
                                                            message: err.message
                                                        });
                                                    }

                                                    dashboard.totalReminders =
                                                        reminders[0].totalReminders;

                                                    return res.status(200).json({
                                                        success: true,
                                                        dashboard
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
// GET ALL USERS
// ======================================

const getUsers = (req, res) => {

    db.query(
        `SELECT
            id,
            full_name,
            email,
            phone
         FROM users
         ORDER BY id DESC`,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                users: result
            });

        }
    );

};
// ======================================
// GET USER BY ID
// ======================================

const getUserById = (req, res) => {

    const userId = req.params.id;

    db.query(

        `SELECT
            id,
            full_name,
            email,
            phone,
            created_at
         FROM users
         WHERE id = ?`,

        [userId],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }

            res.status(200).json({

                success: true,

                user: result[0]

            });

        }

    );

};
// ======================================
// DELETE USER
// ======================================

const deleteUser = (req, res) => {

    db.query(
        "DELETE FROM users WHERE id=?",
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });

        }
    );

};
// ======================================
// GET ALL MEDICAL REPORTS
// ======================================

const getReports = (req, res) => {

    db.query(

        `SELECT
            medical_reports.id,
            users.full_name,
            medical_reports.report_title,
            medical_reports.report_type,
            medical_reports.disease_name,
            medical_reports.risk_level,
            medical_reports.health_score,
            medical_reports.uploaded_at
         FROM medical_reports
         INNER JOIN users
         ON medical_reports.user_id = users.id
         ORDER BY medical_reports.uploaded_at DESC`,

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.status(200).json({

                success: true,

                reports: result

            });

        }

    );

};
// ======================================
// GET REPORT BY ID
// ======================================

const getReportById = (req, res) => {

    const reportId = req.params.id;

    db.query(

        `SELECT
            medical_reports.*,
            users.full_name,
            users.email,
            users.phone
        FROM medical_reports
        INNER JOIN users
        ON medical_reports.user_id = users.id
        WHERE medical_reports.id = ?`,

        [reportId],

        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Report not found"
                });
            }

            return res.status(200).json({
                success: true,
                report: result[0]
            });

        }

    );

};
// ======================================
// DELETE REPORT
// ======================================

const deleteReport = (req, res) => {

    const reportId = req.params.id;

    db.query(

        "DELETE FROM medical_reports WHERE id = ?",

        [reportId],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Report not found"
                });

            }

            return res.status(200).json({

                success: true,

                message: "Report deleted successfully"

            });

        }

    );

};
// ======================================
// GET ALL PREDICTIONS
// ======================================

const getPredictions = (req, res) => {

    db.query(

        `SELECT
            prediction_history.id,
            users.full_name,
            prediction_history.symptoms,
            prediction_history.predicted_disease,
            prediction_history.created_at
        FROM prediction_history
        INNER JOIN users
        ON prediction_history.user_id = users.id
        ORDER BY prediction_history.created_at DESC`,

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.status(200).json({

                success: true,

                predictions: result

            });

        }

    );

};
// ======================================
// GET PREDICTION BY ID
// ======================================

const getPredictionById = (req, res) => {

    const predictionId = req.params.id;

    db.query(

        `SELECT
            prediction_history.id,
            users.full_name,
            users.email,
            users.phone,
            prediction_history.symptoms,
            prediction_history.predicted_disease,
            prediction_history.created_at
        FROM prediction_history
        INNER JOIN users
        ON prediction_history.user_id = users.id
        WHERE prediction_history.id = ?`,

        [predictionId],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Prediction not found"
                });

            }

            return res.status(200).json({

                success: true,

                prediction: result[0]

            });

        }

    );

};
// ======================================
// DELETE PREDICTION
// ======================================

const deletePrediction = (req, res) => {

    const predictionId = req.params.id;

    db.query(

        "DELETE FROM prediction_history WHERE id = ?",

        [predictionId],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Prediction not found"
                });

            }

            return res.status(200).json({

                success: true,

                message: "Prediction deleted successfully"

            });

        }

    );

};
// ======================================
// GET ALL SOS ALERTS
// ======================================

const getSOSHistory = (req, res) => {

    db.query(

        `SELECT
            sos_history.id,
            users.full_name,
            users.phone,
            sos_history.latitude,
            sos_history.longitude,
            sos_history.google_maps_link,
            sos_history.triggered_at
        FROM sos_history
        INNER JOIN users
        ON sos_history.user_id = users.id
        ORDER BY sos_history.triggered_at DESC`,

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.status(200).json({

                success: true,

                sos: result

            });

        }

    );

};
// ======================================
// GET SOS BY ID
// ======================================

const getSOSById = (req, res) => {

    const sosId = req.params.id;

    db.query(

        `SELECT
            sos_history.id,
            users.full_name,
            users.email,
            users.phone,
            sos_history.latitude,
            sos_history.longitude,
            sos_history.google_maps_link,
            sos_history.triggered_at
        FROM sos_history
        INNER JOIN users
        ON sos_history.user_id = users.id
        WHERE sos_history.id = ?`,

        [sosId],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "SOS record not found"
                });

            }

            return res.status(200).json({

                success: true,

                sos: result[0]

            });

        }

    );

};
// ======================================
// DELETE SOS ALERT
// ======================================

const deleteSOS = (req, res) => {

    const sosId = req.params.id;

    db.query(

        "DELETE FROM sos_history WHERE id = ?",

        [sosId],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "SOS record not found"
                });

            }

            return res.status(200).json({

                success: true,

                message: "SOS record deleted successfully"

            });

        }

    );

};
// ======================================
// GET ALL APPOINTMENTS
// ======================================

const getAppointments = (req, res) => {

    db.query(

        `SELECT
            appointments.id,
            users.full_name,
            users.email,
            users.phone,
            appointments.doctor_name,
            appointments.specialization,
            appointments.appointment_date,
            appointments.appointment_time,
            appointments.hospital_name,
            appointments.status,
            appointments.notes,
            appointments.created_at
        FROM appointments
        INNER JOIN users
        ON appointments.user_id = users.id
        ORDER BY appointments.created_at DESC`,

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.status(200).json({

                success: true,

                appointments: result

            });

        }

    );

};
// ======================================
// GET APPOINTMENT BY ID
// ======================================

const getAppointmentById = (req, res) => {

    const appointmentId = req.params.id;

    db.query(

        `SELECT
            appointments.id,
            users.full_name,
            users.email,
            users.phone,
            appointments.doctor_name,
            appointments.specialization,
            appointments.appointment_date,
            appointments.appointment_time,
            appointments.hospital_name,
            appointments.status,
            appointments.notes,
            appointments.created_at
        FROM appointments
        INNER JOIN users
        ON appointments.user_id = users.id
        WHERE appointments.id = ?`,

        [appointmentId],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Appointment not found"
                });

            }

            return res.status(200).json({

                success: true,

                appointment: result[0]

            });

        }

    );

};
// ======================================
// UPDATE APPOINTMENT STATUS
// ======================================

const updateAppointmentStatus = (req, res) => {

    const appointmentId = req.params.id;

    const { status } = req.body;

    db.query(

        `UPDATE appointments
         SET status = ?
         WHERE id = ?`,

        [
            status,
            appointmentId
        ],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Appointment not found"
                });

            }

            return res.status(200).json({

                success: true,

                message: "Appointment status updated successfully"

            });

        }

    );

};
// ======================================
// DELETE APPOINTMENT
// ======================================

const deleteAppointment = (req, res) => {

    const appointmentId = req.params.id;

    db.query(

        "DELETE FROM appointments WHERE id = ?",

        [appointmentId],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Appointment not found"
                });

            }

            return res.status(200).json({

                success: true,

                message: "Appointment deleted successfully"

            });

        }

    );

};
// ======================================
// GET ALL REMINDERS
// ======================================

const getReminders = (req, res) => {

    db.query(

        `SELECT
            medicine_reminders.id,
            users.full_name,
            users.email,
            users.phone,
            medicine_reminders.medicine_name,
            medicine_reminders.dosage,
            medicine_reminders.reminder_time,
            medicine_reminders.frequency,
            medicine_reminders.disease_name,
            medicine_reminders.ai_recommended,
            medicine_reminders.taken_today,
            medicine_reminders.adherence_score,
            medicine_reminders.start_date,
            medicine_reminders.end_date,
            medicine_reminders.created_at
        FROM medicine_reminders
        INNER JOIN users
        ON medicine_reminders.user_id = users.id
        ORDER BY medicine_reminders.created_at DESC`,

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.status(200).json({

                success: true,

                reminders: result

            });

        }

    );

};
// ======================================
// GET REMINDER BY ID
// ======================================

const getReminderById = (req, res) => {

    const reminderId = req.params.id;

    db.query(

        `SELECT
            medicine_reminders.id,
            users.full_name,
            users.email,
            users.phone,
            medicine_reminders.medicine_name,
            medicine_reminders.dosage,
            medicine_reminders.reminder_time,
            medicine_reminders.frequency,
            medicine_reminders.disease_name,
            medicine_reminders.ai_recommended,
            medicine_reminders.taken_today,
            medicine_reminders.adherence_score,
            medicine_reminders.start_date,
            medicine_reminders.end_date,
            medicine_reminders.created_at
        FROM medicine_reminders
        INNER JOIN users
        ON medicine_reminders.user_id = users.id
        WHERE medicine_reminders.id = ?`,

        [reminderId],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Reminder not found"
                });

            }

            return res.status(200).json({

                success: true,

                reminder: result[0]

            });

        }

    );

};
// ======================================
// UPDATE REMINDER
// ======================================

const updateReminder = (req, res) => {

    const reminderId = req.params.id;

    const {
        medicine_name,
        dosage,
        reminder_time,
        frequency,
        disease_name,
        start_date,
        end_date
    } = req.body;

    db.query(

        `UPDATE medicine_reminders
         SET
            medicine_name = ?,
            dosage = ?,
            reminder_time = ?,
            frequency = ?,
            disease_name = ?,
            start_date = ?,
            end_date = ?
         WHERE id = ?`,

        [
            medicine_name,
            dosage,
            reminder_time,
            frequency,
            disease_name,
            start_date,
            end_date,
            reminderId
        ],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Reminder not found"
                });

            }

            return res.status(200).json({

                success: true,

                message: "Reminder updated successfully"

            });

        }

    );

};
// ======================================
// DELETE REMINDER
// ======================================

const deleteReminder = (req, res) => {

    const reminderId = req.params.id;

    db.query(
        "DELETE FROM medicine_reminders WHERE id = ?",
        [reminderId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Reminder not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Reminder deleted successfully"
            });

        }
    );

};
// ======================================
// RECENT USERS
// ======================================

const getRecentUsers = (req, res) => {

    db.query(

        `SELECT
            id,
            full_name,
            email,
            phone,
            created_at
         FROM users
         ORDER BY created_at DESC
         LIMIT 10`,

        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                users: result
            });

        }

    );

};
// ======================================
// RECENT REPORTS
// ======================================

const getRecentReports = (req, res) => {

    db.query(

        `SELECT
            medical_reports.id,
            users.full_name,
            medical_reports.report_title,
            medical_reports.report_type,
            medical_reports.disease_name,
            medical_reports.risk_level,
            medical_reports.health_score,
            medical_reports.uploaded_at
        FROM medical_reports
        INNER JOIN users
        ON medical_reports.user_id = users.id
        ORDER BY medical_reports.uploaded_at DESC
        LIMIT 10`,

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.status(200).json({

                success: true,

                reports: result

            });

        }

    );

};
// ======================================
// RECENT PREDICTIONS
// ======================================

const getRecentPredictions = (req, res) => {

    db.query(

        `SELECT
            prediction_history.id,
            users.full_name,
            prediction_history.symptoms,
            prediction_history.predicted_disease,
            prediction_history.created_at
        FROM prediction_history
        INNER JOIN users
        ON prediction_history.user_id = users.id
        ORDER BY prediction_history.created_at DESC
        LIMIT 10`,

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.status(200).json({

                success: true,

                predictions: result

            });

        }

    );

};
// ======================================
// MONTHLY REGISTRATIONS
// ======================================

const getMonthlyRegistrations = (req, res) => {

    const sql = `
        SELECT
            MONTHNAME(created_at) AS month,
            COUNT(*) AS total_users
        FROM users
        GROUP BY
            MONTH(created_at),
            MONTHNAME(created_at)
        ORDER BY MONTH(created_at)
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            registrations: result
        });

    });

};
// ======================================
// DISEASE STATISTICS
// ======================================

const getDiseaseStatistics = (req, res) => {

    const sql = `
        SELECT
            disease_name,
            COUNT(*) AS total_patients
        FROM medical_reports
        WHERE disease_name IS NOT NULL
          AND disease_name <> ''
        GROUP BY disease_name
        ORDER BY total_patients DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        return res.status(200).json({

            success: true,

            diseases: result

        });

    });

};
// ======================================
// USER GROWTH CHART
// ======================================

const getUserGrowth = (req, res) => {

    const sql = `
    SELECT
        YEAR(created_at) AS year,
        MONTH(created_at) AS month_number,
        MONTHNAME(created_at) AS month,
        COUNT(*) AS total_users
    FROM users
    GROUP BY
        YEAR(created_at),
        MONTH(created_at),
        MONTHNAME(created_at)
    ORDER BY
        YEAR(created_at),
        MONTH(created_at)
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            growth: result
        });

    });

};
// ======================================
// SEARCH USERS
// ======================================

const searchUsers = (req, res) => {

    const keyword = req.query.keyword;

    const sql = `
        SELECT
            id,
            full_name,
            email,
            phone,
            gender,
            blood_group,
            created_at
        FROM users
        WHERE
            full_name LIKE ?
            OR email LIKE ?
            OR phone LIKE ?
        ORDER BY created_at DESC
    `;

    const search = `%${keyword}%`;

    db.query(
        sql,
        [search, search, search],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.status(200).json({

                success: true,

                total: result.length,

                users: result

            });

        }
    );

};
// ======================================
// SEARCH REPORTS
// ======================================

const searchReports = (req, res) => {

    const keyword = req.query.keyword;

    const search = `%${keyword}%`;

    const sql = `
        SELECT
            medical_reports.id,
            users.full_name,
            medical_reports.report_title,
            medical_reports.report_type,
            medical_reports.disease_name,
            medical_reports.risk_level,
            medical_reports.health_score,
            medical_reports.uploaded_at
        FROM medical_reports
        JOIN users
            ON medical_reports.user_id = users.id
        WHERE
            users.full_name LIKE ?
            OR medical_reports.report_title LIKE ?
            OR medical_reports.report_type LIKE ?
            OR medical_reports.disease_name LIKE ?
        ORDER BY medical_reports.uploaded_at DESC
    `;

    db.query(
        sql,
        [search, search, search, search],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                total: result.length,
                reports: result
            });

        }
    );

};
// ======================================
// SEARCH PREDICTIONS
// ======================================

const searchPredictions = (req, res) => {

    const keyword = req.query.keyword;

    const search = `%${keyword}%`;

    const sql = `
        SELECT
            prediction_history.id,
            users.full_name,
            prediction_history.symptoms,
            prediction_history.predicted_disease,
            prediction_history.created_at
        FROM prediction_history
        JOIN users
            ON prediction_history.user_id = users.id
        WHERE
            users.full_name LIKE ?
            OR prediction_history.symptoms LIKE ?
            OR prediction_history.predicted_disease LIKE ?
        ORDER BY prediction_history.created_at DESC
    `;

    db.query(
        sql,
        [search, search, search],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                total: result.length,
                predictions: result
            });

        }
    );

};
// ======================================
// SYSTEM HEALTH
// ======================================

const getSystemHealth = (req, res) => {

    db.query(
        "SELECT 1 AS status",
        (err) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    backend: "Online",

                    database: "Disconnected",

                    api: "Unhealthy",

                    server_time: new Date()

                });

            }

            return res.status(200).json({

                success: true,

                backend: "Online",

                database: "Connected",

                api: "Healthy",

                server_time: new Date()

            });

        }
    );

};
// ======================================
// GET ACTIVITY LOGS
// ======================================

const getActivityLogs = (req, res) => {

    const sql = `
        SELECT
            activity_logs.id,
            users.full_name,
            activity_logs.activity_type,
            activity_logs.description,
            activity_logs.created_at
        FROM activity_logs
        LEFT JOIN users
            ON activity_logs.user_id = users.id
        ORDER BY activity_logs.created_at DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        return res.status(200).json({

            success: true,

            total: result.length,

            activities: result

        });

    });

};
const exportUsers = (req, res) => {

    const sql = `
        SELECT
            id,
            full_name,
            email,
            phone,
            gender,
            blood_group,
            created_at
        FROM users
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        return res.status(200).json({

            success: true,

            total: result.length,

            users: result

        });

    });

};
// ======================================
// EXPORT REPORTS
// ======================================

const exportReports = (req, res) => {

    const sql = `
        SELECT
            medical_reports.id,
            users.full_name,
            medical_reports.report_title,
            medical_reports.report_type,
            medical_reports.disease_name,
            medical_reports.risk_level,
            medical_reports.health_score,
            medical_reports.uploaded_at
        FROM medical_reports
        JOIN users
            ON medical_reports.user_id = users.id
        ORDER BY medical_reports.uploaded_at DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        return res.status(200).json({

            success: true,

            total: result.length,

            reports: result

        });

    });

};
// ======================================
// EXPORT PREDICTIONS
// ======================================

const exportPredictions = (req, res) => {

    const sql = `
        SELECT
            prediction_history.id,
            users.full_name,
            prediction_history.symptoms,
            prediction_history.predicted_disease,
            prediction_history.created_at
        FROM prediction_history
        JOIN users
            ON prediction_history.user_id = users.id
        ORDER BY prediction_history.created_at DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        return res.status(200).json({

            success: true,

            total: result.length,

            predictions: result

        });

    });

};
module.exports = {
    getDashboard,
    getUsers,
    getUserById,
    deleteUser,
    getReports,
    getReportById,
    deleteReport,
    getPredictions,
    getPredictionById,
    deletePrediction,
    getSOSHistory,
    getSOSById,
    deleteSOS,
    getAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    deleteAppointment,
    getReminders,
    getReminderById,
    updateReminder,
    deleteReminder,
    getRecentUsers,
    getRecentReports,
    getRecentPredictions,
    getMonthlyRegistrations,
    getDiseaseStatistics,
    getUserGrowth,
    searchUsers,
    searchReports,
    searchPredictions,
    getSystemHealth,
    getActivityLogs,
    exportUsers,
    exportReports,
    exportPredictions
};
 