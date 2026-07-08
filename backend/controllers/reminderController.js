const db = require("../config/db");

// ==============================
// ADD MEDICINE REMINDER
// ==============================

const addReminder = (req, res) => {

    const userId = req.user.id;

    const {
        medicine_name,
        dosage,
        reminder_time,
        reminder_date
    } = req.body;

    const sql = `
    INSERT INTO medicine_reminders
    (user_id, medicine_name, dosage, reminder_time, reminder_date)
    VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            medicine_name,
            dosage,
            reminder_time,
            reminder_date
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                success: true,
                message: "Medicine Reminder Added Successfully"
            });

        }
    );

};

// ==============================
// GET ALL REMINDERS
// ==============================

const getReminders = (req, res) => {

    db.query(
        "SELECT * FROM medicine_reminders WHERE user_id=? ORDER BY reminder_date DESC, reminder_time ASC",
        [req.user.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                reminders: result
            });

        }
    );

};

// ==============================
// UPDATE REMINDER STATUS
// ==============================

const updateReminderStatus = (req, res) => {

    const { status } = req.body;

    db.query(
        "UPDATE medicine_reminders SET status=? WHERE id=?",
        [status, req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Reminder Status Updated Successfully"
            });

        }
    );

};

// ==============================
// DELETE REMINDER
// ==============================

const deleteReminder = (req, res) => {

    db.query(
        "DELETE FROM medicine_reminders WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Reminder Deleted Successfully"
            });

        }
    );

};

module.exports = {
    addReminder,
    getReminders,
    updateReminderStatus,
    deleteReminder
};

