-- Create Database
CREATE DATABASE IF NOT EXISTS medibridge;

USE medibridge;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    phone VARCHAR(15),

    gender ENUM('Male','Female','Other'),

    date_of_birth DATE,

    blood_group VARCHAR(10),

    address TEXT,

    profile_image VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);
-- Admin Users Table

CREATE TABLE admin_users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role ENUM('Super Admin','Admin') DEFAULT 'Admin',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    doctor_name VARCHAR(100) NOT NULL,

    specialization VARCHAR(100),

    appointment_date DATE NOT NULL,

    appointment_time TIME NOT NULL,

    hospital_name VARCHAR(150),

    status ENUM('Pending','Confirmed','Completed','Cancelled')
    DEFAULT 'Pending',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE

);


CREATE TABLE medical_reports (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    report_title VARCHAR(150) NOT NULL,

    report_type VARCHAR(100),

    file_path VARCHAR(255) NOT NULL,

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE

);


CREATE TABLE chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_message TEXT,
    ai_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);



CREATE TABLE medicine_reminders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    medicine_name VARCHAR(100),
    dosage VARCHAR(50),
    reminder_time TIME,
    reminder_date DATE,
    status ENUM('Pending','Taken','Missed')
        DEFAULT 'Pending',

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);


CREATE TABLE health_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    bmi DECIMAL(5,2),
    blood_pressure VARCHAR(20),
    sugar_level VARCHAR(20),
    heart_rate INT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);


CREATE TABLE water_tracker (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    intake_ml INT,
    intake_date DATE,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);


CREATE TABLE sleep_tracker (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    sleep_hours DECIMAL(4,2),
    sleep_date DATE,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);



CREATE TABLE emergency_contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    contact_name VARCHAR(100),
    relationship VARCHAR(50),
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);


CREATE TABLE symptom_history (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    symptoms TEXT NOT NULL,

    predicted_disease VARCHAR(255),

    confidence DECIMAL(5,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);

