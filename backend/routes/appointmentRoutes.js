const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    bookAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment
} = require("../controllers/appointmentController");

// Book Appointment
router.post("/", authMiddleware, bookAppointment);

// Get All Appointments
router.get("/", authMiddleware, getAppointments);

// Update Appointment
router.put("/:id", authMiddleware, updateAppointment);

// Delete Appointment
router.delete("/:id", authMiddleware, deleteAppointment);

module.exports = router;

