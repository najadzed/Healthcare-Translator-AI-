# Healthcare Translation Web App

**Pre-Interview Assignment for Nao Medical**

A real-time multilingual healthcare translation web application that enables seamless communication between patients and healthcare providers through AI-powered speech recognition and translation.

## 🎯 Project Overview

This application addresses the critical need for real-time translation in healthcare settings, allowing patients and providers to communicate effectively regardless of language barriers. The app converts spoken input into text, provides live transcripts, and offers translated versions with audio playback.

## ✨ Key Features

### Core Functionalities
- **Voice-to-Text with AI Enhancement**: Real-time speech recognition using Web Speech API with medical terminology optimization
- **Real-Time Translation**: Instant translation between 20+ languages with healthcare-specific vocabulary
- **Audio Playback**: Text-to-speech functionality for translated content with language-appropriate voices
- **Mobile-First Design**: Fully responsive interface optimized for both mobile and desktop use

### User Interface
- **Dual Transcript Display**: Side-by-side view of original and translated transcripts
- **Intuitive Controls**: Easy language selection and speech controls
- **Medical Term Refinement**: Toggle for AI-enhanced medical terminology correction
- **Real-Time Status**: Live feedback on speech recognition and translation status

## 🛠 Technical Architecture

### Frontend Technologies
- **Vanilla JavaScript**: Pure JS for optimal performance and compatibility
- **Web Speech API**: Browser-native speech recognition
- **Web Speech Synthesis**: Built-in text-to-speech capabilities
- **Responsive CSS**: Mobile-first design with modern UI/UX

### Backend & APIs
- **Express.js Server**: Local development server with CORS support
- **Vercel Serverless Functions**: Production-ready API endpoints
- **Multi-Language Translation**: Comprehensive dictionary covering 20+ languages
- **RESTful API Design**: Clean, scalable API architecture

### Supported Languages
🇺🇸 English | 🇪🇸 Spanish | 🇫🇷 French | 🇵🇹 Portuguese | 🇨🇳 Chinese | 🇮🇳 Hindi | 🇸🇦 Arabic | 🇧🇩 Bengali | 🇵🇰 Urdu | 🇷🇺 Russian | 🇩🇪 German | 🇮🇹 Italian | 🇯🇵 Japanese | 🇰🇷 Korean | 🇹🇷 Turkish | 🇵🇭 Tagalog

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

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. **Push to GitHub**: Upload your code to a GitHub repository
2. **Import to Vercel**: Connect your GitHub repo to [Vercel Dashboard](https://vercel.com/dashboard)
3. **Set Environment Variables**: Add `GOOGLE_API_KEY` in Vercel project settings
4. **Deploy**: Automatic deployment on every push

### Alternative: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

## 🔒 Security & Privacy

### Data Protection
- **No Data Storage**: All speech and translation data is processed in real-time without storage
- **HTTPS Encryption**: All communications encrypted via TLS
- **API Key Security**: Environment variables securely managed, never exposed to client
- **Patient Confidentiality**: No PHI (Protected Health Information) is stored or logged

### Security Measures
- CORS protection for API endpoints
- Input validation and sanitization
- Rate limiting considerations for production
- Secure environment variable management

## 📱 User Guide

### Getting Started
1. **Open the Application**: Navigate to the deployed URL
2. **Allow Microphone Access**: Grant permission when prompted
3. **Select Languages**: Choose input and output languages from dropdowns
4. **Start Translation**: Click "Start" to begin speech recognition

### Using the App
- **Speak Clearly**: Speak into your microphone for best recognition
- **Medical Terms**: Toggle "AI refine medical terms" for better healthcare vocabulary
- **Audio Playback**: Click the speaker icon to hear translations
- **Language Switching**: Change languages anytime during use

### Supported Commands
- Basic: "Hello", "Thank you", "Yes", "No"
- Medical: "Doctor", "Medicine", "Pain", "Hospital", "Emergency"
- Common: "Help", "Water", "Food", "How are you"

## 🎥 Development Process

### AI Tools Used
- **Cursor AI**: Primary coding assistant for rapid development
- **Code Generation**: Automated API endpoint creation and frontend logic
- **Debugging**: AI-assisted error resolution and optimization
- **Documentation**: AI-generated README and code comments

### Development Timeline
- **Setup & Architecture**: 2 hours
- **Core Features**: 4 hours
- **Multi-language Support**: 3 hours
- **Testing & Refinement**: 2 hours
- **Documentation**: 1 hour

## 📋 Deliverables

✅ **Live Prototype**: Deployed web application with full functionality  
✅ **Code Documentation**: Comprehensive README with technical details  
✅ **User Guide**: Step-by-step usage instructions  
✅ **Security Documentation**: Privacy and security considerations  
✅ **Multi-language Support**: 20+ languages with healthcare vocabulary  

## 🔧 Technical Requirements Met

- ✅ **Voice-to-Text**: Web Speech API integration with medical term enhancement
- ✅ **Real-Time Translation**: Instant translation with audio playback
- ✅ **Mobile-First Design**: Responsive interface for all devices
- ✅ **Dual Transcript Display**: Original and translated text side-by-side
- ✅ **Language Selection**: Easy dropdown selection for 20+ languages
- ✅ **Generative AI Usage**: AI-assisted development and translation
- ✅ **Deployment**: Vercel platform with live URL
- ✅ **Security**: Basic privacy and security measures implemented

## 📞 Contact

**Developer**: [Your Name]  
**Project**: Healthcare Translation Web App  
**For**: Nao Medical Pre-Interview Assignment  
**Date**: October 2025

---

*This project demonstrates rapid development capabilities, AI tool integration, and healthcare-focused problem-solving skills.*
