const db = require("../config/db");

const logActivity = (
    userId,
    activityType,
    description
) => {

    const sql = `
        INSERT INTO activity_logs
        (
            user_id,
            activity_type,
            description
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            activityType,
            description
        ],
        (err) => {

            if (err) {

                console.log("Activity Log Error:", err.message);

            }

        }
    );

};

module.exports = {
    logActivity
};