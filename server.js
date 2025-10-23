require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static frontend files (from /public or /src)
app.use(express.static(path.join(__dirname, 'src')));

// Import API handlers
const translateHandler = require('./api/translate.js');
const healthHandler = require('./api/health.js');

// API routes
app.post('/api/translate', translateHandler);
app.get('/api/health', healthHandler);

// ✅ Fallback to index.html for SPA routes
app.get('*', (req, res, next) => {
  if (req.path.includes('.')) return res.status(404).end();
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
