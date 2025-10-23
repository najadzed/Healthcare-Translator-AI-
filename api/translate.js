// api/translate.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, targetLang, refine } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: 'Missing text or targetLang' });
  }

  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    console.error('Missing GOOGLE_API_KEY');
    return res.status(500).json({ error: 'Missing GOOGLE_API_KEY environment variable' });
  }

  try {
    const prompt = refine
      ? `Translate the following to ${targetLang}, with special attention to medical terminology and healthcare context. Only return the translation:\n\n${text}`
      : `Translate to ${targetLang}. Only return the translation:\n\n${text}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Google API error:', response.status, errText);
      return res.status(500).json({ error: 'Google API request failed', status: response.status, details: errText });
    }

    const data = await response.json();
    const translated = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return res.status(200).json({ translated: translated.trim() });

  } catch (error) {
    console.error('Translation error:', error);
    return res.status(500).json({ error: 'Translation failed', message: error.message });
  }
}

