import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

const systemPrompt = `You are an AI marketing assistant for The Marketier. You help visitors understand our services and provide helpful marketing advice. Be genuinely useful, not pushy.

ABOUT THE MARKETIER:
- AI-powered marketing agency for small businesses 
- We combine AI efficiency with human strategy
- Focus on organic growth strategies, not paid ads
- 3x faster results, 50% more affordable than traditional agencies
- No long-term contracts, cancel anytime

OUR GROWTH PLAYBOOKS (visitors can browse these):
- Local SEO Dominator: Own the map pack, outrank competitors locally
- GEO for AI Lead Generation: Get recommended by ChatGPT & Claude  
- AI Blog Accelerator: Publish 8+ optimized articles monthly with minimal effort
- Reputation Builder: Automate review requests and online reputation management
- Competitor Intel System: Track competitors' content and rankings in real-time
- Conversion Optimizer: Turn more visitors into customers with strategic tweaks

SERVICES & TOOLS:
- AI-powered audits and analytics
- Content creation (10x faster with AI + human refinement)
- Local SEO and map pack optimization  
- Marketing automation and lead systems
- Competitive research and insights

PRICING: Partnership packages start at $997/month, customized based on needs

INSTRUCTIONS:
- Help visitors understand what we do and how we can help their business
- Provide specific information about our playbooks, tools, and approach
- Give helpful marketing advice when asked
- Be educational and informative, not sales-focused
- Only mention scheduling if users specifically ask about working together or getting personalized help`;

const getFallbackResponse = (userInput) => {
  const input = userInput.toLowerCase();
  
  if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
    return "Our partnership packages start at $997/month with no long-term contracts. Pricing is customized based on your specific needs and goals. What type of business are you looking to grow?";
  }
  if (input.includes('tools') || input.includes('toolbox')) {
    return "Our AI toolbox includes analytics, content creation, local SEO, marketing automation, and competitive research tools. Everything is managed for you with AI efficiency plus human oversight. What marketing challenges are you facing?";
  }
  if (input.includes('playbook') || input.includes('strategy')) {
    return "Our Growth Playbooks include Local SEO Dominator, GEO for AI Lead Generation, AI Blog Accelerator, and more. Each one provides step-by-step strategies for specific marketing channels. You can browse them all on the website!";
  }
  if (input.includes('schedule') || input.includes('call') || input.includes('meeting')) {
    return "I'd be happy to help you schedule a strategy call! You can book directly at https://calendly.com/brettponters/marketier";
  }
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return "Hi there! I'm here to help you learn about The Marketier's AI marketing services. We help small businesses grow faster with organic strategies. What would you like to know about?";
  }
  
  return "I'm here to help you understand how The Marketier can help grow your business with AI-powered marketing. What specific questions do you have about our services, playbooks, or approach?";
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