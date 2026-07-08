const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    addContact,
    getContacts,
    updateContact,
    deleteContact,
    triggerSOS,
    saveLiveLocation,
    getSOSHistory
} = require("../controllers/emergencyController");

// Add Contact
router.post("/", auth, addContact);

// Get All Contacts
router.get("/", auth, getContacts);

// Update Contact
router.put("/:id", auth, updateContact);

// Delete Contact
router.delete("/:id", auth, deleteContact);

// Trigger SOS
router.post("/sos", auth, triggerSOS);
//Live Location
router.post("/location", auth, saveLiveLocation);
router.get("/history", auth, getSOSHistory);
module.exports = router;