import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Calendar, Sparkles, User, Bot } from 'lucide-react';

const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your marketing assistant. I can help you learn about our services, pricing, and schedule a strategy call. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart response system - no AI needed
  const getResponse = (userMessage) => {
    const input = userMessage.toLowerCase();
    
    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return "Our partnership packages start at $997/month with no long-term contracts. We offer customized pricing based on your needs and budget. Would you like to schedule a call to discuss pricing for your specific business?";
    }
    
    if (input.includes('tools') || input.includes('toolbox')) {
      return "Our AI toolbox includes analytics, content creation, social media automation, email marketing, and SEO tools - all managed for you! These tools work together to accelerate your growth. Want to see how these can transform your marketing?";
    }
    
    if (input.includes('playbook') || input.includes('strategy')) {
      return "Our Growth Playbooks are proven strategies tailored to your industry. We have specialized playbooks for retail, healthcare, SaaS, e-commerce, restaurants, fitness, real estate, and more. Which industry best describes your business?";
    }
    
    if (input.includes('schedule') || input.includes('call') || input.includes('meeting') || input.includes('book')) {
      return "Perfect! I'd be happy to help you schedule a strategy call. You can book directly at https://calendly.com/brettponters/marketier - we'll discuss your specific goals and create a custom growth plan.";
    }
    
    if (input.includes('service') || input.includes('what do you do')) {
      return "We combine AI efficiency with human strategy to help small businesses grow faster and more affordably than traditional agencies. We focus on organic growth through SEO, content marketing, and automation - no paid ads needed!";
    }
    
    if (input.includes('result') || input.includes('outcome') || input.includes('timeline')) {
      return "Our clients typically see initial improvements in 2-4 weeks, with significant growth in 60-90 days. We're 3x faster and 50% more affordable than traditional agencies thanks to our AI-powered approach.";
    }
    
    if (input.includes('contract') || input.includes('commitment')) {
      return "No long-term contracts required! You can cancel anytime with just 30 days notice. We believe our results should speak for themselves, not lock you into lengthy commitments.";
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Great to meet you. I'm here to help you learn about how The Marketier can accelerate your business growth. What aspect of marketing are you most interested in improving?";
    }
    
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're very welcome! Is there anything else about our services you'd like to know? I'm here to help, or we can set up a strategy call to dive deeper into your specific needs.";
    }
    
    // Default response
    return "That's a great question! I'd love to give you a detailed answer on our strategy call where we can discuss your specific situation. Would you like to schedule one? You can book at https://calendly.com/brettponters/marketier";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(input.trim());
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { text: "Pricing Info", action: () => setInput("What are your pricing options?") },
    { text: "Our Services", action: () => setInput("What services do you offer?") },
    { text: "Schedule Call", action: () => setInput("I'd like to schedule a call") }
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-[#46a2a2] text-white p-4 rounded-full shadow-lg hover:bg-[#3a8a8a] transition-colors z-40 ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#46a2a2] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Marketing Assistant</h3>
                  <p className="text-xs text-white/80">The Marketier</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-[#46a2a2]' : 'bg-gray-100'}`}>
                      {message.type === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-[#46a2a2]" />
                      )}
                    </div>
                    <div className={`px-4 py-2 rounded-2xl ${message.type === 'user' ? 'bg-[#46a2a2] text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-[#46a2a2]" />
                    </div>
                    <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition-colors"
                    >
                      {action.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our services..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46a2a2] focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-[#46a2a2] text-white p-2 rounded-lg hover:bg-[#3a8a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SimpleChatbot;