
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const authMiddleware = (req, res, next) => {
    try {

        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No Token Provided."
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database
        db.query(
            "SELECT id, full_name, email FROM users WHERE id = ?",
            [decoded.id],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                if (result.length === 0) {
                    return res.status(401).json({
                        success: false,
                        message: "User not found"
                    });
                }

                // Attach user to request
                req.user = result[0];

                next();
            }
        );

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });

    }
};

module.exports = authMiddleware;

