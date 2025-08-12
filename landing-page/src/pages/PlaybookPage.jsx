import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles, Target, TrendingUp, Clock, Users, DollarSign } from "lucide-react";

const Button = ({ variant = "default", className = "", children, ...props }) => (
  <button
    className={
      `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none ` +
      (variant === "outline"
        ? "border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2 "
        : variant === "ghost"
        ? "bg-transparent hover:bg-slate-100 px-3 py-2 "
        : "bg-[#46a2a2] text-white hover:bg-[#3d8d8d] px-4 py-2 ") +
      className
    }
    {...props}
  >
    {children}
  </button>
);

const Card = ({ className = "", children }) => (
  <div className={`border bg-white rounded-2xl ${className}`}>{children}</div>
);

const playbookData = {
  "local-seo-dominator": {
    title: "Local SEO Dominator",
    category: "Local SEO",
    description: "Own the map pack and outrank competitors in your area with our proven local SEO strategy.",
    metaDescription: "Dominate local search results with The Marketier's Local SEO Dominator playbook. Proven strategies to own the map pack, outrank competitors, and drive more local customers to your business.",
    heroDescription: "Transform your local visibility with data-driven SEO strategies that put you at the top of search results when customers are looking for businesses like yours.",
    price: "$997/month",
    timeline: "Results in 60-90 days",
    idealFor: "Local service businesses, medical practices, retail stores, restaurants",
    features: [
      "Google Business Profile optimization and management",
      "Local citation building across 100+ directories",
      "Location-specific keyword research and targeting",
      "Local link building from community sites",
      "Review generation and reputation management",
      "NAP consistency audit and cleanup",
      "Location pages optimization",
      "Local schema markup implementation"
    ],
    process: [
      { step: "Audit", description: "Complete analysis of your current local presence and competitor landscape" },
      { step: "Optimize", description: "Google Business Profile enhancement and website local SEO optimization" },
      { step: "Build", description: "Citations, local links, and review generation campaigns" },
      { step: "Monitor", description: "Track rankings, manage reviews, and adjust strategy monthly" }
    ],
    results: [
      "Average 156% increase in map pack visibility",
      "3x more calls from Google in 90 days",
      "Top 3 rankings for primary local keywords",
      "50+ new reviews in first 6 months"
    ]
  },
  "geo-ai-lead-generation": {
    title: "GEO for AI Lead Generation",
    category: "AI Discovery & Lead Gen",
    description: "Master Generative Engine Optimization (GEO) to capture leads from AI platforms like ChatGPT, Claude, and Perplexity.",
    metaDescription: "Dominate AI search with The Marketier's GEO for AI Lead Generation playbook. Learn Generative Engine Optimization to get recommended by ChatGPT, Claude, and Perplexity for explosive lead growth.",
    heroDescription: "GEO (Generative Engine Optimization) is the new SEO. While competitors fight for Google rankings, capture high-intent leads directly from AI platforms where 70% of users now start their search.",
    price: "$1,497/month",
    timeline: "First AI mentions in 14-30 days",
    idealFor: "B2B companies, SaaS, professional services, local businesses, anyone wanting first-mover advantage",
    features: [
      "llms.txt implementation for AI discovery",
      "AI platform optimization (ChatGPT, Claude, Perplexity, Gemini)",
      "Structured data markup for AI comprehension",
      "Location-based GEO for local AI visibility",
      "AI-friendly content transformation",
      "Citation and authority building for AI trust",
      "Monitoring of AI platform mentions and recommendations",
      "Competitive GEO analysis and gap identification"
    ],
    process: [
      { step: "Audit", description: "Analyze current AI visibility and identify optimization opportunities" },
      { step: "Optimize", description: "Implement llms.txt, structured data, and AI-friendly content formats" },
      { step: "Amplify", description: "Build authority signals that AI systems recognize and trust" },
      { step: "Monitor", description: "Track AI mentions, analyze performance, and refine strategy" }
    ],
    results: [
      "Get recommended by AI platforms within 30 days",
      "10-15% of leads coming from AI referrals",
      "3x higher conversion rates from AI-sourced traffic",
      "First-mover advantage in your industry"
    ]
  },
  "reputation-builder": {
    title: "Reputation Builder",
    category: "Brand Management",
    description: "Automate review requests and manage your online presence to build unshakeable trust.",
    metaDescription: "Build and protect your online reputation with The Marketier's Reputation Builder playbook. Automated review generation, reputation monitoring, and crisis management.",
    heroDescription: "Turn your customer satisfaction into a powerful marketing asset with systematic reputation management that builds trust and drives growth.",
    price: "$597/month",
    timeline: "Immediate implementation",
    idealFor: "Service businesses, healthcare providers, hospitality, home services",
    features: [
      "Automated review request system",
      "Multi-platform review monitoring",
      "Review response templates and management",
      "Negative review mitigation strategies",
      "Review showcase widgets for website",
      "Competitor reputation tracking",
      "Monthly reputation reports",
      "Crisis management protocols"
    ],
    process: [
      { step: "Setup", description: "Install review automation and monitoring systems" },
      { step: "Generate", description: "Launch campaigns to collect reviews from happy customers" },
      { step: "Manage", description: "Respond to all reviews and address concerns proactively" },
      { step: "Leverage", description: "Showcase positive reviews across marketing channels" }
    ],
    results: [
      "Average 4.7+ star rating maintained",
      "300% increase in review volume",
      "25% increase in conversion rates",
      "40% reduction in negative review impact"
    ]
  },
  "competitor-intel-system": {
    title: "Competitor Intel System",
    category: "Market Research",
    description: "Track competitors' content, offers, and rankings in real time to stay ahead.",
    metaDescription: "Stay ahead of competition with The Marketier's Competitor Intel System. Real-time tracking of competitor strategies, content, and market positioning.",
    heroDescription: "Never be caught off guard again. Monitor your competitors' every move and use data-driven insights to outmaneuver them in the market.",
    price: "$797/month",
    timeline: "Setup in 7 days",
    idealFor: "Competitive markets, e-commerce, SaaS, professional services",
    features: [
      "Real-time competitor rank tracking",
      "Content and backlink monitoring",
      "Social media activity tracking",
      "Pricing and offer change alerts",
      "Ad campaign monitoring",
      "New competitor detection",
      "SWOT analysis reports",
      "Competitive gap identification"
    ],
    process: [
      { step: "Identify", description: "Map out direct and indirect competitors in your market" },
      { step: "Track", description: "Set up monitoring for all competitor activities and changes" },
      { step: "Analyze", description: "Extract actionable insights from competitor data" },
      { step: "Act", description: "Implement strategies to capitalize on competitor weaknesses" }
    ],
    results: [
      "Identify 20+ competitor vulnerabilities",
      "React to market changes 5x faster",
      "Capture 30% of competitor's lost traffic",
      "Prevent customer churn with proactive strategies"
    ]
  },
  "ai-blog-accelerator": {
    title: "AI-Powered Blog Accelerator",
    category: "Content & SEO",
    description: "Publish 8+ optimized articles per month with minimal effort using AI and expert oversight.",
    metaDescription: "Scale your content production with The Marketier's AI-Powered Blog Accelerator. Publish 8+ SEO-optimized articles monthly with AI efficiency and human quality.",
    heroDescription: "Dramatically scale your content output without sacrificing quality. Our AI-powered system produces search-optimized content that reads naturally and drives results.",
    price: "$1,197/month",
    timeline: "First batch in 7 days",
    idealFor: "Content-driven businesses, affiliate sites, B2B companies, publishers",
    features: [
      "8-12 long-form articles per month",
      "AI content generation with human review",
      "SEO optimization for target keywords",
      "Custom brand voice training",
      "Image selection and optimization",
      "Meta descriptions and title tags",
      "Internal linking suggestions",
      "Content calendar management"
    ],
    process: [
      { step: "Strategy", description: "Develop content themes aligned with business goals" },
      { step: "Generate", description: "AI creates initial drafts based on SEO research" },
      { step: "Refine", description: "Human editors ensure quality, accuracy, and brand voice" },
      { step: "Optimize", description: "Final SEO polish and publication scheduling" }
    ],
    results: [
      "10x content production speed",
      "60% reduction in content costs",
      "Average 2,000+ words per article",
      "85% of articles rank on page 1 within 6 months"
    ]
  },
  "conversion-optimizer": {
    title: "Conversion Optimizer",
    category: "CRO",
    description: "Turn more visitors into customers with strategic conversion rate optimization.",
    metaDescription: "Maximize your website's revenue potential with The Marketier's Conversion Optimizer playbook. Data-driven CRO strategies that turn visitors into customers.",
    heroDescription: "Stop leaving money on the table. Our systematic approach to conversion optimization can double or triple your conversion rates without increasing traffic.",
    price: "$1,297/month",
    timeline: "First test in 14 days",
    idealFor: "E-commerce, SaaS, lead generation sites, service businesses",
    features: [
      "Conversion funnel analysis",
      "A/B testing setup and management",
      "Heat mapping and user recording analysis",
      "Landing page optimization",
      "Cart abandonment reduction",
      "Form optimization",
      "Trust signal implementation",
      "Mobile conversion optimization"
    ],
    process: [
      { step: "Analyze", description: "Deep dive into current conversion metrics and user behavior" },
      { step: "Hypothesize", description: "Develop test hypotheses based on data insights" },
      { step: "Test", description: "Run controlled A/B tests to validate improvements" },
      { step: "Implement", description: "Roll out winning variations and compound gains" }
    ],
    results: [
      "Average 35% increase in conversion rate",
      "50% reduction in cart abandonment",
      "2.5x ROI within 90 days",
      "20% increase in average order value"
    ]
  }
};

export default function PlaybookPage() {
  const { slug } = useParams();
  const playbook = playbookData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (playbook) {
      document.title = `${playbook.title} - The Marketier`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = playbook.metaDescription;
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.content = `${playbook.title} - The Marketier`;
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.content = playbook.metaDescription;
      }
    }
  }, [playbook]);

  if (!playbook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Playbook not found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-[#46a2a2] mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4">
            <span className="text-sm font-medium text-[#46a2a2] uppercase tracking-wide">
              {playbook.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {playbook.title}
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            {playbook.heroDescription}
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-[#46a2a2]" />
                <span className="text-sm text-slate-600">Investment</span>
              </div>
              <p className="font-semibold text-lg">{playbook.price}</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-[#46a2a2]" />
                <span className="text-sm text-slate-600">Timeline</span>
              </div>
              <p className="font-semibold text-lg">{playbook.timeline}</p>
            </Card>
            <Card className="p-4 md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-[#46a2a2]" />
                <span className="text-sm text-slate-600">Ideal For</span>
              </div>
              <p className="font-semibold">{playbook.idealFor}</p>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 mb-12"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#46a2a2]" />
              What's Included
            </h2>
            <ul className="space-y-3">
              {playbook.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#46a2a2] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Target className="h-6 w-6 text-[#46a2a2]" />
              Our Process
            </h2>
            <div className="space-y-4">
              {playbook.process.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#46a2a2] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.step}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-to-br from-teal-50 to-white">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[#46a2a2]" />
              Expected Results
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {playbook.results.map((result, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#46a2a2] rounded-full" />
                  <span className="font-medium text-slate-700">{result}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center py-12 border-t"
        >
          <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Join hundreds of businesses already using this playbook to drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8 py-3 text-base rounded-xl">
              Partner With Us
            </Button>
            <Button variant="outline" className="px-8 py-3 text-base rounded-xl">
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}