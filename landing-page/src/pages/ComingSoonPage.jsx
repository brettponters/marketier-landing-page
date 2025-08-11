import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Rocket, Calendar } from 'lucide-react';
import SEOHead from '../components/SEOHead';

function ComingSoonPage() {
  return (
    <>
      <SEOHead 
        title="Coming Soon - The Marketier"
        description="Exciting new features and resources are coming soon to The Marketier community. Stay tuned!"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-[#46a2a2]/10 rounded-full mb-6"
            >
              <Rocket className="w-10 h-10 text-[#46a2a2]" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Coming Soon
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8"
            >
              We're working hard to bring you amazing free resources and community features!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="bg-gray-50 rounded-lg p-4">
                <Calendar className="w-8 h-8 text-[#46a2a2] mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Launch Date</p>
                <p className="text-xs text-gray-500">Q1 2025</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Bell className="w-8 h-8 text-[#46a2a2] mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Get Notified</p>
                <p className="text-xs text-gray-500">Be the first to know</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Rocket className="w-8 h-8 text-[#46a2a2] mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Free Access</p>
                <p className="text-xs text-gray-500">Community resources</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="bg-[#46a2a2]/5 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What's Coming:</h3>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#46a2a2] mr-2">•</span>
                    Free marketing templates and guides
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#46a2a2] mr-2">•</span>
                    Community forum for small business owners
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#46a2a2] mr-2">•</span>
                    Weekly marketing tips and insights
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#46a2a2] mr-2">•</span>
                    AI-powered marketing tools
                  </li>
                </ul>
              </div>
              
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-[#46a2a2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3a8686] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ComingSoonPage;