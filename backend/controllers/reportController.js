const db = require("../config/db");
const model = require("../config/gemini");

const { logActivity } = require("../services/activityLogger");

const fs = require("fs");

// PDF Parser Fix
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;

const Tesseract = require("tesseract.js");
const path = require("path");
// ==============================
// EXTRACT REPORT TEXT
// ==============================

const extractReportText = async (file) => {

    const filePath = file.path;

    const extension =
        path.extname(file.originalname).toLowerCase();

    let reportText = "";

    // PDF

    if (extension === ".pdf") {

        const buffer =
            fs.readFileSync(filePath);

        const pdfData =
            await pdfParse(buffer);

        reportText =
            pdfData.text;

    }

    // IMAGE

    else if (

        extension === ".jpg" ||
        extension === ".jpeg" ||
        extension === ".png"

    ) {

        const ocr =
            await Tesseract.recognize(
                filePath,
                "eng"
            );

        reportText =
            ocr.data.text;

    }

    if (!reportText || reportText.trim() === "") {

        reportText =
            "Unable to extract text.";

    }

    return reportText;

};

// ==============================
// UPLOAD MEDICAL REPORT
// ==============================

const uploadReport = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            report_title,
            report_type
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a report file"
            });
        }

        const file_path = req.file.path;

        const extension =
            path.extname(req.file.originalname).toLowerCase();

        let reportText = "";
       
        // ==========================
        // PDF TEXT EXTRACTION
        // ==========================

        if (extension === ".pdf") {

            const dataBuffer =
                fs.readFileSync(file_path);

            const pdfData =
                await pdfParse(dataBuffer);

            reportText =
                pdfData.text;
        }
   

        // ==========================
        // IMAGE OCR
        // ==========================

        else if (
            extension === ".jpg" ||
            extension === ".jpeg" ||
            extension === ".png"
        ) {

            const ocrResult =
                await Tesseract.recognize(
                    file_path,
                    "eng"
                );

            reportText =
                ocrResult.data.text;
        }

        // ==========================
        // FALLBACK
        // ==========================

        if (
            !reportText ||
            reportText.trim() === ""
        ) {

            reportText =
                "Unable to extract text from report.";
        }

        // ==========================
        // GEMINI AI PROMPT
        // ==========================

        const prompt = `
You are an expert AI Healthcare Assistant.

Analyze the medical report carefully and provide a detailed health analysis.

Return the response in this exact format:

📌 Patient Summary

📌 Disease Detected

📌 Risk Level
(Low / Medium / High)

📌 Confidence Percentage
(Estimate probability in %)

📌 Health Score
(Give score out of 100)

📌 Abnormal Values

📌 Possible Causes

📌 Symptoms Patient May Experience

📌 Future Health Risks

📌 Recommended Medicines
(General educational information only)

📌 Diet Recommendations

📌 Exercise Recommendations

📌 Lifestyle Changes

📌 Doctor Consultation Advice

📌 Emergency Warning Signs

Important:
- Explain in simple language.
- Mention if values are normal.
- Highlight any disease risk.
- Give practical recommendations.
- If all values are normal, clearly state that the patient appears healthy.

Medical Report:

${reportText}
`;

        // ==========================
        // GEMINI ANALYSIS
        // ==========================

        const result =
            await model.generateContent(prompt);

        const aiSummary =
            result.response.text();
// ==========================
// EXTRACT AI DATA
// ==========================

let diseaseName = "Unknown";
let riskLevel = "Unknown";
let healthScore = 0;

// ==========================
// Disease Name
// ==========================

const diseaseSection = aiSummary.match(
    /📌\s*Disease Detected([\s\S]*?)📌\s*Risk Level/i
);

if (diseaseSection) {

    diseaseName = diseaseSection[1]
        .replace(/\*/g, "")          // remove bullets
        .replace(/\r/g, "")
        .split("\n")                 // split into lines
        .find(line => line.trim() !== "") // first non-empty line
        ?.trim() || "Unknown";

    // Remove everything after first period or colon
    diseaseName = diseaseName
        .split(".")[0]
        .split(":")[0]
        .trim();
}

// ==========================
// Risk Level
// ==========================

const riskMatch = aiSummary.match(
    /📌\s*Risk Level([\s\S]*?)(Low|Medium|High)/i
);

if (riskMatch) {
    riskLevel = riskMatch[2].trim();
}

// ==========================
// Health Score
// ==========================

const scoreMatch = aiSummary.match(
    /📌\s*Health Score([\s\S]*?)(\d{1,3})\s*\/?\s*100/i
);

if (scoreMatch) {
    healthScore = parseInt(scoreMatch[2]);
}

console.log("Disease:", diseaseName);
console.log("Risk:", riskLevel);
console.log("Health Score:", healthScore);

        // ==========================
        // SAVE TO DATABASE
        // ==========================

        const sql = `
         INSERT INTO medical_reports
         (
            user_id,
            report_title,
            report_type,
            file_path,
            report_text,
            ai_summary,
            disease_name,
            risk_level,
            health_score
         )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         `;

        db.query(
            sql,
            [
               userId,
               report_title,
               report_type,
               file_path,
               reportText,
               aiSummary,
               diseaseName,
               riskLevel,
               healthScore
            ],
            (err) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }
               
                    // ==========================
        // SAVE ACTIVITY LOG
        // ==========================

        logActivity(
            userId,
            "Report Upload",
            `${report_title} uploaded successfully`
        );

                return res.status(201).json({

                    success: true,

                    message:
                        "Medical Report Uploaded Successfully",

                    extractedText:
                        reportText,

                    aiSummary

                });

            }
        );

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
 // ==============================
// COMPARE TWO MEDICAL REPORTS
// ==============================

const compareReports = async (req, res) => {

    try {

        const oldFile = req.files?.oldReport?.[0];
        const newFile = req.files?.newReport?.[0];

        if (!oldFile || !newFile) {

            return res.status(400).json({
                success: false,
                message: "Please upload both oldReport and newReport"
            });

        }

        const oldReportText = await extractReportText(oldFile);

        const newReportText = await extractReportText(newFile);

       // ==========================
// GEMINI COMPARISON PROMPT
// ==========================

const prompt = `
You are an expert AI Healthcare Assistant.

Compare these two medical reports.

Old Report:

${oldReportText}

----------------------------------------

New Report:

${newReportText}

----------------------------------------

Return your response exactly in this format.

📌 Overall Health Progress

📌 Health Score Comparison

📌 Blood Sugar Comparison

📌 Cholesterol Comparison

📌 Liver Function

📌 Kidney Function

📌 Improved Parameters

📌 Worsened Parameters

📌 Doctor Recommendations

📌 Diet Suggestions

📌 Exercise Suggestions

📌 Final Conclusion

Explain everything in simple language.
`;

const result = await model.generateContent(prompt);

const comparison = result.response.text();

return res.status(200).json({

    success: true,

    comparison

});

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==============================
// GET ALL REPORTS
// ==============================

const getReports = (req, res) => {

    db.query(
        "SELECT * FROM medical_reports WHERE user_id=? ORDER BY uploaded_at DESC",
        [req.user.id],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.json({
                success: true,
                reports: result
            });

        }
    );

};

// ==============================
// DELETE REPORT
// ==============================

const deleteReport = (req, res) => {

    db.query(
        "DELETE FROM medical_reports WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            return res.json({
                success: true,
                message: "Medical Report Deleted Successfully"
            });

        }
    );

};



module.exports = {
    uploadReport,
    compareReports,
    getReports,
    deleteReport
};