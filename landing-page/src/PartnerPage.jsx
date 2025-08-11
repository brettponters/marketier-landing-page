import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Check } from 'lucide-react';
import SEOHead from './components/SEOHead';

function PartnerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    companySize: '',
    marketingBudget: '',
    mainChallenge: '',
    phone: ''
  });
  const [showCalendly, setShowCalendly] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if required fields are filled
    const { name, email, company, companySize, marketingBudget, mainChallenge } = formData;
    setIsFormValid(
      name.trim() !== '' &&
      email.trim() !== '' &&
      email.includes('@') &&
      company.trim() !== '' &&
      companySize !== '' &&
      marketingBudget !== '' &&
      mainChallenge.trim() !== ''
    );
  }, [formData]);

  useEffect(() => {
    // Load Calendly widget script
    if (showCalendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showCalendly]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Store form data (you could send this to your backend)
      localStorage.setItem('partnerFormData', JSON.stringify(formData));
      setShowCalendly(true);
    }
  };

  if (showCalendly) {
    return (
      <>
        <SEOHead 
          title="Schedule Your Strategy Call - The Marketier"
          description="Book your personalized marketing strategy session with The Marketier team."
        />
        
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#46a2a2] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Your Strategy Call</h1>
                <p className="text-gray-600">Select a time that works best for you</p>
              </div>
              
              <div className="calendly-inline-widget" 
                   data-url="https://calendly.com/brettponters/marketier?hide_event_type_details=1&background_color=ffffff&text_color=374151&primary_color=46a2a2"
                   style={{ minWidth: '320px', height: '630px' }}
              />
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Partner With Us - The Marketier"
        description="Transform your marketing with The Marketier. Fill out our brief form to schedule your personalized strategy session."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#46a2a2] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          {/* Centered Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Let's Grow Your Business</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Tell us about your business and marketing goals to get started with your personalized strategy session</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left side - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
                <div className="flex items-center justify-center w-16 h-16 bg-[#46a2a2]/10 rounded-full mb-4">
                  <Users className="w-8 h-8 text-[#46a2a2]" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Partner With Us?</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#46a2a2] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Personalized Strategy</p>
                      <p className="text-sm text-gray-600">Custom marketing plan tailored to your business</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#46a2a2] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">AI-Powered Efficiency</p>
                      <p className="text-sm text-gray-600">Leverage cutting-edge technology for faster results</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#46a2a2] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Organic Growth Focus</p>
                      <p className="text-sm text-gray-600">Build sustainable growth without relying on paid ads</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#46a2a2] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Transparent Pricing</p>
                      <p className="text-sm text-gray-600">No hidden fees or long-term contracts</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-[#46a2a2]/5 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium mb-1">Quick Process:</p>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Fill out the form (2 minutes)</li>
                    <li>2. Schedule your call</li>
                    <li>3. Get your custom strategy</li>
                  </ol>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col">
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#46a2a2] focus:border-transparent outline-none transition"
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#46a2a2] focus:border-transparent outline-none transition"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#46a2a2] focus:border-transparent outline-none transition"
                        placeholder="Acme Corp"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#46a2a2] focus:border-transparent outline-none transition"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Size *
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#46a2a2] focus:border-transparent outline-none transition"
                      required
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Marketing Budget *
                    </label>
                    <select
                      name="marketingBudget"
                      value={formData.marketingBudget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#46a2a2] focus:border-transparent outline-none transition"
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="<1000">Less than $1,000</option>
                      <option value="1000-5000">$1,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-25000">$10,000 - $25,000</option>
                      <option value="25000+">$25,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What's your main marketing challenge? *
                    </label>
                    <textarea
                      name="mainChallenge"
                      value={formData.mainChallenge}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#46a2a2] focus:border-transparent outline-none transition resize-none"
                      rows="3"
                      placeholder="E.g., We need more qualified leads, our current marketing isn't converting, we want to scale but don't know how..."
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={!isFormValid}
                    whileHover={isFormValid ? { scale: 1.02 } : {}}
                    whileTap={isFormValid ? { scale: 0.98 } : {}}
                    className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      isFormValid 
                        ? 'bg-[#46a2a2] text-white hover:bg-[#3a8686]' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    Continue to Schedule Call
                  </motion.button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our terms and privacy policy.
                    We'll never spam or sell your information.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PartnerPage;