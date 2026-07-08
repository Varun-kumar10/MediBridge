const db = require("../config/db");

// ==============================
// BOOK APPOINTMENT
// ==============================

const bookAppointment = (req, res) => {

    const userId = req.user.id;

    const {
        doctor_name,
        specialization,
        appointment_date,
        appointment_time,
        hospital_name,
        notes
    } = req.body;

    const sql = `
    INSERT INTO appointments
    (user_id, doctor_name, specialization,
    appointment_date, appointment_time,
    hospital_name, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            doctor_name,
            specialization,
            appointment_date,
            appointment_time,
            hospital_name,
            notes
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                success: true,
                message: "Appointment Booked Successfully"
            });

        }
    );

};

// ==============================
// GET USER APPOINTMENTS
// ==============================

const getAppointments = (req, res) => {

    db.query(
        "SELECT * FROM appointments WHERE user_id=? ORDER BY appointment_date DESC",
        [req.user.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                appointments: result
            });

        }
    );

};

// ==============================
// UPDATE APPOINTMENT
// ==============================

const updateAppointment = (req, res) => {

    const id = req.params.id;

    const {
        doctor_name,
        specialization,
        appointment_date,
        appointment_time,
        hospital_name,
        notes,
        status
    } = req.body;

    const sql = `
    UPDATE appointments
    SET
    doctor_name=?,
    specialization=?,
    appointment_date=?,
    appointment_time=?,
    hospital_name=?,
    notes=?,
    status=?
    WHERE id=?
    `;

    db.query(
        sql,
        [
            doctor_name,
            specialization,
            appointment_date,
            appointment_time,
            hospital_name,
            notes,
            status,
            id
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Appointment Updated Successfully"
            });

        }
    );

};

// ==============================
// DELETE APPOINTMENT
// ==============================

const deleteAppointment = (req, res) => {

    db.query(
        "DELETE FROM appointments WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Appointment Deleted Successfully"
            });

        }
    );

};

module.exports = {
    bookAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment
};
