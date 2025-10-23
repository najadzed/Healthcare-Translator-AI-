require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
// Check if environment variable is loaded
if (!process.env.GOOGLE_API_KEY) {
    console.log('⚠️  GOOGLE_API_KEY not found in environment variables');
    console.log('📝 Please set GOOGLE_API_KEY in your .env file for translation to work');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Import API handlers (local versions)
const translateHandler = require('./api/translate.local.js');
const healthHandler = require('./api/health.local.js');

// API Routes
app.post('/api/translate', translateHandler);
app.get('/api/health', healthHandler);

// Serve static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Local server running at http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${__dirname}`);
  console.log(`🔧 API endpoints: /api/translate, /api/health`);
  console.log(`🔑 Make sure to set GOOGLE_API_KEY in your .env file`);
});
