# Healthcare Translation Web App (Prototype)

A mobile-first prototype enabling live speech transcription, real-time translation with AI medical refinement, and text-to-speech playback.

## Features
- Live transcription using Web Speech API (browser STT)
- Real-time translation via OpenAI with medical-term refinement (toggle)
- Dual transcript display: original and translated
- TTS playback of translated text, voice auto-matched to target language
- Mobile-first responsive UI

## Tech
- Frontend: Vanilla JS, Web Speech API, Web Speech Synthesis
- API: Serverless functions on Vercel
- AI: Google Gemini API for translation/refinement

## Local Setup

### Option 1: Local Express Server (Recommended for testing)
1. Get a Google API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```bash
   cp env.example .env
   # Edit .env and add your Google API key
   ```
4. Start local server:
   ```bash
   npm start
   # or
   npm run local
   ```
5. Open `http://localhost:3000`

### Option 2: Vercel CLI
1. Get a Google API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Create `.env` file with your API key
4. Start Vercel dev server:
   ```bash
   vercel dev
   ```
5. Open `http://localhost:3000`

Notes:
- Chrome recommended for Web Speech API.
- Microphone permission required.

## Security Considerations
- No PHI is stored; requests are transient and sent only to Google Gemini API for translation.
- Use HTTPS (Vercel provides TLS).
- Restrict API key to serverless only; never expose on client.
- Consider adding rate limiting and audit logging for production.

## User Guide
- Select input and output languages.
- Click Start to begin listening; Stop to end.
- Toggle "AI refine medical terms" for improved terminology.
- Click the speaker button to hear the translation.

## Recording
Please record your screen while developing and demoing. Include:
- Brief explanation of architecture and choices
- Demonstration of transcription, translation, and playback

## Deploy

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Option 2: GitHub + Vercel
1. Push code to GitHub repository
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Set environment variable `GOOGLE_API_KEY` in project settings
4. Deploy automatically on push

### Environment Variables
- `GOOGLE_API_KEY`: Your Google API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## License
For assessment use only.
