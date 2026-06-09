
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// Load .env
dotenv.config();

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_NAME =", process.env.DB_NAME);

const db = require("./config/db");

const app = express();

app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
    res.send("🚀 MediBridge Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

