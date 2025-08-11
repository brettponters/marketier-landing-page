import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Initialize OpenAI
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

// System prompt for The Marketier
const systemPrompt = `You are an AI marketing assistant for The Marketier, an AI-powered marketing agency for small businesses. You are helpful, friendly, and knowledgeable about our services. Here's what you need to know:

COMPANY OVERVIEW:
- We combine AI efficiency with human strategy for small business marketing
- Focus on organic growth, not paid ads
- Results: 3x faster and 50% more affordable than traditional agencies
- No long-term contracts, cancel anytime with 30 days notice

PRICING:
- Partnership packages start at $997/month
- Customized pricing based on needs and budget
- No long-term contracts required
- Can cancel anytime with 30 days notice

SERVICES & TOOLBOX:
- AI-powered analytics and insights
- Content creation and optimization
- Social media automation
- Email marketing systems
- SEO optimization tools
- Customer insight platforms
- All tools integrated and managed for clients

GROWTH PLAYBOOKS:
- Industry-specific proven strategies
- Available for: retail, professional services, healthcare, SaaS, e-commerce, restaurants, fitness, real estate, and more
- Include step-by-step implementation guides
- Templates and AI-optimized tactics included

RESULTS TIMELINE:
- Initial improvements: 2-4 weeks
- Significant growth: 60-90 days
- Custom timeline based on client goals
- AI-powered approach enables faster implementation

TARGET CLIENTS:
- Small businesses across all industries
- Works with existing teams (doesn't replace them)
- Can serve as complete marketing department or complement in-house teams

SCHEDULING:
- When users want to schedule, book, or have a call, direct them to schedule a strategy call
- Calendly link: https://calendly.com/brettponters/marketier

INSTRUCTIONS:
- Keep responses conversational, helpful, and under 3 sentences when possible
- Answer questions directly first, then offer scheduling if appropriate
- Be enthusiastic about helping small businesses grow
- If asked about competitors, focus on our unique AI + human approach
- Only suggest scheduling calls when users ask about scheduling, booking, or want personalized consultation
- For general questions about services, pricing, tools, or playbooks, provide helpful answers without pushing scheduling`;

// Input validation middleware
const validateChatInput = [
  body('message')
    .isString()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  body('conversationHistory')
    .optional()
    .isArray({ max: 20 })
    .withMessage('Conversation history must be an array with max 20 messages'),
  body('conversationHistory.*.content')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Each message must be under 1000 characters'),
  body('conversationHistory.*.role')
    .optional()
    .isIn(['user', 'assistant'])
    .withMessage('Message role must be user or assistant')
];

// Input sanitization
const sanitizeInput = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
    .substring(0, 1000); // Limit length
};

// Chat endpoint
app.post('/api/chat', validateChatInput, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Invalid input',
        details: errors.array()
      });
    }

    const { message, conversationHistory = [] } = req.body;

    // Sanitize inputs
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedHistory = conversationHistory
      .slice(-6) // Only keep last 6 messages
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: sanitizeInput(msg.content)
      }));

    if (!sanitizedMessage) {
      return res.status(400).json({
        error: 'Message cannot be empty'
      });
    }

    // Check if OpenAI is available
    if (!openai) {
      return res.json({
        response: getFallbackResponse(sanitizedMessage),
        source: 'fallback'
      });
    }

    // Build messages array for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...sanitizedHistory,
      { role: 'user', content: sanitizedMessage }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 200,
      temperature: 0.7
    });

    const aiResponse = completion.choices[0]?.message?.content?.trim();

    if (!aiResponse) {
      return res.json({
        response: getFallbackResponse(sanitizedMessage),
        source: 'fallback'
      });
    }

    res.json({
      response: aiResponse,
      source: 'ai'
    });

  } catch (error) {
    console.error('Chat API error:', error.message);
    
    // Don't expose internal error details
    if (error.code === 'insufficient_quota') {
      return res.status(503).json({
        error: 'Service temporarily unavailable',
        response: getFallbackResponse(req.body.message || ''),
        source: 'fallback'
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      response: getFallbackResponse(req.body.message || ''),
      source: 'fallback'
    });
  }
});

// Fallback responses when AI is unavailable
const getFallbackResponse = (userInput) => {
  const input = userInput.toLowerCase();
  
  if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
    return "Our partnership packages start at $997/month with no long-term contracts. We offer customized pricing based on your needs. Would you like to schedule a call to discuss pricing for your business?";
  }
  if (input.includes('tools') || input.includes('toolbox')) {
    return "Our AI toolbox includes analytics, content creation, social media automation, email marketing, and SEO tools - all managed for you! Want to see how these tools can transform your marketing?";
  }
  if (input.includes('playbook') || input.includes('strategy')) {
    return "Our Growth Playbooks are proven strategies tailored to your industry. We have playbooks for retail, healthcare, SaaS, e-commerce, and more. Which industry interests you most?";
  }
  if (input.includes('schedule') || input.includes('call') || input.includes('meeting')) {
    return "I'd be happy to help you schedule a strategy call! You can book directly at https://calendly.com/brettponters/marketier";
  }
  
  return "That's a great question! I'd love to give you a detailed answer on our strategy call. Would you like me to help you schedule one?";
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    openai: !!openai
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error.message);
  res.status(500).json({
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Secure API server running on port ${PORT}`);
  console.log(`🔐 OpenAI integration: ${openai ? 'enabled' : 'disabled (using fallbacks)'}`);
  console.log(`🌐 CORS origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
});