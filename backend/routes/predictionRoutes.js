const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    predictDisease,

    getPredictionHistory

} = require("../controllers/predictionController");

// Predict Disease
router.post(
    "/",
    authMiddleware,
    predictDisease
);

// Get Prediction History
router.get(
    "/history",
    authMiddleware,
    getPredictionHistory
);

module.exports = router;
