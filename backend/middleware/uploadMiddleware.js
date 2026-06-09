const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        if (file.fieldname === "profile_image") {
            cb(null, "uploads/profile/");
        }

        else if (file.fieldname === "report") {
            cb(null, "uploads/reports/");
        }

        else if (file.fieldname === "prescription") {
            cb(null, "uploads/prescriptions/");
        }

        else {
            cb(null, "uploads/");
        }

    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// File Filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png|pdf/;

    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    }

    cb(new Error("Only JPG, JPEG, PNG and PDF files are allowed"));

};

// Multer Upload Object
const upload = multer({

    storage: storage,

    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    },

    fileFilter: fileFilter

});

module.exports = upload;

