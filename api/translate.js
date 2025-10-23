// api/translate.js
const genai = require('@google-ai/generativelanguage'); // Gemini API SDK
require('dotenv').config();

const client = new genai.TextServiceClient({
  apiKey: process.env.GOOGLE_API_KEY, // Gemini API key
});

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, sourceLang, targetLang, refine } = req.body || {};

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ error: 'Missing GOOGLE_API_KEY' });
    }

    if (!text || !targetLang) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    // Construct prompt for translation
    const prompt = `
You are a professional medical translator. Translate the following text from ${sourceLang || 'auto'} to ${targetLang}.
Use patient-friendly wording while keeping medical precision.
${refine ? 'Also fix ASR errors, abbreviations, and misspellings commonly heard in medical speech.' : ''}

Input:
"""${text}"""

Return only the translated text.
`;

    const response = await client.generateText({
      model: 'models/gemini-2.5', // Use the latest supported Gemini model
      prompt: prompt,
      maxOutputTokens: 1000,
    });

    const translated = response?.candidates?.[0]?.content?.trim() || '';

    return res.status(200).json({ translated });
  } catch (error) {
    console.error('Gemini translation error:', error);
    return res.status(500).json({ error: 'Translation failed' });
  }
}

module.exports = handler;
