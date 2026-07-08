const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addWaterIntake,
    getWaterHistory,
    updateWaterIntake,
    deleteWaterIntake
} = require("../controllers/waterController");

// Add Water Intake
router.post("/", authMiddleware, addWaterIntake);

// Get Water History
router.get("/", authMiddleware, getWaterHistory);

// Update Water Intake
router.put("/:id", authMiddleware, updateWaterIntake);

// Delete Water Record
router.delete("/:id", authMiddleware, deleteWaterIntake);

module.exports = router;

