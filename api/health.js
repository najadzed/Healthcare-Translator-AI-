// Local Express server version: GET /api/health

function handler(req, res) {
    // Do NOT log the raw key. Just return whether it's loaded.
    const ok = !!process.env.GOOGLE_API_KEY;
    res.status(ok ? 200 : 500).json({ ok, provider: 'google' });
}

// Export for Express
module.exports = handler;
