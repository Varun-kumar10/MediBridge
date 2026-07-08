const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    addSleep,
    getSleep,
    updateSleep,
    deleteSleep
} = require("../controllers/sleepController");

router.post("/", auth, addSleep);

router.get("/", auth, getSleep);

router.put("/:id", auth, updateSleep);

router.delete("/:id", auth, deleteSleep);

module.exports = router;

