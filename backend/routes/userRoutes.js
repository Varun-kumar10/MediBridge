```javascript
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    changePassword,
    uploadProfileImage
} = require("../controllers/userController");

const upload = require("../middleware/uploadMiddleware");

/* ==============================
   USER PROFILE ROUTES
============================== */

// Get Logged-in User Profile
router.get(
    "/profile",
    authMiddleware,
    getProfile
);

// Update User Profile
router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

// Change Password
router.put(
    "/change-password",
    authMiddleware,
    changePassword
);

// Upload Profile Image
router.post(
    "/upload-image",
    authMiddleware,
    upload.single("profile_image"),
    uploadProfileImage
);

module.exports = router;
```
