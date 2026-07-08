const express = require("express");

const router = express.Router();

const {
    chatWithAI,
    getChatHistory,
    deleteChat
} = require("../controllers/chatbotController");

// POST - Chat with AI
router.post("/", chatWithAI);

// GET - Chat History
router.get("/", getChatHistory);

// DELETE - Delete Chat by ID
router.delete("/:id", deleteChat);

module.exports = router;