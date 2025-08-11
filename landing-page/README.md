# The Marketier - Landing Page

AI-powered marketing agency landing page built with React, Vite, and TailwindCSS.

## 🚀 Quick Start

### Frontend Setup
```bash
npm install
npm run dev
```
The frontend will run on `http://localhost:5177`

### No Backend Needed!
The AI chatbot uses Vercel's built-in API routes - no separate backend server required.

## 🏗️ Architecture

**Frontend**: React 18 + Vite + TailwindCSS + Framer Motion  
**API**: Vercel serverless functions + OpenAI integration  
**Deployment**: Single deployment to Vercel (frontend + API)

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

### Vercel Environment Variables
Add in your Vercel dashboard:
```
OPENAI_API_KEY=your_openai_api_key
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

### One-Click Vercel Deployment
1. Connect repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `OPENAI_API_KEY=your_key`
5. Deploy! ✨

**That's it!** Both frontend and API deploy together.

## 📞 Contact

Schedule a strategy call: https://calendly.com/brettponters/marketier