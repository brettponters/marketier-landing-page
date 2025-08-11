import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

const systemPrompt = `You are an AI marketing assistant for The Marketier, an AI-powered marketing agency for small businesses. You are helpful, friendly, and knowledgeable about our services.

COMPANY OVERVIEW:
- We combine AI efficiency with human strategy for small business marketing
- Focus on organic growth, not paid ads
- Results: 3x faster and 50% more affordable than traditional agencies
- No long-term contracts, cancel anytime with 30 days notice

PRICING:
- Partnership packages start at $997/month
- Customized pricing based on needs and budget
- No long-term contracts required

SERVICES & TOOLBOX:
- AI-powered analytics and insights
- Content creation and optimization
- Social media automation
- Email marketing systems
- SEO optimization tools

GROWTH PLAYBOOKS:
- Industry-specific proven strategies
- Available for: retail, professional services, healthcare, SaaS, e-commerce, restaurants, fitness, real estate

SCHEDULING:
- When users want to schedule, book, or have a call, direct them to: https://calendly.com/brettponters/marketier

INSTRUCTIONS:
- Keep responses conversational, helpful, and under 3 sentences when possible
- Answer questions directly first, then offer scheduling if appropriate
- Only suggest scheduling calls when users ask about scheduling, booking, or want personalized consultation`;

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

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.length > 1000) {
      return res.status(400).json({ error: 'Invalid message' });
    }

    // Sanitize input
    const sanitizedMessage = message.trim().replace(/<[^>]*>/g, '').substring(0, 1000);

    if (!openai) {
      return res.json({
        response: getFallbackResponse(sanitizedMessage),
        source: 'fallback'
      });
    }

    // Build messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content?.substring(0, 1000) || ''
      })),
      { role: 'user', content: sanitizedMessage }
    ];

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
    console.error('API error:', error);
    res.json({
      response: getFallbackResponse(req.body.message || ''),
      source: 'fallback'
    });
  }
}