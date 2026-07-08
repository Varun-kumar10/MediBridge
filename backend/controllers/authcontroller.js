const bcrypt = require("bcryptjs");
const db = require("../config/db");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/otpGenerator");
const { sendOTPEmail } = require("../services/emailService");

/* ======================================
   SEND OTP
====================================== */

const sendOTP = (req, res) => {

    const { email } = req.body;

    if (!email) {

        return res.status(400).json({
            success: false,
            message: "Email is required"
        });

    }

    // Check if email already registered

    db.query(
        "SELECT id FROM users WHERE email=?",
        [email],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length > 0) {

                return res.status(400).json({
                    success: false,
                    message: "Email already registered. Please login."
                });

            }

            const otp = generateOTP();

            const expiresAt = new Date(
                Date.now() + 5 * 60 * 1000
            );

            db.query(

                `INSERT INTO email_otp
                (email, otp, verified, expires_at)
                VALUES (?, ?, FALSE, ?)
                ON DUPLICATE KEY UPDATE
                    otp = VALUES(otp),
                    verified = FALSE,
                    expires_at = VALUES(expires_at)`,

                [
                    email,
                    otp,
                    expiresAt
                ],

                async (err) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }

                    await sendOTPEmail(email, otp);

                    return res.status(200).json({

                        success: true,

                        message: "OTP sent successfully."

                    });

                }

            );

        }

    );

};
/* ======================================
   VERIFY OTP
====================================== */

const verifyOTP = (req, res) => {

    const { email, otp } = req.body;

    if (!email || !otp) {

        return res.status(400).json({
            success: false,
            message: "Email and OTP are required"
        });

    }

    db.query(

        "SELECT * FROM email_otp WHERE email=?",

        [email],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "OTP not found"
                });

            }

            const otpData = result[0];

            // Check OTP

            if (otpData.otp !== otp) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP"
                });

            }

            // Check Expiry

            if (new Date() > new Date(otpData.expires_at)) {

                return res.status(400).json({
                    success: false,
                    message: "OTP Expired"
                });

            }

            // Mark Email Verified

            db.query(

                "UPDATE email_otp SET verified = TRUE WHERE email=?",

                [email],

                (err) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }

                    return res.status(200).json({

                        success: true,

                        message: "OTP Verified Successfully"

                    });

                }

            );

        }

    );

};
/* ======================================
   USER SIGNUP
====================================== */

const signup = async (req, res) => {

    try {

        const {

            full_name,
            email,
            password,
            phone,
            gender,
            date_of_birth,
            blood_group,
            address

        } = req.body;

        if (!full_name || !email || !password) {

            return res.status(400).json({

                success: false,
                message: "Please fill all required fields"

            });

        }
// ======================================
// CHECK EMAIL VERIFIED
// ======================================

db.query(

    "SELECT * FROM email_otp WHERE email=?",

    [email],

    async (err, otpResult) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: err.message

            });

        }

        if (otpResult.length === 0 || !otpResult[0].verified) {

            return res.status(400).json({

                success: false,
                message: "Please verify your email first."

            });

        }

        // ======================================
        // CHECK EXISTING USER
        // ======================================

        db.query(

            "SELECT * FROM users WHERE email=?",

            [email],

            async (err, result) => {

                if (err) {

                    return res.status(500).json({

                        success: false,
                        message: err.message

                    });

                }

                if (result.length > 0) {

                    return res.status(400).json({

                        success: false,
                        message: "User already exists"

                    });

                }

                // ======================================
                // HASH PASSWORD
                // ======================================

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                // ======================================
                // INSERT USER
                // ======================================

                db.query(

                    `INSERT INTO users
                    (
                        full_name,
                        email,
                        password,
                        phone,
                        gender,
                        date_of_birth,
                        blood_group,
                        address
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

                    [

                        full_name,
                        email,
                        hashedPassword,
                        phone,
                        gender,
                        date_of_birth,
                        blood_group,
                        address

                    ],

                    (err) => {

                        if (err) {

                            return res.status(500).json({

                                success: false,
                                message: err.message

                            });

                        }

                        // ======================================
                        // DELETE OTP AFTER SUCCESSFUL SIGNUP
                        // ======================================

                        db.query(

                            "DELETE FROM email_otp WHERE email=?",

                            [email],

                            (deleteErr) => {

                                if (deleteErr) {

                                    console.log(deleteErr);

                                }

                                return res.status(201).json({

                                    success: true,

                                    message: "User Registered Successfully"

                                });

                            }

                        );

                    }

                );

            }

        );

    }
);
}catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }
};

/* ======================================
   USER LOGIN
====================================== */

const login = (req, res) => {

    try {

        const {

            email,
            password

        } = req.body;

        db.query(

            "SELECT * FROM users WHERE email=?",

            [email],

            async (err, result) => {

                if (err) {

                    return res.status(500).json({

                        success: false,
                        message: err.message

                    });

                }

                if (result.length === 0) {

                    return res.status(400).json({

                        success: false,

                        message: "Invalid Email"

                    });

                }

                const user = result[0];

                const match =
                    await bcrypt.compare(
                        password,
                        user.password
                    );

                if (!match) {

                    return res.status(400).json({

                        success: false,

                        message: "Invalid Password"

                    });

                }

                const token =
                    generateToken(user.id);

                return res.status(200).json({

                    success: true,

                    message: "Login Successful",

                    token,

                    user: {

                        id: user.id,
                        full_name: user.full_name,
                        email: user.email

                    }

                });

            }

        );

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    sendOTP,
    verifyOTP,
    signup,
    login

};