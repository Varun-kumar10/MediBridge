const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    checkSymptoms,
    getHistory
} = require("../controllers/symptomController");

router.post("/", auth, checkSymptoms);

router.get("/", auth, getHistory);

module.exports = router;
