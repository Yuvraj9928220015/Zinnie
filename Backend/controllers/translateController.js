const axios = require("axios");

// Country code to language code mapping
const countryToLanguage = {
    IN: "hi", // India → Hindi
    US: "en", // USA → English
    GB: "en", // UK → English
    AU: "en", // Australia → English
    CA: "en", // Canada → English
    DE: "de", // Germany → German
    FR: "fr", // France → French
    ES: "es", // Spain → Spanish
    AR: "es", // Argentina → Spanish
    BR: "pt", // Brazil → Portuguese
    PT: "pt", // Portugal → Portuguese
    RU: "ru", // Russia → Russian
    CN: "zh", // China → Chinese
    JP: "ja", // Japan → Japanese
    KR: "ko", // Korea → Korean
    SA: "ar", // Saudi Arabia → Arabic
    AE: "ar", // UAE → Arabic
    PK: "ur", // Pakistan → Urdu
    BD: "bn", // Bangladesh → Bengali
    IT: "it", // Italy → Italian
    NL: "nl", // Netherlands → Dutch
    TR: "tr", // Turkey → Turkish
    ID: "id", // Indonesia → Indonesian
    TH: "th", // Thailand → Thai
    VN: "vi", // Vietnam → Vietnamese
    PL: "pl", // Poland → Polish
    SE: "sv", // Sweden → Swedish
    NO: "no", // Norway → Norwegian
    DK: "da", // Denmark → Danish
    FI: "fi", // Finland → Finnish
    GR: "el", // Greece → Greek
    CZ: "cs", // Czech Republic → Czech
    HU: "hu", // Hungary → Hungarian
    RO: "ro", // Romania → Romanian
    UA: "uk", // Ukraine → Ukrainian
    IL: "he", // Israel → Hebrew
    IR: "fa", // Iran → Persian
    AF: "ps", // Afghanistan → Pashto
    NP: "ne", // Nepal → Nepali
    LK: "si", // Sri Lanka → Sinhala
    MM: "my", // Myanmar → Burmese
    KH: "km", // Cambodia → Khmer
    ET: "am", // Ethiopia → Amharic
    NG: "yo", // Nigeria → Yoruba
    ZA: "zu", // South Africa → Zulu
    EG: "ar", // Egypt → Arabic
    MA: "ar", // Morocco → Arabic
    MX: "es", // Mexico → Spanish
    CO: "es", // Colombia → Spanish
    PE: "es", // Peru → Spanish
    VE: "es", // Venezuela → Spanish
    CL: "es", // Chile → Spanish
};

// Language code to language name mapping
const languageNames = {
    hi: "Hindi",
    en: "English",
    de: "German",
    fr: "French",
    es: "Spanish",
    pt: "Portuguese",
    ru: "Russian",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    ar: "Arabic",
    ur: "Urdu",
    bn: "Bengali",
    it: "Italian",
    nl: "Dutch",
    tr: "Turkish",
    id: "Indonesian",
    th: "Thai",
    vi: "Vietnamese",
    pl: "Polish",
    sv: "Swedish",
    no: "Norwegian",
    da: "Danish",
    fi: "Finnish",
    el: "Greek",
    cs: "Czech",
    hu: "Hungarian",
    ro: "Romanian",
    uk: "Ukrainian",
    he: "Hebrew",
    fa: "Persian",
    ps: "Pashto",
    ne: "Nepali",
    si: "Sinhala",
    my: "Burmese",
    km: "Khmer",
    am: "Amharic",
    yo: "Yoruba",
    zu: "Zulu",
};

// Get country from IP using free ipapi.co service
const getCountryFromIP = async (ip) => {
    try {
        if (
            ip === "127.0.0.1" ||
            ip === "::1" ||
            ip.startsWith("192.168") ||
            ip.startsWith("10.")
        ) {
            return "US";
        }

        const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
            timeout: 5000,
        });

        if (response.data && response.data.country_code) {
            return response.data.country_code;
        }

        return "US";
    } catch (error) {
        console.error("IP lookup error:", error.message);
        return "US";
    }
};

// Detect language based on IP
const detectLanguage = async (req, res) => {
    try {
        // Get real IP (works behind proxies/load balancers)
        const ip =
            req.headers["cf-connecting-ip"] ||
            req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.headers["x-real-ip"] ||
            req.ip ||
            req.socket.remoteAddress;

        const countryCode = await getCountryFromIP(ip.trim());
        const languageCode = countryToLanguage[countryCode] || "fr";
        const languageName = languageNames[languageCode] || "English";

        res.json({
            success: true,
            ip: ip.trim(),
            countryCode,
            languageCode,
            languageName,
        });
    } catch (error) {
        console.error("Detect language error:", error);
        res.status(500).json({
            success: false,
            message: "Language detection failed",
            languageCode: "en",
            languageName: "English",
        });
    }
};

// Translate text using Google Translate API
// translateText function ko replace karo — no API key needed!
const translateText = async (req, res) => {
    try {
        const { texts, targetLanguage, sourceLanguage = "en" } = req.body;

        if (!texts || !Array.isArray(texts) || texts.length === 0) {
            return res.status(400).json({ success: false, message: "texts array is required" });
        }

        if (targetLanguage === "en" || targetLanguage === sourceLanguage) {
            return res.json({ success: true, translations: texts, targetLanguage });
        }

        // Ek ek text translate karo MyMemory se
        const translations = await Promise.all(
            texts.map(async (text) => {
                try {
                    const res = await axios.get("https://api.mymemory.translated.net/get", {
                        params: {
                            q: text,
                            langpair: `${sourceLanguage}|${targetLanguage}`,
                        },
                        timeout: 8000,
                    });
                    return res.data?.responseData?.translatedText || text;
                } catch {
                    return text; // fail hone par original return karo
                }
            })
        );

        res.json({ success: true, translations, targetLanguage });

    } catch (error) {
        res.status(500).json({ success: false, message: "Translation failed" });
    }
};
// Get all supported languages list
const getSupportedLanguages = async (req, res) => {
    try {
        const languages = Object.entries(languageNames).map(([code, name]) => ({
            code,
            name,
        }));

        res.json({
            success: true,
            languages,
            total: languages.length,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to get languages" });
    }
};

module.exports = {
    detectLanguage,
    translateText,
    getSupportedLanguages,
};