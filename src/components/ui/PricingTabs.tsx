'use client'

import { useState } from 'react'
import { CheckCircle, Zap, Mail, ArrowRight, MessageCircle, Shield } from 'lucide-react'

export default function PricingTabs() {
  const [tab, setTab] = useState<'marketing' | 'websites' | 'email'>('marketing')

  return (
    <section id="packages" className="py-10 md:py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(160deg, #050510 0%, #0a0a20 40%, #0d0d25 70%, #050510 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">Transparent Pricing</h2>
        <p className="text-gray-500 text-center mb-6 text-sm">Simple, honest pricing. No hidden fees. Cancel anytime.</p>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/5 border border-white/10 rounded-xl p-1">
            {([
              { key: 'marketing' as const, label: 'Digital Marketing' },
              { key: 'websites' as const, label: 'Websites' },
              { key: 'email' as const, label: 'Email Marketing' },
            ]).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-2 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm rounded-lg font-medium transition ${
                  tab === t.key ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Digital Marketing */}
        {tab === 'marketing' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* 7-Day Trial */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 md:p-7 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">7-DAY TRIAL</div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Try Before You Commit</h3>
                  <p className="text-gray-400 text-sm mb-3">Experience our digital marketing service risk-free for 7 days.</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {['1 short-form video (Reels/TikTok/Shorts)', '3 social media posts across 8 platforms'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end gap-2 flex-shrink-0">
                  <span className="text-3xl font-bold text-indigo-400" style={{ textShadow: '0 0 20px rgba(99,102,241,0.4)' }}>FREE</span>
                  <a href="https://wa.me/6598137066?text=Hi%20Shaminder,%20I'd%20like%20to%20start%20the%207-day%20free%20trial%20for%20digital%20marketing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-500 transition text-sm" style={{ boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
                    Start Free Trial <ArrowRight className="ml-2" size={14} />
                  </a>
                  <p className="text-xs text-gray-600">No credit card required</p>
                </div>
              </div>
            </div>

            {/* Full Package */}
            <div className="relative rounded-2xl overflow-hidden">
              {/* Glow border effect */}
              <div className="absolute -inset-[1px] rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(168,85,247,0.5), rgba(99,102,241,0.5))', filter: 'blur(1px)' }} />
              <div className="relative bg-gradient-to-br from-indigo-950/90 to-purple-950/90 backdrop-blur-sm rounded-2xl p-6 md:p-10">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={18} className="text-yellow-400" fill="currentColor" />
                  <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">Done-For-You</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Digital Marketing Package</h3>
                <p className="text-indigo-300/70 mb-5 text-sm">Everything you need to grow online — managed by us, powered by our proprietary marketing platform.</p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl md:text-5xl font-bold text-white">$700</span>
                  <span className="text-lg text-indigo-300/70">/month</span>
                </div>

                <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                  {[
                    'SEO — keyword tracking & backlinks',
                    'Social media — 8 posts + 4 short-form videos/month',
                    'Content creation — 4 blog articles/month',
                    '8 platform distribution — LinkedIn, Meta, TikTok & more',
                    'Google Business Profile — setup & optimisation',
                    'Google Analytics & Search Console — setup & tracking',
                    'Paid ads management — Google, Meta, TikTok, LinkedIn',
                    'AI chatbot — WhatsApp & website setup included',
                    'Push notifications — web push campaigns',
                    'Monthly performance reports — AI-powered insights',
                    'Real-time marketing dashboard — full transparency',
                    'Content approval workflow — review before it goes live',
                    'Dedicated account manager — WhatsApp support',
                    'Monthly strategy call — review results & plan ahead',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition text-sm">
                    Book a Free Strategy Call <ArrowRight className="ml-2" size={16} />
                  </a>
                  <a href="https://wa.me/6598137066?text=Hi%20Shaminder,%20I'm%20interested%20in%20the%20$700/mo%20digital%20marketing%20package" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20 text-sm">
                    <MessageCircle className="mr-2" size={16} /> Ask on WhatsApp
                  </a>
                </div>
                <p className="text-gray-600 text-xs mt-4">No lock-in contract. 30-day notice to cancel. Ad spend billed separately.</p>
              </div>
            </div>
          </div>
        )}

        {/* Websites */}
        {tab === 'websites' && (
          <div>
            <p className="text-gray-500 text-center mb-6 text-sm">Build it once, own it forever. All websites include mobile-optimised design, SEO setup, and 30-day support.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Starter Website', price: '$1,500', time: '1 week', tagline: 'Perfect for new businesses', features: ['Up to 5 pages', 'Mobile-optimised design', 'Basic SEO setup', 'Contact form', 'Google Analytics'] },
                { name: 'Business Website', price: '$3,000', time: '2 weeks', tagline: 'For established SMEs', popular: true, features: ['10+ pages', 'Blog setup', 'Advanced SEO', 'Multiple forms', 'CRM integration'] },
                { name: 'E-commerce Store', price: '$5,000', time: '2–3 weeks', tagline: 'Sell products online', features: ['Full online store', 'Payment gateway', 'Product management', 'Order notifications', 'Inventory tracking'] },
                { name: 'Website Redesign', price: 'From $2,000', time: '1–2 weeks', tagline: 'Modernise your site', features: ['Fresh modern design', 'Content migration', 'SEO preservation', 'Speed optimisation', 'Mobile-first'] },
                { name: 'Custom / Complex', price: "Let's talk", time: 'Varies', tagline: 'Portals, dashboards, apps', features: ['Custom functionality', 'API integrations', 'User authentication', 'Admin panels', 'Tailored to your needs'] },
              ].map((service, i) => (
                <div key={i} className={`rounded-2xl p-5 transition relative ${service.popular ? 'bg-indigo-600/20 border-2 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'bg-white/5 border border-white/10 hover:border-indigo-500/30'}`}>
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-indigo-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg shadow-indigo-500/30">Most Popular</span>
                    </div>
                  )}
                  <h4 className="font-bold text-base text-white mb-0.5">{service.name}</h4>
                  <p className="text-xs font-medium mb-2 text-indigo-400">{service.tagline}</p>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-2xl font-bold text-white">{service.price}</span>
                  </div>
                  <p className="text-xs mb-3 text-gray-500">Delivered in {service.time}</p>
                  <ul className="space-y-1.5 mb-4">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs">
                        <CheckCircle size={12} className="flex-shrink-0 text-green-400" />
                        <span className="text-gray-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className={`block text-center px-4 py-2 rounded-lg font-semibold transition text-sm ${service.popular ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}>
                    Get Started
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email Marketing */}
        {tab === 'email' && (
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute -inset-[1px] rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(55,65,81,0.4), rgba(99,102,241,0.4))', filter: 'blur(1px)' }} />
              <div className="relative bg-gray-950/90 backdrop-blur-sm rounded-2xl p-6 md:p-10">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={18} className="text-indigo-400" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Done-For-You</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Cold Outbound Email Marketing</h3>
                <p className="text-gray-500 mb-5 text-sm">Done-for-you B2B lead generation through cold email — fully managed, fully compliant.</p>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl md:text-5xl font-bold text-white">$1,500</span>
                  <span className="text-lg text-gray-500">/month</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-green-900/30 text-green-400 px-3 py-1 rounded-lg text-xs font-medium mb-6 border border-green-800/30">
                  <Shield size={12} /> PDPA Compliant
                </div>

                <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                  {[
                    'Targeted prospect list building — ICP-matched leads',
                    'Domain setup & warm-up — SPF, DKIM, DMARC configured',
                    'Email copywriting — personalised sequences that convert',
                    'Multi-step follow-up sequences — automated drip campaigns',
                    'A/B testing — subject lines, copy, and send times',
                    'Inbox management — reply handling and lead routing',
                    'Campaign analytics — open rates, replies, conversions',
                    'Monthly strategy call — review results and optimise',
                    'CRM integration — leads pushed to your pipeline',
                    'Deliverability monitoring — stay out of spam folders',
                    'PDPA compliance — opt-out handling, data protection',
                    'Dedicated campaign manager — WhatsApp support',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition text-sm" style={{ boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
                    Book a Free Strategy Call <ArrowRight className="ml-2" size={16} />
                  </a>
                  <a href="https://wa.me/6598137066?text=Hi%20Shaminder,%20I'm%20interested%20in%20the%20cold%20email%20marketing%20package" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20 text-sm">
                    <MessageCircle className="mr-2" size={16} /> Ask on WhatsApp
                  </a>
                </div>
                <p className="text-gray-600 text-xs mt-4">No lock-in contract. 30-day notice to cancel. List building tools billed separately if applicable.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-2 text-sm">Not sure what you need? Let&apos;s figure it out together — no obligation.</p>
          <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-medium hover:text-indigo-300 text-sm">Book a free call to discuss &rarr;</a>
        </div>
      </div>
    </section>
  )
}
