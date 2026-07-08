const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    uploadReport,
    compareReports,
    getReports,
    deleteReport
} = require("../controllers/reportController");

// ======================================
// UPLOAD SINGLE REPORT
// ======================================
router.post(
    "/upload",
    authMiddleware,
    upload.single("report"),
    uploadReport
);

// ======================================
// HEALTH PROGRESS TRACKER
// COMPARE TWO REPORTS
// ======================================
router.post(
    "/compare",
    authMiddleware,
    upload.fields([
        {
            name: "oldReport",
            maxCount: 1
        },
        {
            name: "newReport",
            maxCount: 1
        }
    ]),
    compareReports
);

// ======================================
// GET ALL REPORTS
// ======================================
router.get(
    "/",
    authMiddleware,
    getReports
);

// ======================================
// DELETE REPORT
// ======================================
router.delete(
    "/:id",
    authMiddleware,
    deleteReport
);

module.exports = router;