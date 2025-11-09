"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link

export default function LandingPageClient() {
  // --- React State for Interactivity ---
  const [activeTab, setActiveTab] = useState('banking');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "What's VoP vs CoP?",
      answer: "VoP (Verification of Payee) checks the beneficiary's name before you send euro payments. CoP (Confirmation of Payee) does the same for UK Faster Payments. Both prevent misdirected transfers by matching account names."
    },
    {
      question: "Are instant payments always available?",
      answer: "Instant payments depend on your account type and the recipient's bank. SEPA Instant works 24/7 across most EU banks, while UK Faster Payments operate around the clock for participating banks. We'll show you real-time availability before you send."
    },
    {
      question: "How do vIBANs work per invoice?",
      answer: "Each invoice gets a unique virtual IBAN that routes to your main account. When customers pay, we automatically match the payment to the specific invoice, eliminating manual reconciliation. Perfect for subscription billing and B2B invoicing."
    },
    {
      question: "Which countries are supported?",
      answer: "We support EU27 + UK companies with local IBAN and GBP account opening. Send payments to 200+ countries via SEPA, SWIFT, and local rails. Trading services availability varies by jurisdiction and regulatory approval."
    },
    {
      question: "How is trading provided?",
      answer: "Trading services are provided by regulated third-party partners. You can access FX, stocks, ETFs, and crypto through our unified interface, but execution happens with licensed brokers. Capital at risk - not investment advice."
    },
    {
      question: "Can I bring my accountant?",
      answer: "Absolutely. We integrate with Xero, QuickBooks, and provide read-only access for your accountant. Export audit trails, transaction logs, and reconciliation reports in standard formats. Your accountant will love the clean data."
    }
  ];

  // This function handles opening/closing the FAQ
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : null);
  };

  // --- Ported JavaScript (SDK logic REMOVED) ---
  useEffect(() => {

    // Analytics tracking for CTA buttons
    const trackButtons = document.querySelectorAll('[data-event]');
    trackButtons.forEach(button => {
      const clickHandler = (e: Event) => {
        const event = button.getAttribute('data-event');
        console.log('Analytics event:', event);
        e.preventDefault();

        const originalText = button.textContent;
        button.textContent = event === 'cta_early_access' ? 'Thanks for your interest!' : 'We\'ll be in touch!';
        (button as HTMLElement).style.opacity = '0.7';

        setTimeout(() => {
          button.textContent = originalText;
          (button as HTMLElement).style.opacity = '1';
        }, 2000);
      };

      button.addEventListener('click', clickHandler);

      // Cleanup function
      return () => {
        button.removeEventListener('click', clickHandler);
      };
    });

    // Smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(anchor => {
      const scrollHandler = (e: Event) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      };

      anchor.addEventListener('click', scrollHandler);

      // Cleanup
      return () => {
        anchor.removeEventListener('click', scrollHandler);
      };
    });

  }, []); // Empty dependency array ensures this runs once


  // --- JSX for rendering ---
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 id="main-headline">
              Your 10-second money cockpit for EU/UK teams.
            </h1>
            <p id="subheadline">
              Open local IBAN/GBP accounts, issue virtual cards, send instant
              payments with VoP/CoP checks, and automate cashflow—plus planning
              &amp; trading in one dashboard.
            </p>
            <div className="hero-ctas">
              {/* UPDATED: This is now a Link */}
              <Link href="/auth/sign-up" className="btn-primary" id="primary-cta">
                Get Early Access
              </Link>
              <Link href="#" className="btn-secondary" id="secondary-cta">
                See 2-min Demo
              </Link>
            </div>
            <div className="hero-trust-badges">
              <span className="hero-badge">
                <svg
                  className="hero-badge-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.57l-1.072 5.36a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.57l1.072-5.36a.75.75 0 00-.77-.734z" />
                </svg>
                Instant
              </span>
              <span className="hero-badge">
                <svg
                  className="hero-badge-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                VoP/CoP
              </span>
              <span className="hero-badge">
                <svg
                  className="hero-badge-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
                GDPR
              </span>
              <span className="hero-badge">
                <svg
                  className="hero-badge-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1.944A11.954 11.954 0 012.166 5.09.05.05 0 012 5.044V10c0 4.446 3.582 8.067 8 8.067s8-3.621 8-8.067V5.044a.05.05 0 01-.166-.046A11.954 11.954 0 0110 1.944zM8.25 10a.75.75 0 01.75-.75h2a.75.75 0 010 1.5h-2a.75.75 0 01-.75-.75zm0 2.25a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5h-.01a.75.75 0 01-.75-.75zm1.5.75a.75.75 0 00-.75.75v.01a.75.75 0 001.5 0v-.01a.75.75 0 00-.75-.75zm.75 2.25a.75.75 0 01.75-.75h.01a.75.75 0 010 1.5h-.01a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                DORA-ready
              </span>
            </div>
          </div>
          <div className="quick-view">
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === 'banking' ? 'active' : ''}`}
                onClick={() => setActiveTab('banking')}
              >
                Core Banking
              </button>
              <button
                className={`tab-button ${activeTab === 'b2b' ? 'active' : ''}`}
                onClick={() => setActiveTab('b2b')}
              >
                B2B Services
              </button>
              <button
                className={`tab-button ${activeTab === 'planning' ? 'active' : ''}`}
                onClick={() => setActiveTab('planning')}
              >
                Planning
              </button>
              <button
                className={`tab-button ${activeTab === 'trading' ? 'active' : ''}`}
                onClick={() => setActiveTab('trading')}
              >
                Trading
              </button>
            </div>

            {/* Tab Content */}
            <div id="banking" className={`tab-content ${activeTab === 'banking' ? 'active' : ''}`}>
              <ul>
                <li>Local EU IBANs + GBP</li>
                <li>Instant euro + VoP / Faster Payments + CoP</li>
                <li>Virtual cards with merchant locks</li>
              </ul>
            </div>
            <div id="b2b" className={`tab-content ${activeTab === 'b2b' ? 'active' : ''}`}>
              <ul>
                <li>Team wallets &amp; approvals</li>
                <li>Mass payouts</li>
                <li>Pay-by-link (SEPA Inst / PIS)</li>
              </ul>
            </div>
            <div id="planning" className={`tab-content ${activeTab === 'planning' ? 'active' : ''}`}>
              <ul>
                <li>Brief: balances, runway, VAT</li>
                <li>Autopilot rules</li>
                <li>Anomaly alerts</li>
              </ul>
            </div>
            <div id="trading" className={`tab-content ${activeTab === 'trading' ? 'active' : ''}`}>
              <ul>
                <li>FX, stocks, crypto (via partners)</li>
                <li>Rules-based allocators</li>
                <li>Read-only until enabled</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Band */}
      <section className="trust-band">
        <div className="container">
          <div className="trust-content">
            <div className="disclaimer">
              Trading via regulated partners. Capital at risk. Eligibility applies.
            </div>
          </div>
        </div>
      </section>

      {/* Why Dollarbaz */}
      <section className="section">
        <div className="container">
          <h2>Why Dollarbaz</h2>
          <div className="proof-cards">
            <div className="proof-card">
              <h3>
                <span className="status-dot"></span>Faster to cash
              </h3>
              <p>
                Ten-second transfers on euro/GBP with name-checks to prevent
                mis-directed payments.
              </p>
            </div>
            <div className="proof-card">
              <h3>
                <span className="status-dot"></span>Compliance that feels invisible
              </h3>
              <p>
                VoP/CoP flows, SCA, and audit-ready logs baked into the UI.
              </p>
            </div>
            <div className="proof-card">
              <h3>
                <span className="status-dot"></span>Books that close themselves
              </h3>
              <p>
                vIBAN-per-invoice + Autopilot rules = 95%+ auto-match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Pillars */}
      <section className="section" id="features">
        <div className="container">
          <h2>Product Pillars</h2>
          <div className="pillars">
            <div className="pillar">
              <h3>Money &amp; Safety</h3>
              <ul>
                <li>
                  Local EU IBANs + GBP <span className="chip">Live</span>
                </li>
                <li>
                  SCT Inst + VoP <span className="chip">Live</span>
                </li>
                <li>
                  FPS + CoP <span className="chip">Live</span>
                </li>
                <li>
                  Virtual cards (MCC, per-vendor, geo/limits){' '}
                  <span className="chip">Beta</span>
                </li>
              </ul>
            </div>
            <div className="pillar">
              <h3>The Brief</h3>
              <ul>
                <li>8am snapshot—balances, runway, VAT pot</li>
                <li>Invoices due, FX watch</li>
                <li>
                  Anomalies <span className="chip warning-chip">Alert</span>
                </li>
              </ul>
            </div>
            <div className="pillar">
              <h3>Autopilot</h3>
              <ul>
                <li>VAT Safety Net rules</li>
                <li>FX Threshold Convert</li>
                <li>Late-Invoice Nudger</li>
                <li>End-of-Month Sweep</li>
              </ul>
            </div>
            <div className="pillar">
              <h3>Trading &amp; Treasury</h3>
              <ul>
                <li>FX, indices, stocks, crypto via partners</li>
                <li>
                  Rules &gt; impulse{' '}
                  <span className="chip warning-chip">Capital at risk</span>
                </li>
              </ul>
            </div>
            <div className="pillar">
              <h3>B2B Ops</h3>
              <ul>
                <li>Team wallets, approvals</li>
                <li>Mass payouts</li>
                <li>
                  Webhooks <span className="chip">API</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <div className="container">
          <h2>Pricing</h2>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>Free</h3>
              <div className="price">€0</div>
              <div className="price-note">Account + Brief Lite</div>
              <button className="btn-secondary">Get Started</button>
            </div>
            <div className="pricing-card featured">
              <h3>Pro</h3>
              <div className="price">€12</div>
              <div className="price-note">per seat/month</div>
              <p>Autopilot rules, invoicing, reconciliation</p>
              <button className="btn-primary">Choose Pro</button>
            </div>
            <div className="pricing-card">
              <h3>Premium</h3>
              <div className="price">€29</div>
              <div className="price-note">per seat/month</div>
              <p>Advanced rules, API, multi-entity</p>
              <button className="btn-secondary">Choose Premium</button>
            </div>
          </div>
          <p
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              color: 'var(--steel-600)',
              fontSize: '0.9rem',
            }}
          >
            Instant payments availability and limits depend on your account and
            recipient bank.
          </p>
        </div>
      </section>

      {/* Security */}
      <section className="section" id="security">
        <div className="container">
          <h2>Security &amp; Compliance</h2>
          <div className="proof-cards">
            <div className="proof-card">
              <h3>🏛️ GDPR &amp; EU Data Residency</h3>
              <p>
                Your data stays in the EU with full GDPR compliance and privacy
                controls.
              </p>
            </div>
            <div className="proof-card">
              <h3>🔐 PCI SAQ-A Compliant</h3>
              <p>
                Hosted payment fields ensure your card data never touches our
                servers.
              </p>
            </div>
            <div className="proof-card">
              <h3>📋 DORA-Aligned</h3>
              <p>
                Vendor management and operational resilience ready for EU
                regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqItems.map((item, index) => (
              <div
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                key={index}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  {item.question}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta-content">
            <h2>Ready to close the books automatically?</h2>
            <div className="final-cta-buttons">
              {/* UPDATED: This is now a Link. */}
              <Link href="/auth/sign-up" className="btn-primary">
                Get Early Access
              </Link>
              <button className="btn-secondary" data-event="cta_demo_click">
                Book a 15-min Fit Call
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

