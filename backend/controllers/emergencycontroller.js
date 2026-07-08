const db = require("../config/db");
const { sendEmail } = require("../services/emailService");

// ======================================
// ADD EMERGENCY CONTACT
// ======================================

const addContact = (req, res) => {

    const {
        contact_name,
        relationship,
        phone,
        email
    } = req.body;

    db.query(
        `INSERT INTO emergency_contacts
         (user_id, contact_name, relationship, phone, email)
         VALUES (?, ?, ?, ?, ?)`,
        [
            req.user.id,
            contact_name,
            relationship,
            phone,
            email
        ],
        (err) => {

            if (err) {

                console.log("ADD CONTACT ERROR:");
                console.log(err);

                return res.status(500).json({
                   success: false,
                   error: err
                });

    }
            res.status(201).json({
                success: true,
                message: "Emergency contact added successfully"
            });

        }
    );

};

// ======================================
// GET ALL CONTACTS
// ======================================

const getContacts = (req, res) => {

    db.query(
        "SELECT * FROM emergency_contacts WHERE user_id=?",
        [req.user.id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                contacts: result
            });

        }
    );

};

// ======================================
// UPDATE CONTACT
// ======================================

const updateContact = (req, res) => {

    const { id } = req.params;

    const {
        contact_name,
        relationship,
        phone,
        email
    } = req.body;

    db.query(
        `UPDATE emergency_contacts
         SET contact_name=?,
             relationship=?,
             phone=?,
             email=?
         WHERE id=? AND user_id=?`,
        [
            contact_name,
            relationship,
            phone,
            email,
            id,
            req.user.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Contact not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Emergency contact updated successfully"
            });

        }
    );

};
// ======================================
// DELETE CONTACT
// ======================================

const deleteContact = (req, res) => {

    db.query(
        "DELETE FROM emergency_contacts WHERE id=? AND user_id=?",
        [
            req.params.id,
            req.user.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Contact not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Emergency contact deleted successfully"
            });

        }
    );

};
// ======================================
// TRIGGER SOS
// ======================================

const triggerSOS = (req, res) => {

    console.log("TRIGGER SOS FUNCTION CALLED");

    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({
            success: false,
            message: "Latitude and Longitude are required"
        });
    }

    const googleMaps =
        `https://maps.google.com/?q=${latitude},${longitude}`;

    // Save SOS History
    db.query(

        `INSERT INTO sos_history
        (user_id, latitude, longitude, google_maps_link)
        VALUES (?, ?, ?, ?)`,

        [
            req.user.id,
            latitude,
            longitude,
            googleMaps
        ],

        (insertErr) => {

           if (insertErr) {

                console.log("INSERT ERROR:", insertErr);

                return res.status(500).json({
                    success: false,
                    message: insertErr.message
               });

         }

console.log("SOS History Inserted");         

            // Fetch Emergency Contacts
            db.query(

                `SELECT
                    contact_name,
                    relationship, 
                    phone,
                    email
                    FROM emergency_contacts
                    WHERE user_id=?`,

                [req.user.id],

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
                            message: "No emergency contacts found"
                        });

                    }
    // Send Email to every emergency contact
result.forEach((contact) => {

    if (contact.email) {

        sendEmail(

            contact.email,

            "🚨 MediBridge Emergency SOS Alert",

            `Hello ${contact.contact_name},

An emergency SOS has been triggered.

📍 Google Maps Location:
${googleMaps}

Please check on the user immediately.

Thank you,
MediBridge Team`

        );

    }

});

return res.status(200).json({

    success: true,

    message: "🚨 SOS Triggered Successfully",

    googleMaps,

    contacts: result

});
                               }

            );

        }

    );

};

// ======================================
// SAVE LIVE LOCATION
// ======================================

const saveLiveLocation = (req, res) => {

    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {

        return res.status(400).json({
            success: false,
            message: "Latitude and Longitude are required"
        });

    }

    res.status(200).json({

        success: true,

        message: "Live location received",

        location: {
            latitude,
            longitude
        }

    });

};
// ======================================
// GET SOS HISTORY
// ======================================

const getSOSHistory = (req, res) => {

    db.query(

        `SELECT
            id,
            latitude,
            longitude,
            google_maps_link,
            triggered_at
        FROM sos_history
        WHERE user_id = ?
        ORDER BY triggered_at DESC`,

        [req.user.id],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.status(200).json({

                success: true,

                history: result

            });

        }

    );

};
module.exports = {
    addContact,
    getContacts,
    updateContact,
    deleteContact,
    triggerSOS,
    saveLiveLocation,
    getSOSHistory
}