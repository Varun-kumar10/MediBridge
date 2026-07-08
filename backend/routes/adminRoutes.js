const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
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
} = require("../controllers/adminController");
// ======================================
// ADMIN DASHBOARD
// ======================================
router.get("/dashboard", auth, getDashboard);

// ======================================
// USER MANAGEMENT
// ======================================
router.get("/users", auth, getUsers);

router.get("/users/:id", auth, getUserById);

router.delete("/users/:id", auth, deleteUser);

// ======================================
// REPORT MANAGEMENT
// ======================================
router.get("/reports", auth, getReports);

router.get("/reports/:id", auth, getReportById);

router.delete("/reports/:id", auth, deleteReport);

// ======================================
// PREDICTION MANAGEMENT
// ======================================

// Get all predictions
router.get("/predictions", auth, getPredictions);

// Get prediction by ID
router.get("/predictions/:id", auth, getPredictionById);
// ======================================
// DELETE PREDICTION
// ======================================

router.delete("/predictions/:id", auth, deletePrediction);

// ======================================
// SOS MANAGEMENT
// ======================================

router.get("/sos", auth, getSOSHistory);

// ======================================
// GET SOS BY ID
// ======================================

router.get("/sos/:id", auth, getSOSById);

// ======================================
// DELETE SOS ALERT
// ======================================

router.delete("/sos/:id", auth, deleteSOS);

// ======================================
// APPOINTMENT MANAGEMENT
// ======================================

router.get("/appointments", auth, getAppointments);

// ======================================
// GET APPOINTMENT BY ID
// ======================================

router.get("/appointments/:id", auth, getAppointmentById);
// ======================================
// UPDATE APPOINTMENT STATUS
// ======================================

// ======================================
// DELETE APPOINTMENT
// ======================================

router.delete("/appointments/:id", auth, deleteAppointment);

router.put("/appointments/:id", auth, updateAppointmentStatus);
// ======================================
// REMINDER MANAGEMENT
// ======================================

router.get("/reminders", auth, getReminders);

// ======================================
// GET REMINDER BY ID
// ======================================

router.get("/reminders/:id", auth, getReminderById);

// ======================================
// UPDATE REMINDER
// ======================================

router.put("/reminders/:id", auth, updateReminder);

// ======================================
// DELETE REMINDER
// ======================================

router.delete("/reminders/:id", auth, deleteReminder);
// ======================================
// ANALYTICS
// ======================================

// Recent Users
router.get("/recent-users", auth, getRecentUsers);

// Recent Reports
router.get("/recent-reports", auth, getRecentReports);

// Recent Predictions
router.get("/recent-predictions", auth, getRecentPredictions);

// Monthly Registrations
router.get("/monthly-registrations", auth, getMonthlyRegistrations);

// Disease Statistics
router.get("/disease-statistics", auth, getDiseaseStatistics);

// User Growth
router.get("/user-growth", auth, getUserGrowth);

// Search Users
router.get("/search/users", auth, searchUsers);

// Search Reports
router.get("/search/reports", auth, searchReports);

// Search Predictions
router.get("/search/predictions", auth, searchPredictions);

// System Health
router.get("/system-health", auth, getSystemHealth);

// Activity Logs
router.get("/activity-logs", auth, getActivityLogs);

// Export Users
router.get("/export/users", auth, exportUsers);

// Export Reports
router.get("/export/reports", auth, exportReports);

// Export Predictions
router.get("/export/predictions", auth, exportPredictions);

module.exports = router;
