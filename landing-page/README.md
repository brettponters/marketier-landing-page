# The Marketier - Landing Page

AI-powered marketing agency landing page built with React, Vite, and TailwindCSS.

## 🚀 Quick Start

### Frontend Setup
```bash
npm install
npm run dev
```
The frontend will run on `http://localhost:5177`

### Backend Setup
```bash
cd api
npm install
npm start
```
The API server will run on `http://localhost:3001`

## 🏗️ Architecture

**Frontend**: React 18 + Vite + TailwindCSS + Framer Motion
**Backend**: Express.js + OpenAI API + Security middleware
**Deployment**: Frontend (Vercel) + Backend (Railway/Heroku)

## 📁 Project Structure

```
/
├── src/                    # React frontend
│   ├── App.jsx            # Main application component
│   ├── components/        # Reusable components
│   │   └── AIChatbot.jsx # AI-powered chatbot
│   ├── ComingSoonPage.jsx # Coming soon page
│   └── PartnerPage.jsx    # Partner application form
├── api/                   # Express backend
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── public/                # Static assets
│   ├── sitemap.xml       # SEO sitemap
│   └── robots.txt        # SEO robots file
└── PROJECT_DOCUMENTATION.md # Detailed project specs
```

## ⚙️ Environment Variables

### Backend (.env in /api folder)
```
OPENAI_API_KEY=your_openai_api_key
CORS_ORIGIN=http://localhost:5177
PORT=3001
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔧 Development Commands

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd api
npm start           # Start API server
npm run dev         # Start with nodemon (if configured)
```

## 🌟 Features

- **AI Chatbot**: OpenAI-powered assistant with booking flow
- **Partner Applications**: Multi-step form with Calendly integration
- **Growth Playbooks**: SEO-optimized service pages
- **Coming Soon**: Placeholder for future community features
- **Security**: Rate limiting, input validation, CORS protection

## 🚀 Deployment

### Frontend (Vercel)
1. Connect repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

### Backend (Railway/Heroku)
1. Set environment variables in platform dashboard
2. Deploy API server with start command: `npm start`
3. Update CORS_ORIGIN to production frontend URL

## 📞 Contact

Schedule a strategy call: https://calendly.com/brettponters/marketier