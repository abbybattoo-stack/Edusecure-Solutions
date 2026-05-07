import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/edusecure-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduSecure Solutions — Build Your Digital Success Story" },
      { name: "description", content: "Premium websites, LMS administration, agentic AI, customer support, and lead generation — your single accountable digital partner." },
      { property: "og:title", content: "EduSecure Solutions — Digital Success Partner" },
      { property: "og:description", content: "Websites, LMS, AI agents, support and lead-gen — built secure-first." },
    ],
  }),
  component: Index,
});

const services = [
  {
    num: "02 / LMS ADMINISTRATION",
    title: "Expert LMS Administration",
    desc: "Full-service Moodle and open-source LMS management — from setup and security hardening to daily admin and performance tuning.",
    features: ["Moodle setup, migration & hardening", "User & course administration", "Data backups & 24/7 monitoring", "Analytics & reporting dashboards"],
    icon: <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    cta: "Learn More",
  },
  {
    num: "03 / CUSTOMER SUPPORT",
    title: "Responsive Customer Support",
    desc: "Seamless, human-first customer support solutions delivered via chat, email, and voice — ensuring every client interaction builds loyalty.",
    features: ["Multi-channel support (chat, email, voice)", "Help desk setup & management", "SLA management & reporting", "Ticketing system integration"],
    icon: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    cta: "Learn More",
  },
  {
    num: "04 / AGENTIC AI",
    title: "Autonomous Agentic AI",
    desc: "Deploy intelligent AI agents that think, plan, and act — automating complex workflows so your team can focus on what truly matters.",
    features: ["Custom AI agent architecture & deployment", "Workflow automation & integration", "Natural language interfaces", "LLM fine-tuning & RAG pipelines"],
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
    cta: "Explore AI",
    aiCard: true,
  },
  {
    num: "05 / LEAD GENERATION",
    title: "Precision Lead Generation",
    desc: "Data-driven strategies that attract, qualify, and convert your ideal customers — filling your pipeline with opportunities that close.",
    features: ["Outbound & inbound campaign strategy", "SEO, content & paid acquisition", "CRM integration & nurture sequences", "Conversion optimisation & A/B testing"],
    icon: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    cta: "Start Growing",
  },
];

const marquee = ["Website Creation", "LMS Administration", "Customer Support", "Agentic AI", "Lead Generation", "Digital Success"];

function Index() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; msg: string }>({ type: "idle", msg: "" });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    };
    document.addEventListener("mousemove", onMove);
    let raf = 0;
    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(animate);
    };
    animate();

    const hoverEls = document.querySelectorAll("a, button, .service-card, .pillar");
    const enter = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
      ring.style.width = "60px"; ring.style.height = "60px";
      ring.style.borderColor = "rgba(212,168,67,0.8)";
    };
    const leave = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.width = "38px"; ring.style.height = "38px";
      ring.style.borderColor = "rgba(212,168,67,0.5)";
    };
    hoverEls.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

    // Reveal
    const reveals = document.querySelectorAll(".reveal");
    const ro = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = [...(entry.target.parentElement?.children ?? [])].filter(c => c.classList.contains("reveal"));
          const idx = siblings.indexOf(entry.target as Element);
          setTimeout(() => entry.target.classList.add("up"), idx * 80);
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(el => ro.observe(el));

    // Metric bars
    const bo = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>(".metric-bar").forEach(bar => {
            bar.style.transform = "scaleX(" + bar.getAttribute("data-width") + ")";
          });
          bo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".trust-metrics").forEach(el => bo.observe(el));

    // Card radial
    const cards = document.querySelectorAll<HTMLElement>(".service-card");
    const onCardMove = (e: Event) => {
      const evt = e as MouseEvent;
      const card = evt.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((evt.clientX - rect.left) / rect.width * 100).toFixed(1) + "%");
      card.style.setProperty("--my", ((evt.clientY - rect.top) / rect.height * 100).toFixed(1) + "%");
    };
    cards.forEach(c => c.addEventListener("mousemove", onCardMove));

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      hoverEls.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
      cards.forEach(c => c.removeEventListener("mousemove", onCardMove));
      ro.disconnect(); bo.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormStatus({ type: "loading", msg: "Sending..." });
    try {
      const res = await fetch("https://formspree.io/f/mldwjkkw", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormStatus({ type: "success", msg: "✓ Thanks — we'll be in touch within 24 hours." });
        form.reset();
      } else {
        setFormStatus({ type: "error", msg: "Something went wrong. Please email us directly." });
      }
    } catch {
      setFormStatus({ type: "error", msg: "Network error. Please try again." });
    }
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      <nav className="site-nav">
        <a href="#" className="nav-logo">
          <img src={logo} alt="EduSecure Solutions" className="logo-emblem-img" width={42} height={42} />
          <div>
            <div className="logo-name">Edu<span>Secure</span></div>
            <div className="logo-tagline">Solutions</div>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>Start Your Journey</button>
      </nav>

      <section className="hero">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-grid" />
        <div className="hero-stripes" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Trusted Digital Partner
          </div>
          <h1>
            Let's Build Your
            <em className="line2">Digital Success</em>
            <span className="line3">EduSecure Solutions</span>
          </h1>
          <p className="hero-desc">We architect websites, secure learning systems, power AI agents, and generate leads that convert — everything you need to grow with confidence in the digital age.</p>
          <div className="hero-actions">
            <a href="#services" className="btn-primary">
              Explore Services
              <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact" className="btn-outline">Talk to Us</a>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="marquee-strip">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((m, i) => <span key={i} className="marquee-item">{m}</span>)}
        </div>
      </div>

      <section className="section services-section" id="services">
        <div className="services-header">
          <div>
            <div className="section-eyebrow reveal">What We Do</div>
            <h2 className="section-title reveal">Five pillars of your <em>digital growth</em></h2>
          </div>
          <p className="section-body reveal">From a single landing page to a fully autonomous AI agent ecosystem — we deliver end-to-end digital solutions tailored for modern organisations and educational institutions.</p>
        </div>

        <div className="services-grid">
          <div className="service-card wide reveal">
            <div className="wide-left">
              <div className="card-num">01 / WEBSITE CREATION</div>
              <div className="card-icon-wrap">
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              </div>
              <h3 className="card-title">Stunning Websites That Convert</h3>
              <p className="card-desc">We design and develop premium websites that don't just look beautiful — they perform. From landing pages to full-scale web applications, every pixel serves a purpose.</p>
              <a href="#contact" className="card-link">
                Get Started
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            <div className="wide-right">
              <ul className="card-features">
                <li>Custom design & branding aligned to your identity</li>
                <li>Responsive, mobile-first development</li>
                <li>SEO-optimised architecture from day one</li>
                <li>CMS integration (WordPress, Webflow, custom)</li>
                <li>Speed & Core Web Vitals optimisation</li>
                <li>Ongoing maintenance & hosting support</li>
              </ul>
            </div>
          </div>

          {services.map((s, i) => (
            <div key={i} className={`service-card reveal${s.aiCard ? " ai-card" : ""}`}>
              <div className="card-num">{s.num}</div>
              <div className="card-icon-wrap">{s.icon}</div>
              <h3 className="card-title">{s.title}</h3>
              <p className="card-desc">{s.desc}</p>
              <ul className="card-features">{s.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
              <a href="#contact" className="card-link">
                {s.cta}
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="about">
        <div className="story-section">
          <div className="story-visual">
            <div className="story-box-main reveal">
              <div className="big-stat">100%</div>
              <div className="big-stat-label">Security-First Philosophy</div>
              <div className="story-stats">
                <div className="story-stat"><div className="story-stat-num">24/7</div><div className="story-stat-label">Support Coverage</div></div>
                <div className="story-stat"><div className="story-stat-num">5+</div><div className="story-stat-label">Core Services</div></div>
                <div className="story-stat"><div className="story-stat-num">0</div><div className="story-stat-label">Downtime Tolerance</div></div>
                <div className="story-stat"><div className="story-stat-num">∞</div><div className="story-stat-label">Scalability</div></div>
              </div>
            </div>
            <div className="story-box-accent reveal">
              <p>"Your success becomes<br />our track record."</p>
            </div>
          </div>
          <div className="story-text">
            <div className="section-eyebrow reveal">Our Story</div>
            <h2 className="section-title reveal">Built to power <em>digital futures</em></h2>
            <p className="reveal">EduSecure Solutions was founded with a singular conviction: that organisations deserve digital partnerships built on trust, transparency, and measurable results.</p>
            <p className="reveal">We combine cutting-edge technology with deep domain expertise across web development, educational technology, AI, and growth marketing — giving you a single, accountable partner for your entire digital journey.</p>
            <ul className="pillar-list reveal">
              {["Security-first in every engagement", "Transparent communication at every step", "Rapid iteration, never slow bureaucracy", "Budget-aligned solutions without compromise", "Long-term partnership over one-time projects"].map((p, i) => (
                <li key={i} className="pillar"><span className="pillar-dot" /><span>{p}</span></li>
              ))}
            </ul>
            <div className="reveal">
              <a href="#contact" className="btn-primary">
                Start the Conversation
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="process-inner">
          <div className="process-header">
            <div>
              <div className="section-eyebrow reveal">How It Works</div>
              <h2 className="section-title reveal">From first call to <em>full launch</em></h2>
            </div>
            <p className="section-body reveal">A clear, four-step process designed to move fast without sacrificing quality. We fit around you — not the other way around.</p>
          </div>
          <div className="process-steps">
            {[
              { n: "01", t: "Discovery", d: "We learn your goals, audience, and constraints in a focused strategy session." },
              { n: "02", t: "Blueprint", d: "A tailored proposal with clear deliverables, timeline, and transparent pricing." },
              { n: "03", t: "Build & Iterate", d: "Agile delivery with regular check-ins. You see progress, not just a final result." },
              { n: "04", t: "Launch & Grow", d: "Go live with confidence. Ongoing support ensures you keep growing post-launch." },
            ].map(s => (
              <div key={s.n} className="process-step reveal">
                <div className="step-circle"><span>{s.n}</span></div>
                <div className="step-title">{s.t}</div>
                <p className="step-desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="trust-section">
          <div className="trust-quote reveal">
            <p className="trust-quote-text">We're starting small — with a security-first mindset, thoughtful processes, and a promise to be transparent at every step. Your success is our most important metric.</p>
            <div className="trust-quote-attr">
              <div className="attr-line" />
              <div className="attr-name">EduSecure Solutions — Founding Commitment</div>
            </div>
          </div>
          <div className="trust-metrics reveal">
            <div className="section-eyebrow">What We Deliver</div>
            {[
              { l: "Uptime Guarantee", w: "0.99", p: "99%" },
              { l: "Client Satisfaction", w: "1", p: "100%" },
              { l: "On-Time Delivery", w: "0.95", p: "95%" },
              { l: "Security Score", w: "1", p: "A+" },
              { l: "Lead Conversion Lift", w: "0.78", p: "78%" },
            ].map((m, i) => (
              <div key={i} className="metric-row">
                <div className="metric-label">{m.l}</div>
                <div className="metric-bar-wrap"><div className="metric-bar" data-width={m.w} /></div>
                <div className="metric-pct">{m.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section" id="contact">
        <div className="cta-inner">
          <div className="cta-left reveal">
            <div className="section-eyebrow">Get In Touch</div>
            <h2>Ready to build your <em>success story?</em></h2>
            <p>Tell us what you need and we'll craft a solution around it. No templates, no cookie-cutter packages — just focused, expert work delivered with care.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 36, height: 36, border: "1px solid rgba(212,168,67,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--muted)" }}>info@edusecuresolutions.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 36, height: 36, border: "1px solid rgba(212,168,67,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--muted)" }}>Kolkata, West Bengal</span>
              </div>
            </div>
          </div>
          <div className="cta-right reveal">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" name="first_name" required className="form-input" placeholder="John" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" name="last_name" required className="form-input" placeholder="Smith" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" required className="form-input" placeholder="john@company.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Telephone</label>
                  <input type="tel" name="phone" required className="form-input" placeholder="+1 555 123 4567" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Organisation</label>
                <input type="text" name="organization" className="form-input" placeholder="Your company or institution" />
              </div>
              <div className="form-group">
                <label className="form-label">Service of Interest</label>
                <select name="service" className="form-select form-input" defaultValue="">
                  <option value="">Select a service...</option>
                  <option>Website Creation</option>
                  <option>LMS Administration</option>
                  <option>Customer Support</option>
                  <option>Agentic AI</option>
                  <option>Lead Generation</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tell Us About Your Project</label>
                <textarea name="message" required className="form-textarea" placeholder="Describe your goals and challenges..." />
              </div>
              <button type="submit" disabled={formStatus.type === "loading"} className="form-submit">
                {formStatus.type === "loading" ? "Sending..." : "Send Message →"}
              </button>
              {formStatus.msg && (
                <div id="form-message" style={{ color: formStatus.type === "success" ? "var(--gold)" : formStatus.type === "error" ? "var(--coral)" : "var(--muted)" }}>
                  {formStatus.msg}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="nav-logo" style={{ textDecoration: "none" }}>
              <img src={logo} alt="EduSecure" className="logo-emblem-img" width={42} height={42} />
              <div>
                <div className="logo-name">Edu<span>Secure</span></div>
                <div className="logo-tagline">Solutions</div>
              </div>
            </a>
            <p>Building your digital success story — one secure, high-performing solution at a time.</p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Website Creation</a></li>
              <li><a href="#services">LMS Administration</a></li>
              <li><a href="#services">Customer Support</a></li>
              <li><a href="#services">Agentic AI</a></li>
              <li><a href="#services">Lead Generation</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 EduSecure Solutions. All rights reserved.</span>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/edusecure-solutions-bb743137b" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="social-btn" aria-label="Twitter">
              <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="#" className="social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
