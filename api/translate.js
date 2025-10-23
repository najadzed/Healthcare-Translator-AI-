// api/translate.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, sourceLang, targetLang, refine } = req.body || {};

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ error: "Missing GOOGLE_API_KEY" });
    }

    if (!text || !targetLang) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const prompt = `
Translate this healthcare-related text from ${sourceLang || "auto"} to ${targetLang}.
Make it patient-friendly and medically accurate.
${refine ? "Also correct misheard speech or abbreviations." : ""}
Text:
"""${text}"""
Return only the translated text.
`;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const translated = result?.response?.text?.() || "";

    return res.status(200).json({ translated });
  } catch (error) {
    console.error("Gemini translation error:", error);
    return res.status(500).json({ error: "Translation failed" });
  }
}
