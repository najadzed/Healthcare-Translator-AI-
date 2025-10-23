require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve all static files correctly
app.use(express.static(path.join(__dirname)));

// Import API handlers
const translateHandler = require('./api/translate.local.js');
const healthHandler = require('./api/health.local.js');

// API Routes
app.post('/api/translate', translateHandler);
app.get('/api/health', healthHandler);

// ✅ Only send index.html for non-file routes (SPAs)
app.get('*', (req, res, next) => {
  // Skip if request looks like a file (has a dot in it)
  if (req.path.includes('.')) {
    return res.status(404).end();
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
