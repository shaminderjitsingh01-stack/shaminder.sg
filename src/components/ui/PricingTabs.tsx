'use client'

import { useState } from 'react'
import { CheckCircle, Zap, Mail, ArrowRight, MessageCircle, Shield } from 'lucide-react'

export default function PricingTabs() {
  const [tab, setTab] = useState<'marketing' | 'websites' | 'email'>('marketing')

  return (
    <section id="packages" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hari Raya / Eid Special Banner — remove after 4 Apr 2026 */}
        {new Date() < new Date('2026-04-05') && (
          <div className="bg-green-600 text-white text-center py-3 px-6 rounded-xl mb-8 shadow-lg">
            <span className="text-lg md:text-xl font-bold">☪ Hari Raya / Eid Special !! ☪</span>
            <p className="text-sm mt-1">Till 4th April 2026. <a href="https://wa.me/6598137066?text=Hi%20Shaminder,%20I'm%20interested%20in%20the%20Hari%20Raya%20special%20offer" target="_blank" rel="noopener noreferrer" className="underline font-bold">Call Now !!</a></p>
          </div>
        )}

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Transparent Pricing</h2>
        <p className="text-gray-600 text-center mb-8">Simple, honest pricing. No hidden fees. Cancel anytime.</p>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            {([
              { key: 'marketing' as const, label: 'Digital Marketing' },
              { key: 'websites' as const, label: 'Websites' },
              { key: 'email' as const, label: 'Email Marketing' },
            ]).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-2 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-base rounded-lg font-medium transition ${
                  tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Digital Marketing - Trial + Full Package */}
        {tab === 'marketing' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 7-Day Trial */}
            <div className="bg-white rounded-2xl border-2 border-indigo-200 p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">7-DAY TRIAL</div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Try Before You Commit</h3>
                  <p className="text-gray-600 text-sm mb-4">Experience our digital marketing service risk-free for 7 days. See the quality before you decide.</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {[
                      '1 short-form video (Reels/TikTok/Shorts)',
                      '3 social media posts across 8 platforms',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-indigo-600">FREE</span>
                  </div>
                  <a
                    href="https://wa.me/6598137066?text=Hi%20Shaminder,%20I'd%20like%20to%20start%20the%207-day%20free%20trial%20for%20digital%20marketing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2" size={16} />
                  </a>
                  <p className="text-xs text-gray-500">No credit card required</p>
                </div>
              </div>
            </div>

            {/* Full Package */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white relative shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={20} className="text-yellow-300" fill="currentColor" />
                  <span className="text-sm font-semibold text-indigo-200 uppercase tracking-wide">Done-For-You</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Digital Marketing Package</h3>
                <p className="text-indigo-200 mb-6">Everything you need to grow online — managed by us, powered by our proprietary marketing platform.</p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl md:text-6xl font-bold">$700</span>
                  <span className="text-xl text-indigo-200">/month</span>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mb-8">
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
                      <CheckCircle size={16} className="text-indigo-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://calendly.com/shaminder_sg/letstalk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition"
                  >
                    Book a Free Strategy Call
                    <ArrowRight className="ml-2" size={18} />
                  </a>
                  <a
                    href="https://wa.me/6598137066?text=Hi%20Shaminder,%20I'm%20interested%20in%20the%20$700/mo%20digital%20marketing%20package"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20"
                  >
                    <MessageCircle className="mr-2" size={18} />
                    Ask on WhatsApp
                  </a>
                </div>

                <p className="text-indigo-300 text-sm mt-6">No lock-in contract. 30-day notice to cancel. Ad spend billed separately.</p>
              </div>
            </div>
          </div>
        )}

        {/* Websites - One-Time */}
        {tab === 'websites' && (
          <div>
            <p className="text-gray-600 text-center mb-8">Build it once, own it forever. All websites include mobile-optimised design, SEO setup, and 30-day support.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Starter Website', price: '$1,500', time: '1 week', tagline: 'Perfect for new businesses', features: ['Up to 5 pages', 'Mobile-optimised design', 'Basic SEO setup', 'Contact form', 'Google Analytics'] },
                { name: 'Business Website', price: '$3,000', time: '2 weeks', tagline: 'For established SMEs', popular: true, features: ['10+ pages', 'Blog setup', 'Advanced SEO', 'Multiple forms', 'CRM integration'] },
                { name: 'E-commerce Store', price: '$5,000', time: '2–3 weeks', tagline: 'Sell products online', features: ['Full online store', 'Payment gateway', 'Product management', 'Order notifications', 'Inventory tracking'] },
                { name: 'Website Redesign', price: 'From $2,000', time: '1–2 weeks', tagline: 'Modernise your site', features: ['Fresh modern design', 'Content migration', 'SEO preservation', 'Speed optimisation', 'Mobile-first'] },
                { name: 'Custom / Complex', price: 'Let\'s talk', time: 'Varies', tagline: 'Portals, dashboards, apps', features: ['Custom functionality', 'API integrations', 'User authentication', 'Admin panels', 'Tailored to your needs'] },
              ].map((service, i) => (
                <div key={i} className={`rounded-2xl p-6 transition relative ${service.popular ? 'bg-indigo-600 text-white shadow-xl' : 'bg-white border border-gray-200 hover:border-indigo-200 hover:shadow-md'}`}>
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-500 text-white text-sm font-medium px-4 py-1 rounded-full">Most Popular</span>
                    </div>
                  )}
                  <h4 className={`font-bold text-lg mb-1 ${service.popular ? 'text-white' : 'text-gray-900'}`}>{service.name}</h4>
                  <p className={`text-xs font-medium mb-3 ${service.popular ? 'text-indigo-200' : 'text-indigo-600'}`}>{service.tagline}</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`text-3xl font-bold ${service.popular ? 'text-white' : 'text-gray-900'}`}>{service.price}</span>
                  </div>
                  <p className={`text-sm mb-4 ${service.popular ? 'text-indigo-200' : 'text-gray-500'}`}>Delivered in {service.time}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={14} className={`flex-shrink-0 ${service.popular ? 'text-indigo-300' : 'text-green-500'}`} />
                        <span className={service.popular ? 'text-white' : 'text-gray-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://calendly.com/shaminder_sg/letstalk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center px-6 py-3 rounded-lg font-semibold transition ${
                      service.popular
                        ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email Marketing - Cold Outbound */}
        {tab === 'email' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white relative shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={20} className="text-indigo-400" />
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Done-For-You</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Cold Outbound Email Marketing</h3>
                <p className="text-gray-400 mb-6">Done-for-you B2B lead generation through cold email — fully managed, fully compliant.</p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl md:text-6xl font-bold">$1,500</span>
                  <span className="text-xl text-gray-400">/month</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-green-900/40 text-green-400 px-3 py-1.5 rounded-lg text-sm font-medium mb-8">
                  <Shield size={14} />
                  PDPA Compliant
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mb-8">
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
                      <CheckCircle size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://calendly.com/shaminder_sg/letstalk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Book a Free Strategy Call
                    <ArrowRight className="ml-2" size={18} />
                  </a>
                  <a
                    href="https://wa.me/6598137066?text=Hi%20Shaminder,%20I'm%20interested%20in%20the%20cold%20email%20marketing%20package"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20"
                  >
                    <MessageCircle className="mr-2" size={18} />
                    Ask on WhatsApp
                  </a>
                </div>

                <p className="text-gray-500 text-sm mt-6">No lock-in contract. 30-day notice to cancel. List building tools billed separately if applicable.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Not sure what you need? Let&apos;s figure it out together — no obligation.</p>
          <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline">Book a free call to discuss →</a>
        </div>
      </div>
    </section>
  )
}
