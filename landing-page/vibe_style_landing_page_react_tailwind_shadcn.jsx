import React from "react";
import { Check, Sparkles, Rocket, BarChart3, Layers, Zap } from "lucide-react";
// Removed shadcn/ui path aliases; using minimal Tailwind primitives so the preview initializes without your local UI library.

// Minimal UI primitives (Tailwind-only)
const Button = ({ variant = "default", className = "", children, ...props }) => (
  <button
    className={
      `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none ` +
      (variant === "outline"
        ? "border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2 "
        : variant === "ghost"
        ? "bg-transparent hover:bg-slate-100 px-3 py-2 "
        : "bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 ") +
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
    className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${className}`}
    {...props}
  />
);

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

export default function VibeStyleLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
        <Section className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-black text-white grid place-items-center font-bold">AI</div>
            <span className="font-semibold tracking-tight">AI Organic Marketing</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#how" className="hover:text-slate-900">How We Work</a>
            <a href="#templates" className="hover:text-slate-900">Growth Playbooks</a>
            <a href="#tools" className="hover:text-slate-900">Toolbox</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
            <Button className="rounded-2xl">Join Free Community</Button>
          </div>
        </Section>
      </header>

      {/* Hero */}
      <Section className="pt-14 sm:pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Your AI-powered organic marketing partner — built for small businesses, not enterprises.
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
          </div>
          <div className="lg:justify-self-end w-full">
            <Card className="rounded-3xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Example Growth Loop</CardTitle>
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
                      <div className="mt-0.5">{s.icon}</div>
                      <div>
                        <div className="font-medium">{s.title}</div>
                        <div className="text-sm text-slate-600">{s.text}</div>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <Zap className="h-4 w-4"/> Works with your stack: GA4, SEMrush, Make.com, Zapier.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* How it Works */}
      <Section id="how" className="py-14">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">How We Deliver Growth</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">We merge AI precision with strategic expertise to create repeatable, ROI-driven growth systems for your business.</p>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {title: "Assess & Plan", body: "Deep AI audit + strategy session to map your biggest opportunities."},
            {title: "Implement & Launch", body: "High-impact content, SEO, and local visibility campaigns."},
            {title: "Measure & Refine", body: "Transparent reporting, continuous optimization, and strategy pivots."},
          ].map((b, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="text-xl font-medium">{b.title}</div>
                <p className="text-slate-600 mt-2 text-sm">{b.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Templates */}
      <Section id="templates" className="py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Growth Playbooks</h2>
            <p className="mt-2 text-slate-600">Proven AI + human workflows for SEO, content, and local marketing — ready to deploy.</p>
          </div>
          <Button variant="outline" className="rounded-xl">Browse Playbooks</Button>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            {title: "Local SEO Dominator", tag: "Local SEO", desc: "Own the map pack and outrank competitors in your area."},
            {title: "Content Authority Engine", tag: "Content", desc: "Build topical authority with AI-assisted, human-edited content."},
            {title: "Reputation Builder", tag: "Brand", desc: "Automate review requests and manage online presence."},
            {title: "Competitor Intel System", tag: "Research", desc: "Track competitors’ content, offers, and rankings in real time."},
            {title: "AI-Powered Blog Accelerator", tag: "SEO", desc: "Publish 8+ optimized articles per month with minimal effort."},
            {title: "Conversion Optimizer", tag: "CRO", desc: "Turn more visitors into customers with strategic tweaks."},
          ].map((t, i) => (
            <Card key={i} className="rounded-2xl hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-xs text-slate-500">{t.tag}</div>
                <CardTitle className="text-lg leading-tight">{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{t.desc}</p>
                <Button variant="ghost" className="mt-3 px-0">View →</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Toolbox */}
      <Section id="tools" className="py-14">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Our Toolbox</h2>
        <p className="mt-2 text-slate-600">Industry-leading AI and marketing tools integrated into every campaign.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["SEO & Analytics", "Content Creation", "Local Marketing", "CRO & Testing", "Competitive Research", "Reputation Management", "CRM Integration", "Data Automation"].map((cat, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="font-medium">{cat}</div>
                <div className="text-sm text-slate-600 mt-1">Powered by AI + expert oversight</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <div className="rounded-3xl border bg-white p-8 sm:p-10 text-center shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-semibold">Start Growing Smarter</h3>
          <p className="mt-2 text-slate-600">Join our free AI marketing community and see how we combine technology and strategy to deliver measurable growth.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Input placeholder="Work email" className="h-11 rounded-xl max-w-xs mx-auto sm:mx-0" />
            <Button className="h-11 rounded-xl">Join Free</Button>
          </div>
          <div className="text-xs text-slate-500 mt-3">By continuing, you agree to our terms and privacy.</div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <Section className="py-10 grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-semibold">AI Organic Marketing</div>
            <p className="text-slate-600 mt-2 max-w-sm">An AI-first organic marketing partner delivering enterprise-level results at small business pricing.</p>
          </div>
          <div>
            <div className="font-medium">Links</div>
            <ul className="mt-2 space-y-2 text-slate-600">
              <li><a href="#templates" className="hover:text-slate-900">Playbooks</a></li>
              <li><a href="#tools" className="hover:text-slate-900">Toolbox</a></li>
              <li><a href="#faq" className="hover:text-slate-900">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Get updates</div>
            <form onSubmit={(e)=>e.preventDefault()} className="mt-2 flex gap-2">
              <Input placeholder="you@company.com" className="h-10 rounded-xl" />
              <Button className="h-10 rounded-xl">Subscribe</Button>
            </form>
            <div className="text-xs text-slate-500 mt-2">© {new Date().getFullYear()} AI Organic Marketing</div>
          </div>
        </Section>
      </footer>
    </div>
  );
}
