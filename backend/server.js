const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const reportRoutes = require("./routes/reportRoutes");// Load .env
const waterRoutes = require("./routes/waterRoutes");
const sleepRoutes = require("./routes/sleepRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const symptomRoutes = require("./routes/symptomRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
dotenv.config();

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_NAME =", process.env.DB_NAME);
const reminderRoutes = require("./routes/reminderRoutes");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/predictions", predictionRoutes);
app.get("/", (req, res) => {
    res.send("🚀 MediBridge Backend Running Successfully");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

