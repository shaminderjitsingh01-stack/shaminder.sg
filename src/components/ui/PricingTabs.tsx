'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function PricingTabs() {
  const [tab, setTab] = useState<'bundles' | 'onetime' | 'monthly'>('bundles')

  return (
    <section id="packages" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Transparent Pricing</h2>
        <p className="text-gray-600 text-center mb-8">Pay for what you need. One-time builds + optional ongoing services.</p>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            {(['bundles', 'onetime', 'monthly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-lg font-medium transition ${
                  tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t === 'bundles' ? 'Bundles' : t === 'onetime' ? 'One-Time' : 'Monthly'}
              </button>
            ))}
          </div>
        </div>

        {/* Bundles */}
        {tab === 'bundles' && (
          <div>
            <p className="text-gray-600 text-center mb-8">Save time with pre-packaged solutions. Best value for most businesses.</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-indigo-200 hover:shadow-lg transition">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Starter Bundle</h4>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2"><span className="text-3xl font-bold text-gray-900">$1,800</span><span className="text-gray-500">one-time</span></div>
                  <div className="flex items-baseline gap-2"><span className="text-xl font-bold text-indigo-600">+ $150</span><span className="text-gray-500">/month</span></div>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">One-time setup:</p>
                  <ul className="space-y-1 text-sm text-gray-600 mb-4">
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Starter Website (5 pages)</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Google Business Setup</li>
                  </ul>
                  <p className="text-sm font-medium text-gray-700 mb-2">Monthly:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Hosting & maintenance</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Small edits (2/month)</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Email support</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-500 mb-6">Best for: New businesses, freelancers</p>
                <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="block text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">Get Started</a>
              </div>

              <div className="bg-indigo-600 rounded-2xl p-8 text-white relative shadow-xl">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2"><span className="bg-orange-500 text-white text-sm font-medium px-4 py-1 rounded-full">Most Popular</span></div>
                <h4 className="text-xl font-bold mb-4">Growth Bundle</h4>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2"><span className="text-3xl font-bold">$4,500</span><span className="text-indigo-200">one-time</span></div>
                  <div className="flex items-baseline gap-2"><span className="text-xl font-bold">+ $1,200</span><span className="text-indigo-200">/month</span></div>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-medium text-indigo-200 mb-2">One-time setup:</p>
                  <ul className="space-y-1 text-sm mb-4">
                    <li className="flex items-center"><CheckCircle size={14} className="text-indigo-300 mr-2 flex-shrink-0" /> Business Website (10+ pages)</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-indigo-300 mr-2 flex-shrink-0" /> Google Business Setup</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-indigo-300 mr-2 flex-shrink-0" /> Sales Funnel</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-indigo-300 mr-2 flex-shrink-0" /> CRM Setup</li>
                  </ul>
                  <p className="text-sm font-medium text-indigo-200 mb-2">Monthly:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center"><CheckCircle size={14} className="text-indigo-300 mr-2 flex-shrink-0" /> Hosting & maintenance</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-indigo-300 mr-2 flex-shrink-0" /> Social media (12 posts/mo)</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-indigo-300 mr-2 flex-shrink-0" /> Email marketing (2 campaigns)</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-indigo-300 mr-2 flex-shrink-0" /> Monthly strategy call</li>
                  </ul>
                </div>
                <p className="text-sm text-indigo-200 mb-6">Best for: SMEs ready to grow</p>
                <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="block text-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">Get Started</a>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-indigo-200 hover:shadow-lg transition">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Scale Bundle</h4>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2"><span className="text-3xl font-bold text-gray-900">$7,000</span><span className="text-gray-500">one-time</span></div>
                  <div className="flex items-baseline gap-2"><span className="text-xl font-bold text-indigo-600">+ $2,800</span><span className="text-gray-500">/month</span></div>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">One-time setup:</p>
                  <ul className="space-y-1 text-sm text-gray-600 mb-4">
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Business Website (10+ pages)</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Full CRM + automation</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Sales funnel system</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Google Business Setup</li>
                  </ul>
                  <p className="text-sm font-medium text-gray-700 mb-2">Monthly:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Everything in Growth</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Paid ads management</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Content creation (4/mo)</li>
                    <li className="flex items-center"><CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> Bi-weekly strategy calls</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-500 mb-6">Best for: Serious growth, multi-location</p>
                <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="block text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">Get Started</a>
              </div>
            </div>
          </div>
        )}

        {/* One-Time */}
        {tab === 'onetime' && (
          <div>
            <p className="text-gray-600 text-center mb-8">Build it once, own it forever. No recurring fees for the build itself.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Starter Website', price: '$1,500', time: '1 week', tagline: 'Perfect for new businesses', desc: '5 pages, mobile-optimised, basic SEO, contact form' },
                { name: 'Business Website', price: '$3,000', time: '2 weeks', tagline: 'For established SMEs', desc: '10+ pages, blog setup, advanced SEO, multiple forms' },
                { name: 'Landing Page', price: '$500', time: '3 days', tagline: 'For ads & campaigns', desc: 'Single high-converting page + thank you page' },
                { name: 'Sales Funnel', price: '$1,000', time: '5 days', tagline: 'Capture & nurture leads', desc: 'Landing page + email capture + follow-up sequence' },
                { name: 'E-commerce Store', price: '$5,000', time: '2-3 weeks', tagline: 'Sell products online', desc: 'Full online store, payments, product management' },
                { name: 'AI Automation', price: '$800', time: '1 week', tagline: 'Work smarter, not harder', desc: 'AI chatbot, automated workflows, lead qualification' },
                { name: 'Google Business Setup', price: '$300', time: '2 days', tagline: 'Get found locally', desc: 'Full optimisation, photos, posts, review system' },
                { name: 'CRM Setup', price: '$500', time: '3 days', tagline: 'Organise your leads', desc: 'Pipeline, automations, email/SMS templates' },
              ].map((service, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-indigo-200 hover:shadow-md transition">
                  <h4 className="font-bold text-gray-900 mb-1">{service.name}</h4>
                  <p className="text-xs text-indigo-600 font-medium mb-2">{service.tagline}</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-indigo-600">{service.price}</span>
                    <span className="text-sm text-gray-500">• {service.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monthly */}
        {tab === 'monthly' && (
          <div>
            <p className="text-gray-600 text-center mb-8">Ongoing work that keeps your business growing. Cancel anytime.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Maintenance & Hosting', price: '$150', tagline: 'Keep your site running smooth', desc: 'Hosting, SSL, updates, backups, 2 small edits/month' },
                { name: 'Social Media Management', price: '$600', tagline: 'Stay visible & consistent', desc: '12 posts/month, captions, hashtags, scheduling' },
                { name: 'Content Creation', price: '$800', tagline: 'Fuel your marketing', desc: '4 blog posts OR 8 short-form videos monthly' },
                { name: 'Email Marketing', price: '$400', tagline: 'Nurture your audience', desc: '2 campaigns/month, list management, automations' },
                { name: 'Paid Ads Management', price: '$500 + 15%', tagline: 'Get leads faster', desc: 'Google + Meta ads, reporting, optimisation' },
                { name: 'Reputation Management', price: '$300', tagline: 'Build trust & reviews', desc: 'Review requests, monitoring, responses' },
              ].map((service, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-indigo-200 hover:shadow-md transition">
                  <h4 className="font-bold text-gray-900 mb-1">{service.name}</h4>
                  <p className="text-xs text-indigo-600 font-medium mb-2">{service.tagline}</p>
                  <div className="mb-2"><span className="text-2xl font-bold text-indigo-600">{service.price}</span><span className="text-gray-500">/month</span></div>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need something custom? Mix and match services to fit your needs.</p>
          <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline">Book a free call to discuss →</a>
        </div>
      </div>
    </section>
  )
}
