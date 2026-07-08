require("dotenv").config();
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_NAME);
const mysql = require("mysql2");

// Create MySQL connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
    } else {
        console.log("✅ MySQL Connected Successfully");
        connection.release();
    }
});

module.exports = db;

