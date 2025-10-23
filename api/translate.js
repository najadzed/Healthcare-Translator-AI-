import { GoogleGenerativeAI } from "@google/generative-ai";

// POST /api/translate
// Expects: { text, sourceLang, targetLang, refine }
export default async function handler(req, res) {
  // 1. Method check
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, sourceLang, targetLang, refine } = req.body || {};

    // 2. Environment + parameter validation
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({
        error: "Missing GOOGLE_API_KEY. Please set this in Vercel project settings.",
      });
    }
    if (!text || !targetLang) {
      return res.status(400).json({
        error: "Missing required parameters: text and targetLang",
      });
    }

    // 3. Initialize Gemini API client
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 4. Build translation prompt
    const prompt = `
You are a professional medical translator.
Translate the following text from ${sourceLang || "auto-detected language"} to ${targetLang}.
Prefer patient-friendly wording while keeping medical precision.
${refine ? "Also fix obvious ASR errors, abbreviations, and misspellings." : ""}
Return only the translated text — no notes, explanations, or formatting.

Text:
"""${text}"""
`;

    // 5. Generate translation
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let translated = (await response.text()).trim();

    // 6. Clean potential extra quotes
    if (translated.startsWith('"') && translated.endsWith('"')) {
      translated = translated.slice(1, -1).trim();
    }

    // 7. Return translated text
    return res.status(200).json({ translated });
  } catch (error) {
    console.error("Translation error:", error);
    return res.status(500).json({
      error: "Server error during translation",
      details: error.message,
    });
  }
}
