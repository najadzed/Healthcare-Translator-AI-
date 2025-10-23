# Deployment Guide - Healthcare Translation App

## 🚀 Quick Deployment to Vercel

### Method 1: GitHub + Vercel (Recommended)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Healthcare Translation App"
   git branch -M main
   git remote add origin https://github.com/yourusername/healthcare-translator.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variable: `GOOGLE_API_KEY=your_api_key_here`
   - Click "Deploy"

3. **Get Live URL**
   - Vercel will provide a live URL (e.g., `https://your-app.vercel.app`)
   - Share this URL for the assignment submission

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add GOOGLE_API_KEY
   # Enter your Google API key when prompted
   ```

## 🔑 Environment Variables

### Required Variables
- `GOOGLE_API_KEY`: Your Google API key for translation services

### Setting in Vercel
1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add `GOOGLE_API_KEY` with your API key value
4. Redeploy the project

## 📁 Project Structure

```
healthcare-translator/
├── index.html              # Main application page
├── src/
│   ├── app.js              # Frontend JavaScript
│   ├── styles.css          # Application styles
│   └── languages.js        # Language definitions
├── api/
│   ├── translate.js        # Translation API (Vercel)
│   ├── translate.local.js  # Translation API (Local)
│   ├── health.js           # Health check API (Vercel)
│   └── health.local.js     # Health check API (Local)
├── server.js               # Local development server
├── package.json            # Dependencies and scripts
├── vercel.json             # Vercel configuration
├── README.md               # Project documentation
├── USER_GUIDE.md           # User instructions
└── DEPLOYMENT.md           # This file
```

## 🔧 Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    { "src": "api/translate.js", "use": "@vercel/node" },
    { "src": "api/health.js", "use": "@vercel/node" },
    { "src": "index.html", "use": "@vercel/static" },
    { "src": "src/(.*)", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/src/(.*)", "dest": "/src/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### package.json
```json
{
  "name": "healthcare-translator",
  "version": "1.0.0",
  "scripts": {
    "dev": "vercel dev",
    "start": "node server.js",
    "deploy": "vercel --prod"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.6.1"
  }
}
```

## 🌐 Domain Configuration

### Custom Domain (Optional)
1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatically provisioned

### Subdomain
- Default: `your-app.vercel.app`
- Custom: `healthcare-translator.yourdomain.com`

## 🔍 Testing Deployment

### Health Check
```bash
curl https://your-app.vercel.app/api/health
# Should return: {"ok":true,"provider":"google"}
```

### Translation Test
```bash
curl -X POST https://your-app.vercel.app/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello","sourceLang":"en","targetLang":"es","refine":false}'
# Should return: {"translated":"hola"}
```

## 📊 Performance Optimization

### Vercel Optimizations
- **Automatic HTTPS**: SSL certificates provided
- **Global CDN**: Fast loading worldwide
- **Serverless Functions**: Scalable API endpoints
- **Static Assets**: Optimized delivery

### Browser Optimizations
- **Web Speech API**: Native browser capabilities
- **Responsive Design**: Mobile-first approach
- **Minimal Dependencies**: Fast loading times

## 🔒 Security Considerations

### Production Security
- **Environment Variables**: API keys secured in Vercel
- **HTTPS Only**: All traffic encrypted
- **CORS Configuration**: Proper cross-origin setup
- **Input Validation**: API endpoint protection

### Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Automatic error reporting
- **Usage Metrics**: API call monitoring

## 🚨 Troubleshooting

### Common Issues

**Deployment Fails**
- Check `vercel.json` syntax
- Verify all files are committed
- Ensure environment variables are set

**API Not Working**
- Verify `GOOGLE_API_KEY` is set
- Check API endpoint URLs
- Test with curl commands

**Static Files Not Loading**
- Check `vercel.json` routes
- Verify file paths in HTML
- Ensure all assets are committed

### Debug Commands
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Test locally
vercel dev
```

## 📈 Scaling Considerations

### For Production Use
- **Rate Limiting**: Implement API rate limits
- **Caching**: Add translation result caching
- **Monitoring**: Set up error tracking
- **Backup**: Implement data backup strategies

### Performance Monitoring
- **Response Times**: Monitor API latency
- **Error Rates**: Track failure percentages
- **Usage Patterns**: Analyze user behavior
- **Cost Optimization**: Monitor API usage costs

---

**Ready for Submission**: Once deployed, your app will be available at the Vercel URL for the Nao Medical assignment submission.
