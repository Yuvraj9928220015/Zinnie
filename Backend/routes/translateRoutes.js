const express = require("express");
const router = express.Router();
const {
  detectLanguage,
  translateText,
  getSupportedLanguages,
} = require("../controllers/translateController");

// GET /api/translate/detect-language
// Detects language based on user's IP address
router.get("/detect-language", detectLanguage);

// POST /api/translate/translate
// Translates array of texts to target language
// Body: { texts: [...], targetLanguage: "hi", sourceLanguage: "en" }
router.post("/translate", translateText);

// GET /api/translate/languages
// Returns list of all supported languages
router.get("/languages", getSupportedLanguages);

module.exports = router;