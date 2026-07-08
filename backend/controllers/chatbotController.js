const db = require("../config/db");
const model = require("../config/gemini");

/* ==========================
   AI CHATBOT
========================== */

const chatWithAI = async (req, res) => {
  try {
    const userId = 1; // Temporary test user

    const { user_message } = req.body;

    if (!user_message) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message",
      });
    }

    console.log("User Message:", user_message);

    // Generate AI Response
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: user_message,
            },
          ],
        },
      ],
    });

    const ai_response = result.response.text();

    console.log("AI Response:", ai_response);

    db.query(
      "INSERT INTO chat_history (user_id, user_message, ai_response) VALUES (?, ?, ?)",
      [userId, user_message, ai_response],
      (err) => {
        if (err) {
          console.log("MySQL Error:", err);

          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        return res.status(200).json({
          success: true,
          user_message,
          ai_response,
        });
      }
    );
  } catch (error) {
    console.log("FULL ERROR:");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

/* ==========================
   GET CHAT HISTORY
========================== */

const getChatHistory = (req, res) => {
  db.query(
    "SELECT * FROM chat_history ORDER BY created_at DESC",
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        chats: result,
      });
    }
  );
};

/* ==========================
   DELETE CHAT
========================== */

const deleteChat = (req, res) => {
  db.query(
    "DELETE FROM chat_history WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Chat deleted successfully",
      });
    }
  );
};

module.exports = {
  chatWithAI,
  getChatHistory,
  deleteChat,
};

