import React from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles, Rocket, BarChart3, Layers } from "lucide-react";
import { motion } from "framer-motion";

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
const CardHeader = ({ children, className = "" }) => (
  <div className={`p-5 border-b ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${className}`}
    {...props}
  />
);

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b" role="banner">
        <Section className="flex items-center justify-between py-3">
          <motion.div 
            className="flex items-center gap-3 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src="/the-marketier-logo.png" 
              alt="The Marketier - AI Marketing Agency for Small Business Growth" 
              className="h-10 w-auto object-contain"
            />
          </motion.div>
          <nav className="hidden md:flex items-center justify-center gap-6 text-sm text-slate-600 absolute left-1/2 transform -translate-x-1/2" role="navigation" aria-label="Main navigation">
            <a href="#how" className="hover:text-teal-700 transition-colors">How We Work</a>
            <a href="#templates" className="hover:text-teal-700 transition-colors">Growth Playbooks</a>
            <a href="#tools" className="hover:text-teal-700 transition-colors">Toolbox</a>
            <a href="#partner" className="hover:text-teal-700 transition-colors">Partner</a>
            <a href="#faq" className="hover:text-teal-700 transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
            <Button className="rounded-2xl">Join Free Community</Button>
          </div>
        </Section>
      </header>

      <main role="main">
        {/* Hero */}
        <Section className="pt-20 sm:pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, #2d7a7a 0%, #46a2a2 30%, #6bb3b3 60%, #8cc6c6 85%, #b3d9d9 100%)'
              }}
            >
              Organic Marketing That Actually Works for Small Business
            </h1>
            <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-prose">
              We combine AI efficiency with human strategy to help small businesses and private practices achieve sustainable growth — faster, smarter, and more affordably than traditional agencies.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex w-full max-w-lg gap-3">
              <Input placeholder="Work email" className="h-11 rounded-xl" />
              <Button type="submit" className="h-11 rounded-xl px-5">Join Free</Button>
            </form>
            <div className="mt-4 text-sm text-slate-500">No contracts. Cancel anytime.</div>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2"><Check className="h-4 w-4"/>AI + Human Partnership</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4"/>Organic Growth, Not Paid Ads</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4"/>Transparent Results</div>
            </div>
          </motion.div>
          <motion.div 
            className="lg:justify-self-end w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="rounded-3xl shadow-xl -mt-4">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#46a2a2]">
                  Example Growth Loop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="grid sm:grid-cols-2 gap-3">
                  {[
                    {icon: <Sparkles/>, title: "Audit & Strategy", text: "AI-powered audits + human insight for targeted growth."},
                    {icon: <Layers/>, title: "Content Engine", text: "10x content velocity with AI-generated, human-refined assets."},
                    {icon: <Rocket/>, title: "Launch", text: "Deploy campaigns, optimize SEO, and capture leads."},
                    {icon: <BarChart3/>, title: "Optimize", text: "Analyze, iterate, and double down on what works."},
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3 p-3 rounded-2xl border bg-white/60">
                      <div className="mt-0.5 text-[#46a2a2]">{s.icon}</div>
                      <div>
                        <div className="font-medium">{s.title}</div>
                        <div className="text-sm text-slate-600">{s.text}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* How it Works */}
      <Section id="how" className="py-20">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">How We Deliver Growth</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">We merge AI precision with strategic expertise to create repeatable, ROI-driven growth systems for your business.</p>
        </motion.div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {title: "Assess & Plan", body: "Deep AI audit + strategy session to map your biggest opportunities."},
            {title: "Implement & Launch", body: "High-impact content, SEO, and local visibility campaigns."},
            {title: "Measure & Refine", body: "Transparent reporting, continuous optimization, and strategy pivots."},
          ].map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="rounded-2xl h-full backdrop-blur-sm border-slate-200/50">
                <CardContent className="p-8">
                  <div className="text-xl font-semibold">{b.title}</div>
                  <p className="text-slate-600 mt-3 text-base leading-relaxed">{b.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Templates */}
      <Section id="templates" className="py-20">
        <motion.div 
          className="flex items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Growth Playbooks</h2>
            <p className="mt-3 text-slate-600 text-lg">Proven AI + human workflows for SEO, content, and local marketing — ready to deploy.</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="rounded-xl">Browse Playbooks</Button>
          </motion.div>
        </motion.div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            {title: "Local SEO Dominator", tag: "Local SEO", desc: "Own the map pack and outrank competitors in your area.", slug: "local-seo-dominator"},
            {title: "Content Authority Engine", tag: "Content", desc: "Build topical authority with AI-assisted, human-edited content.", slug: "content-authority-engine"},
            {title: "Reputation Builder", tag: "Brand", desc: "Automate review requests and manage online presence.", slug: "reputation-builder"},
            {title: "Competitor Intel System", tag: "Research", desc: "Track competitors' content, offers, and rankings in real time.", slug: "competitor-intel-system"},
            {title: "AI-Powered Blog Accelerator", tag: "SEO", desc: "Publish 8+ optimized articles per month with minimal effort.", slug: "ai-blog-accelerator"},
            {title: "Conversion Optimizer", tag: "CRO", desc: "Turn more visitors into customers with strategic tweaks.", slug: "conversion-optimizer"},
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <Card className="rounded-2xl h-full backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-6">
                  <div className="text-xs text-slate-500 font-medium">{t.tag}</div>
                  <CardTitle className="text-lg leading-tight mt-2">{t.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-sm text-slate-600 leading-relaxed">{t.desc}</p>
                  <motion.div whileHover={{ x: 4 }}>
                    <Link to={`/playbook/${t.slug}`}>
                      <Button variant="ghost" className="mt-4 px-0 text-teal-700 hover:text-teal-900">View →</Button>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Toolbox */}
      <Section id="tools" className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Our Toolbox</h2>
          <p className="mt-3 text-slate-600 text-lg">Industry-leading AI and marketing tools integrated into every campaign.</p>
        </motion.div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {["SEO & Analytics", "Content Creation", "Local Marketing", "CRO & Testing", "Competitive Research", "Reputation Management", "CRM Integration", "Data Automation"].map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="rounded-2xl h-full backdrop-blur-sm border-slate-200/50">
                <CardContent className="p-6">
                  <div className="font-semibold">{cat}</div>
                  <div className="text-sm text-slate-600 mt-2">Powered by AI + expert oversight</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Partner */}
      <Section id="partner" className="py-24">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Partner With Us</h2>
          <p className="mt-5 text-slate-600 max-w-2xl mx-auto text-lg">Ready to grow together? Let's explore partnership opportunities.</p>
          <motion.div 
            className="mt-10"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button className="rounded-2xl px-8 py-3">Apply to Partner</Button>
          </motion.div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section className="py-20">
        <motion.div 
          className="rounded-3xl border bg-white/80 backdrop-blur-sm p-10 sm:p-12 text-center shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold">Start Growing Smarter</h3>
          <p className="mt-3 text-slate-600 text-lg">Join our free AI marketing community and see how we combine technology and strategy to deliver measurable growth.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Input placeholder="Work email" className="h-11 rounded-xl max-w-xs mx-auto sm:mx-0" />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="h-11 rounded-xl">Join Free</Button>
            </motion.div>
          </div>
          <div className="text-xs text-slate-500 mt-4">By continuing, you agree to our terms and privacy.</div>
        </motion.div>
      </Section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20" role="contentinfo">
        <Section className="py-16 grid sm:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/the-marketier-logo.png" 
                alt="The Marketier" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-slate-600 text-base leading-relaxed max-w-sm">AI-powered marketing that actually works for small business growth.</p>
            <div className="text-sm text-slate-500 mt-6">© {new Date().getFullYear()} The Marketier</div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-base mb-4">Links</h3>
            <ul className="space-y-3">
              <li><a href="#templates" className="text-slate-600 hover:text-teal-700 transition-colors">Playbooks</a></li>
              <li><a href="#tools" className="text-slate-600 hover:text-teal-700 transition-colors">Toolbox</a></li>
              <li><a href="#partner" className="text-slate-600 hover:text-teal-700 transition-colors">Partner</a></li>
              <li><a href="#faq" className="text-slate-600 hover:text-teal-700 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-base mb-4">Get updates</h3>
            <form onSubmit={(e)=>e.preventDefault()} className="flex gap-2 mb-4">
              <Input placeholder="you@company.com" className="h-11 rounded-xl flex-1" />
              <Button className="h-11 rounded-xl px-6">Subscribe</Button>
            </form>
            <p className="text-sm text-slate-500">Stay updated with our latest insights and tools.</p>
          </div>
        </Section>
      </footer>
    </div>
  );
}