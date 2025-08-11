import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Calendar, Sparkles, User, Bot } from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI marketing assistant. I can help you learn about our services, pricing, and schedule a strategy call. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bookingFlow, setBookingFlow] = useState(null); // 'collecting', 'selecting-time', 'confirming'
  const [bookingData, setBookingData] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const messagesEndRef = useRef(null);

  // Backend API configuration
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const getAIResponse = async (userMessage, conversationHistory) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory.slice(-6).map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.response;
    } catch (error) {
      console.error('API error:', error.message);
      return getFallbackResponse(userMessage);
    }
  };

  // Calendly API functions
  const fetchAvailableSlots = async () => {
    if (!import.meta.env.VITE_CALENDLY_API_TOKEN || !import.meta.env.VITE_CALENDLY_USER_URI) {
      return [];
    }

    try {
      const startDate = new Date();
      const endDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // Next 14 days
      
      const response = await fetch(`https://api.calendly.com/availability`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_CALENDLY_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        params: new URLSearchParams({
          user: import.meta.env.VITE_CALENDLY_USER_URI,
          start_time: startDate.toISOString(),
          end_time: endDate.toISOString()
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.collection || [];
      }
    } catch (error) {
      console.error('Calendly API error:', error);
    }
    
    return [];
  };

  const createCalendlyInvitee = async (eventUri, inviteeData) => {
    if (!import.meta.env.VITE_CALENDLY_API_TOKEN) {
      return null;
    }

    try {
      const response = await fetch('https://api.calendly.com/scheduled_events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_CALENDLY_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: eventUri,
          invitee: inviteeData
        })
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Calendly booking error:', error);
    }
    
    return null;
  };

  const startBookingFlow = () => {
    setBookingFlow('collecting');
    return {
      type: 'booking',
      content: "Perfect! I'll help you book a strategy call. I just need a few details:\n\nYour Name:\nEmail Address:\nCompany Name:\nPhone (optional):\n\nPlease provide these details and I'll show you available times!"
    };
  };

  const processBookingDetails = (userInput) => {
    const lines = userInput.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /[\+]?[1-9][\d\s\-\(\)]{7,}/;
    
    let name = '';
    let email = '';
    let company = '';
    let phone = '';
    
    lines.forEach(line => {
      if (emailRegex.test(line)) {
        email = line.match(emailRegex)[0];
      } else if (phoneRegex.test(line)) {
        phone = line.match(phoneRegex)[0];
      } else if (!name && line.length > 2) {
        name = line;
      } else if (!company && line.length > 2) {
        company = line;
      }
    });

    if (name && email) {
      setBookingData({ name, email, company, phone });
      setBookingFlow('selecting-time');
      
      // Generate mock available slots (replace with real Calendly API)
      const slots = generateMockSlots();
      setAvailableSlots(slots);
      
      return {
        type: 'time-selection',
        content: `Great! I have your details:\n\n${name}\n${email}\n${company || 'Not provided'}\n\nHere are available times for your strategy call:`
      };
    }
    
    return {
      type: 'text',
      content: "I need at least your name and email address to book the call. Please provide:\n\nYour Name:\nEmail Address:\nCompany Name:"
    };
  };

  const generateMockSlots = () => {
    const slots = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Start tomorrow
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      if (date.getDay() >= 1 && date.getDay() <= 5) { // Weekdays only
        [10, 14, 16].forEach(hour => {
          const slotTime = new Date(date);
          slotTime.setHours(hour, 0, 0, 0);
          
          slots.push({
            id: `slot_${slotTime.getTime()}`,
            start_time: slotTime.toISOString(),
            formatted: slotTime.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
          });
        });
      }
    }
    
    return slots.slice(0, 6); // Show first 6 slots
  };

  const confirmBooking = async (slotId) => {
    const selectedSlot = availableSlots.find(slot => slot.id === slotId);
    if (!selectedSlot) return null;

    setBookingFlow('confirming');
    
    // In a real implementation, this would create the actual Calendly appointment
    const bookingResult = await createCalendlyInvitee(selectedSlot.event_uri, {
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone
    });

    if (bookingResult || !import.meta.env.VITE_CALENDLY_API_TOKEN) {
      // Success (or demo mode)
      setBookingFlow(null);
      setBookingData({});
      setAvailableSlots([]);
      
      return {
        type: 'booking-confirmed',
        content: `Appointment Confirmed!\n\n${selectedSlot.formatted}\n${bookingData.name}\n${bookingData.email}\n\nYou'll receive a confirmation email shortly. Looking forward to our strategy call!`
      };
    }
    
    return {
      type: 'text',
      content: "I'm having trouble booking the appointment right now. Let me open our calendar so you can book directly."
    };
  };

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
      return "I'd be happy to help you schedule a strategy call! Let me collect your details.";
    }
    
    return "That's a great question! I'd love to give you a detailed answer on our strategy call. Would you like me to schedule a call for you?";
  };

  const quickActions = [
    { text: "Schedule a Call", action: 'schedule' },
    { text: "View Pricing", action: 'pricing' },
    { text: "See Playbooks", action: 'playbooks' },
    { text: "Learn About Tools", action: 'toolbox' }
  ];

  const generateResponse = async (userInput) => {
    const input = userInput.toLowerCase();
    
    // Handle booking flow states
    if (bookingFlow === 'collecting') {
      return processBookingDetails(userInput);
    }
    
    if (bookingFlow === 'selecting-time') {
      // User might be asking questions or confirming a time
      if (input.includes('yes') || input.includes('book') || input.includes('confirm')) {
        return {
          type: 'time-selection',
          content: "Please select one of the available times by clicking the button below:"
        };
      }
    }
    
    // Check for explicit scheduling keywords - only start booking flow for explicit requests
    if ((input.includes('schedule') && (input.includes('call') || input.includes('meeting'))) ||
        (input.includes('book') && (input.includes('call') || input.includes('appointment') || input.includes('meeting'))) ||
        input.includes('schedule a call') || 
        input.includes('book a call') ||
        input.includes('set up a meeting') ||
        input.includes('book an appointment')) {
      return startBookingFlow();
    }

    // Get AI response for everything else
    const aiResponse = await getAIResponse(userInput, messages);
    
    // Only start booking flow if AI explicitly offers to schedule AND user seems interested
    if (aiResponse.toLowerCase().includes('would you like me to schedule') || 
        aiResponse.toLowerCase().includes('would you like to schedule a call')) {
      return {
        type: 'schedule-offer',
        content: aiResponse
      };
    }

    return {
      type: 'text',
      content: aiResponse
    };
  };

  const handleQuickAction = async (action) => {
    const actionText = quickActions.find(qa => qa.action === action)?.text || action;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: actionText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Generate AI response for the quick action
    try {
      const response = await generateResponse(actionText);
      
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          ...response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: "I'm having trouble connecting right now. Would you like to schedule a call instead?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Generate AI response
    try {
      const response = await generateResponse(userInput);
      
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          ...response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: "I'm having trouble connecting right now. Would you like to schedule a call to speak with our team directly?",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTimeSelection = async (slotId) => {
    setIsTyping(true);
    
    try {
      const result = await confirmBooking(slotId);
      
      setTimeout(() => {
        const botMessage = {
          id: Date.now(),
          type: 'bot',
          ...result,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      setTimeout(() => {
        const botMessage = {
          id: Date.now(),
          type: 'bot',
          content: "I'm having trouble booking the appointment right now. Let me open our calendar so you can book directly.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleScheduleOffer = () => {
    // Start the automated booking flow
    const bookingResponse = startBookingFlow();
    
    const botMessage = {
      id: Date.now(),
      type: 'bot',
      ...bookingResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const openCalendly = () => {
    window.open('https://calendly.com/brettponters/marketier', '_blank');
  };

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-[#46a2a2] text-white p-4 rounded-full shadow-lg hover:bg-[#3a8686] transition-colors ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <MessageCircle className="w-6 h-6" />
        <motion.div
          className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#46a2a2] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">The Marketier AI</h3>
                  <p className="text-xs opacity-90">Your Marketing Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-[#46a2a2]' : 'bg-white border-2 border-[#46a2a2]'}`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-[#46a2a2]" />
                      )}
                    </div>
                    <div className={`rounded-2xl p-3 ${message.type === 'user' ? 'bg-[#46a2a2] text-white' : 'bg-white border'}`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      
                      {/* Time Selection UI */}
                      {message.type === 'bot' && (message.content.includes('Here are available times') || message.type === 'time-selection') && availableSlots.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => handleTimeSelection(slot.id)}
                              className="block w-full text-left bg-[#46a2a2]/10 hover:bg-[#46a2a2]/20 text-[#46a2a2] px-3 py-2 rounded-lg text-sm transition-colors"
                            >
                              {slot.formatted}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Schedule Offer Button */}
                      {message.type === 'bot' && (message.content.includes('would you like me to schedule') || message.content.includes('would you like to schedule a call')) && (
                        <button
                          onClick={handleScheduleOffer}
                          className="mt-3 bg-[#46a2a2] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3a8686] transition-colors flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Yes, Schedule a Call
                        </button>
                      )}
                      
                      {/* Fallback Calendar Button */}
                      {message.type === 'bot' && message.content.includes('open our calendar') && (
                        <button
                          onClick={openCalendly}
                          className="mt-3 bg-[#46a2a2] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3a8686] transition-colors flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Open Calendar
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-[#46a2a2] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-[#46a2a2]" />
                    </div>
                    <div className="bg-white border rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 bg-white border-t">
                <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.action)}
                      className="text-xs bg-[#46a2a2]/10 text-[#46a2a2] px-3 py-2 rounded-lg hover:bg-[#46a2a2]/20 transition-colors"
                    >
                      {action.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about pricing, tools, or schedule a call..."
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#46a2a2] focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-[#46a2a2] text-white p-2 rounded-lg hover:bg-[#3a8686] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;