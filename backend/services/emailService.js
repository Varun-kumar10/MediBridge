const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

// ======================================
// SEND NORMAL EMAIL
// ======================================

const sendEmail = async (to, subject, text) => {

    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to,
            subject,
            text

        });

        console.log("✅ Email Sent Successfully");

    }

    catch (error) {

        console.log("❌ Email Error:", error.message);

    }

};

// ======================================
// SEND OTP EMAIL
// ======================================

const sendOTPEmail = async (email, otp) => {

    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "MediBridge Email Verification OTP",

            html: `

                <h2>MediBridge Email Verification</h2>

                <p>Hello,</p>

                <p>Your OTP for MediBridge registration is:</p>

                <h1 style="color:blue;">${otp}</h1>

                <p>This OTP is valid for <b>5 minutes</b>.</p>

                <p>Please do not share this OTP with anyone.</p>

                <br>

                <p>Regards,</p>

                <h3>MediBridge Team</h3>

            `

        });

        console.log("✅ OTP Email Sent");

    }

    catch (error) {

        console.log("❌ OTP Email Error:", error.message);

    }

};

module.exports = {

    sendEmail,

    sendOTPEmail

};