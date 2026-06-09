
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const generateToken = require("../utils/generateToken");

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

        // Check required fields
        if (!full_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        // Check existing user
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: "User already exists"
                    });
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert user
                db.query(
                    `INSERT INTO users
                    (full_name,email,password,phone,gender,date_of_birth,blood_group,address)
                    VALUES (?,?,?,?,?,?,?,?)`,
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
                    (err, data) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            success: true,
                            message: "User Registered Successfully"
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json({
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

        const { email, password } = req.body;

        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length === 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid Email"
                    });
                }

                const user = result[0];

                const match = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!match) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid Password"
                    });
                }

                const token = generateToken(user.id);

                res.status(200).json({
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

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    signup,
    login
};

