const express = require("express");

const router = express.Router();

const {

    sendOTP,
    verifyOTP,
    signup,
    login

} = require("../controllers/authController");

// ======================================
// SEND OTP
// ======================================

router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOTP);

// ======================================
// SIGNUP
// ======================================

router.post("/signup", signup);

// ======================================
// LOGIN
// ======================================

router.post("/login", login);

module.exports = router;