'use client'

import { useState, useEffect } from 'react'
import { Calendar, MessageCircle, CheckCircle, ExternalLink, Play } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import FaqAccordion from '@/components/ui/FaqAccordion'
import PricingTabs from '@/components/ui/PricingTabs'
import CTASection from '@/components/ui/CTASection'
import SchemaMarkup from '@/components/seo/SchemaMarkup'

const faqs = [
  { q: 'How fast can you get started?', a: 'We can start within a week of our first call. Websites are typically delivered in 48 hours.' },
  { q: 'Do I need to provide content?', a: "We'll guide you through everything, but you don't need to prepare anything in advance. We handle the heavy lifting." },
  { q: 'What if I already have a website?', a: 'No problem. We can redesign it, improve it, or build fresh — whatever makes sense for your goals.' },
  { q: 'How is this different from hiring a big agency?', a: "We're a boutique consultancy — small team, direct communication, no account managers or layers. You get senior-level expertise without the agency overhead." },
  { q: 'Is there a contract or lock-in?', a: 'No long-term contracts. Monthly commitment. You can cancel anytime with 30 days notice.' },
  { q: "What if I'm not sure what I need?", a: "That's what the free call is for. We'll figure out what makes sense for your business — no obligation." },
]

const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'shaminder.sg',
    url: 'https://shaminder.sg',
    description: 'Digital marketing and web design for Singapore SMEs',
    publisher: { '@type': 'Person', name: 'Shaminderjit Singh' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shaminderjit Singh',
    url: 'https://shaminder.sg',
    jobTitle: 'Digital Marketing Consultant',
    worksFor: { '@type': 'Organization', name: 'Shaminder Technologies', url: 'https://shaminder.sg' },
    address: { '@type': 'PostalAddress', addressCountry: 'SG', addressLocality: 'Singapore' },
    email: 'hello@shaminder.sg',
    telephone: '+6598137066',
    image: 'https://shaminder.sg/shaminder.jpg',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Shaminder Technologies',
    url: 'https://shaminder.sg',
    telephone: '+6598137066',
    email: 'hello@shaminder.sg',
    address: { '@type': 'PostalAddress', addressCountry: 'SG', addressLocality: 'Singapore' },
    priceRange: '$500 - $7,000',
    areaServed: 'Singapore',
    serviceType: ['Web Design', 'Digital Marketing', 'SEO', 'AI Automation', 'Content Marketing'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
]

const FALLBACK_IDS = ['ZLMRVyhKzRM', 'VZyfDEVEDTE', 'SLmryJ3Wl6I', 'NGaucg8C0E4']

export default function Home() {
  const [videoIds, setVideoIds] = useState<string[]>(FALLBACK_IDS)

  useEffect(() => {
    fetch('/api/youtube')
      .then(r => r.json())
      .then(d => { if (d.videos?.length) setVideoIds(d.videos) })
      .catch(() => {})
  }, [])

  return (
    <>
      <SchemaMarkup data={homeSchema} />
      <Navbar />
      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  We Help Singapore SMEs Get More{' '}
                  <span className="text-indigo-600">Customers Online</span>
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  Website. Marketing. Leads. All handled — so you can focus on running your business.
                </p>
                <p className="text-gray-500 mb-8">
                  Founded by Shaminder after seeing too many SMEs get burned by big agencies. We&apos;re a boutique consultancy — no inflated fees, no endless waiting, just results.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
                  <a
                    href="https://calendly.com/shaminder_sg/letstalk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    <Calendar className="mr-2" size={20} />
                    Book a Free Strategy Call
                  </a>
                  <a
                    href="https://wa.me/6598137066"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-green-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    <MessageCircle className="mr-2" size={20} />
                    WhatsApp Me
                  </a>
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                  <span className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2" /> 48-Hour Turnaround</span>
                  <span className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2" /> PDPA Compliant</span>
                  <span className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2" /> Based in Singapore</span>
                </div>
              </div>
              <div className="flex justify-center pb-8">
                <div className="relative animate-float">
                  <div className="absolute top-4 left-4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl border-2 border-indigo-400/50 shadow-[0_0_30px_rgba(99,102,241,0.3)]"></div>
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.4),0_20px_40px_rgba(0,0,0,0.2)]">
                    <img src="/shaminder.jpg" alt="Shaminderjit Singh" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Shaminderjit Singh</p>
                    <p className="text-xs text-gray-500">Founder, shaminder.sg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Results Section */}
        <section id="results" className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Don&apos;t Take Our Word For It</h2>
            <p className="text-gray-600 text-center mb-12">See the before and after. Judge for yourself.</p>
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-8 md:p-12 border border-indigo-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full mb-4">Case Study</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4"><a href="https://susanbatikhouse.sg" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition">Susan Batik House</a></h3>
                  <p className="text-gray-600 mb-6">A 35-year-old heritage batik business needed a modern online presence that honored their craftsmanship while attracting new customers.</p>
                  <div className="space-y-3 mb-6">
                    <p className="text-gray-600"><strong className="text-gray-900">Before:</strong> Outdated website, no e-commerce, limited online reach</p>
                    <p className="text-gray-600"><strong className="text-gray-900">After:</strong> Luxury e-commerce site, professional brand presence, online sales enabled</p>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm"><p className="text-2xl font-bold text-indigo-600">16+</p><p className="text-sm text-gray-500">Collections</p></div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm"><p className="text-2xl font-bold text-indigo-600">48hrs</p><p className="text-sm text-gray-500">Delivered</p></div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm"><p className="text-2xl font-bold text-indigo-600">100%</p><p className="text-sm text-gray-500">Custom Built</p></div>
                  </div>
                  <a href="https://susanbatikhouse.sg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700">
                    Visit Live Site <ExternalLink className="ml-2" size={16} />
                  </a>
                </div>
                <BeforeAfterSlider
                  beforeSrc="/susanbatikhouse-before.png"
                  afterSrc="/susanbatikhouse-new.png"
                  beforeAlt="Susan Batik House - Before"
                  afterAlt="Susan Batik House - After"
                />
              </div>
            </div>
            <p className="text-center text-gray-500 mt-8">More case studies coming soon. Every project is treated with the same dedication.</p>
          </div>
        </section>

        {/* Shorts Section */}
        <section className="py-16 md:py-24 bg-gray-900 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">We Spin. We Build. We Film.</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We spin a random area and a random business type in Singapore. Then we find a real business without a website, build one for free, and film the entire process. Watch the latest builds.
              </p>
            </div>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
              {videoIds.map((id, i) => (
                <div key={i} className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-800 min-w-[70vw] sm:min-w-[55vw] md:min-w-[280px] flex-shrink-0 snap-center">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title={`YouTube Short ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ))}
            </div>
            <div className="mt-16 max-w-xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-xl text-white font-semibold mb-2">Want to skip the queue?</p>
                <p className="text-gray-400">
                  Submit your business and we&apos;ll build your website, film the entire process, publish it on our channel, and send you the video. No obligations.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const fd = new FormData(e.currentTarget)
                  const msg = `Hi Shaminder, I'd like you to build my business website and film it!%0A%0AName: ${fd.get('name')}%0APhone: ${fd.get('phone')}%0AEmail: ${fd.get('email')}%0ABusiness: ${fd.get('business')}%0AIndustry: ${fd.get('industry')}`
                  window.open(`https://wa.me/6598137066?text=${msg}`, '_blank')
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="name" required placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none" />
                  <input name="phone" required placeholder="Phone Number" type="tel" className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none" />
                </div>
                <input name="email" required placeholder="Email" type="email" className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="business" required placeholder="Business Name" className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none" />
                  <input name="industry" required placeholder="Industry (e.g. F&B, Retail)" className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none" />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-lg">
                  Submit Your Business
                </button>
              </form>
              <div className="text-center mt-6">
                <a href="https://www.youtube.com/@shaminder_sg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-gray-400 font-medium hover:text-indigo-400 transition">
                  <Play size={16} className="mr-2" /> Watch More Builds
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingTabs />

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Questions? Answered.</h2>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* Final CTA */}
        <CTASection />

        <Footer />
      </div>
      <WhatsAppFloat />
    </>
  )
}
