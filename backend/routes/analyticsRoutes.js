const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    getAnalytics,
    getWeeklyWater,
    getSleepTrend,
    getMedicineAdherence,
    getAppointmentAnalytics,
    getReportAnalytics,
    getPredictionAnalytics
} = require("../controllers/analyticsController");

// Dashboard Analytics
router.get("/", auth, getAnalytics);

// Weekly Water Intake
router.get("/water", auth, getWeeklyWater);

// Sleep Trend
router.get("/sleep", auth, getSleepTrend);

// Medicine Adherence
router.get("/medicine", auth, getMedicineAdherence);

// Appointment Statistics
router.get("/appointments", auth, getAppointmentAnalytics);

router.get("/reports", auth, getReportAnalytics);

router.get("/predictions", auth, getPredictionAnalytics);// Test Route
router.get("/hello", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello Analytics"
    });
});

module.exports = router;