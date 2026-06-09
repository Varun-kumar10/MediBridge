const bcrypt = require("bcryptjs");
const db = require("../config/db");

/* ===================================
   GET USER PROFILE
=================================== */

const getProfile = (req, res) => {

    const userId = req.user.id;

    db.query(
        "SELECT id, full_name, email, phone, gender, date_of_birth, blood_group, address, profile_image, created_at FROM users WHERE id=?",
        [userId],
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
                    message: "User not found"
                });
            }

            res.status(200).json({
                success: true,
                user: result[0]
            });

        }
    );

};

/* ===================================
   UPDATE USER PROFILE
=================================== */

const updateProfile = (req, res) => {

    const userId = req.user.id;

    const {
        full_name,
        phone,
        gender,
        date_of_birth,
        blood_group,
        address
    } = req.body;

    db.query(
        `UPDATE users
        SET
        full_name=?,
        phone=?,
        gender=?,
        date_of_birth=?,
        blood_group=?,
        address=?
        WHERE id=?`,
        [
            full_name,
            phone,
            gender,
            date_of_birth,
            blood_group,
            address,
            userId
        ],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Profile updated successfully"
            });

        }
    );

};

/* ===================================
   CHANGE PASSWORD
=================================== */

const changePassword = async (req, res) => {

    const userId = req.user.id;

    const {
        currentPassword,
        newPassword
    } = req.body;

    db.query(
        "SELECT password FROM users WHERE id=?",
        [userId],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(
                currentPassword,
                user.password
            );

            if (!match) {
                return res.status(400).json({
                    success: false,
                    message: "Current password is incorrect"
                });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            db.query(
                "UPDATE users SET password=? WHERE id=?",
                [hashedPassword, userId],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    res.status(200).json({
                        success: true,
                        message: "Password changed successfully"
                    });

                }
            );

        }
    );

};

/* ===================================
   UPLOAD PROFILE IMAGE
=================================== */

const uploadProfileImage = (req, res) => {

    const userId = req.user.id;

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please upload an image"
        });
    }

    const imagePath = req.file.path;

    db.query(
        "UPDATE users SET profile_image=? WHERE id=?",
        [imagePath, userId],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Profile image uploaded successfully",
                image: imagePath
            });

        }
    );

};

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
    uploadProfileImage
};

