const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addReminder,
    getReminders,
    updateReminderStatus,
    deleteReminder
} = require("../controllers/reminderController");

// Add Reminder
router.post("/", authMiddleware, addReminder);

// Get All Reminders
router.get("/", authMiddleware, getReminders);

// Update Reminder Status
router.put("/:id", authMiddleware, updateReminderStatus);

// Delete Reminder
router.delete("/:id", authMiddleware, deleteReminder);

module.exports = router;

