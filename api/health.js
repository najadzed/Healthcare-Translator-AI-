export default function handler(req, res) {
  const hasKey = !!process.env.GOOGLE_API_KEY;
  res.status(200).json({
    status: hasKey ? "ok" : "missing",
    message: hasKey ? "API key configured" : "Missing GOOGLE_API_KEY"
  });
}
