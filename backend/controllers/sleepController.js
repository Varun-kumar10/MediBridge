const db = require("../config/db");

const addSleep = (req, res) => {
    const { sleep_hours, sleep_date } = req.body;

    db.query(
        "INSERT INTO sleep_tracker(user_id,sleep_hours,sleep_date) VALUES(?,?,?)",
        [req.user.id, sleep_hours, sleep_date],
        (err) => {
            if (err) return res.status(500).json(err);

            res.json({
                success: true,
                message: "Sleep record added successfully"
            });
        }
    );
};

const getSleep = (req, res) => {
    db.query(
        "SELECT * FROM sleep_tracker WHERE user_id=? ORDER BY sleep_date DESC",
        [req.user.id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);
        }
    );
};

const updateSleep = (req, res) => {

    db.query(
        "UPDATE sleep_tracker SET sleep_hours=?,sleep_date=? WHERE id=?",
        [
            req.body.sleep_hours,
            req.body.sleep_date,
            req.params.id
        ],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                success: true,
                message: "Sleep updated"
            });

        }
    );

};

const deleteSleep = (req, res) => {

    db.query(
        "DELETE FROM sleep_tracker WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                success: true,
                message: "Sleep record deleted"
            });

        }
    );

};

module.exports = {
    addSleep,
    getSleep,
    updateSleep,
    deleteSleep
};

