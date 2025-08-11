# The Marketier API

Secure Express.js backend for The Marketier landing page AI chatbot.

## 🚀 Setup

```bash
npm install
npm start
```

## 🔐 Environment Variables

Create `.env` file:
```
OPENAI_API_KEY=your_openai_api_key
CORS_ORIGIN=http://localhost:5177
PORT=3001
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📡 API Endpoints

### POST /api/chat
Chat with AI assistant
- **Body**: `{ "message": "string", "conversationHistory": [] }`
- **Response**: `{ "response": "string", "source": "ai|fallback" }`

### GET /api/health
Health check endpoint
- **Response**: `{ "status": "healthy", "timestamp": "ISO string", "openai": boolean }`

## 🛡️ Security Features

- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Helmet security headers
- Request body size limits
- OpenAI API key protection

## 🚀 Deployment

### Railway
```bash
# Add environment variables in Railway dashboard
# Deploy with start command: npm start
```

### Heroku
```bash
# Set environment variables
heroku config:set OPENAI_API_KEY=your_key
heroku config:set CORS_ORIGIN=your_frontend_url
```