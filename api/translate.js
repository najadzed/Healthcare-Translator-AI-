// ...existing code...
export default async function handler(req, res) {
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

        const prompt = `You are a professional medical translator. Translate the following text from ${sourceLang || 'auto'} to ${targetLang}. Prefer patient‑friendly wording while keeping medical precision. ${refine ? 'Also fix obvious ASR errors, abbreviations, and misspellings commonly heard in medical speech.' : ''}

Input:
"""${text}"""

Return only the translated text.`;

        // model: adjust if you have a different Gemini model id
        const model = 'text-bison-001';
        const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generate?key=${process.env.GOOGLE_API_KEY}`;

        const body = {
            prompt: { text: prompt },
            temperature: 0.15,
            maxOutputTokens: 1024
        };

        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!resp.ok) {
            const errText = await resp.text().catch(() => '');
            console.error('Generative API error', resp.status, errText);
            return res.status(502).json({ error: 'Upstream generative API error', details: errText });
        }

        const data = await resp.json();

        // Try common response shapes from Generative Language API
        let translated = '';
        const candidate = data?.candidates?.[0];
        if (candidate) {
            translated = candidate.output || candidate.content || candidate.text || '';
            // if content is an array of parts, join textual parts
            if (!translated && Array.isArray(candidate.content)) {
                for (const part of candidate.content) {
                    if (typeof part === 'string') translated += part;
                    else if (part?.text) translated += part.text;
                }
            }
        }
        // fallback simple fields
        if (!translated && typeof data?.output === 'string') translated = data.output;
        if (!translated && Array.isArray(data?.output)) translated = data.output.map(p => (p?.content || p?.text || '')).join(' ');

        translated = (translated || '').toString().trim();

        return res.status(200).json({ translated });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Server error' });
    }
}
// ...existing code...