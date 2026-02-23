'use client'

import { Calendar, MessageCircle, CheckCircle, ArrowRight, ExternalLink, Globe, TrendingUp, Search, Heart, Users, Play } from 'lucide-react'
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

export default function Home() {
  return (
    <>
      <SchemaMarkup data={homeSchema} />
      <Navbar />
      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
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
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a
                    href="https://calendly.com/shaminder_sg/letstalk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    <Calendar className="mr-2" size={20} />
                    Book a Free Strategy Call
                  </a>
                  <a
                    href="https://wa.me/6598137066"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
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
                  <div className="absolute top-4 left-4 w-64 h-64 md:w-80 md:h-80 rounded-2xl border-2 border-indigo-400/50 shadow-[0_0_30px_rgba(99,102,241,0.3)]"></div>
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.4),0_20px_40px_rgba(0,0,0,0.2)]">
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

        {/* Problem Section */}
        <section className="py-16 md:py-24 bg-gray-900 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Sound Familiar?</h2>
            <p className="text-gray-400 text-center mb-12">Things we hear from SME owners every week:</p>
            <div className="space-y-6">
              {[
                "I know I need to be online, but I don't know where to start.",
                "I paid an agency thousands and got nothing but excuses.",
                "My website looks outdated and I'm embarrassed to share it.",
                'I post on social media but nobody enquires.',
                "I don't have time to figure out marketing — I have a business to run.",
              ].map((pain, i) => (
                <div key={i} className="border-l-4 border-indigo-500 pl-6 py-2">
                  <p className="text-base sm:text-xl text-gray-300 italic">&ldquo;{pain}&rdquo;</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-lg text-gray-400 mb-2">
                You&apos;re not alone. <span className="text-white font-medium">7 out of 10</span> Singapore SMEs say the same thing.
              </p>
              <p className="text-xl text-indigo-400 font-medium">The good news? It doesn&apos;t have to be this hard.</p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="services" className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">What We Do For You</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              One system. One team. One monthly fee. Everything working together to grow your business.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <Search className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Get Found Online</h3>
                <p className="text-sm text-indigo-600 font-medium mb-3">Website + SEO + Google Business</p>
                <p className="text-gray-600">A professional website that ranks on Google and converts visitors into customers.</p>
                <div className="mt-4 pt-4 border-t border-indigo-100">
                  <span className="inline-flex items-center text-sm text-indigo-600 font-medium"><CheckCircle size={14} className="mr-2" /> 48-hour delivery</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <Heart className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Top of Mind</h3>
                <p className="text-sm text-orange-600 font-medium mb-3">Social Media + Email + Content</p>
                <p className="text-gray-600">Consistent content that keeps your brand visible without you lifting a finger.</p>
                <div className="mt-4 pt-4 border-t border-orange-100">
                  <span className="inline-flex items-center text-sm text-orange-600 font-medium"><CheckCircle size={14} className="mr-2" /> 12+ posts monthly</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <Users className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fill Your Calendar</h3>
                <p className="text-sm text-green-600 font-medium mb-3">Leads + CRM + Automation</p>
                <p className="text-gray-600">Leads that turn into revenue with automated follow-ups and booking systems.</p>
                <div className="mt-4 pt-4 border-t border-green-100">
                  <span className="inline-flex items-center text-sm text-green-600 font-medium"><CheckCircle size={14} className="mr-2" /> Hands-off system</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-gray-50 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Simple Process. Real Results.</h2>
            <p className="text-gray-600 text-center mb-12">No complicated onboarding. No endless meetings.</p>
            <div className="relative">
              <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-indigo-200"></div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Calendar, title: 'We Talk', desc: 'Book a free call. Share your goals. Get honest advice — no sales pitch.' },
                  { icon: Globe, title: 'We Build', desc: 'We create your website and marketing. You focus on your business.' },
                  { icon: TrendingUp, title: 'You Grow', desc: 'Leads come in. Customers find you. We keep optimising.' },
                ].map((item, i) => (
                  <div key={i} className="relative text-center">
                    <div className="w-24 h-24 bg-white rounded-full border-4 border-indigo-600 flex items-center justify-center mx-auto mb-6 relative z-10">
                      <item.icon className="text-indigo-600" size={36} />
                    </div>
                    <span className="inline-block bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-3">Step {i + 1}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-12">
              <a
                href="https://calendly.com/shaminder_sg/letstalk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition text-lg"
              >
                Let&apos;s Start With a Call
                <ArrowRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Results That Speak</h2>
            <p className="text-gray-600 text-center mb-12">Real work. Real outcomes.</p>
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-8 md:p-12 border border-indigo-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full mb-4">Case Study</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Susan Batik House</h3>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Behind the Scenes</h2>
              <p className="text-gray-400">Quick tips and real talk from our YouTube channel</p>
            </div>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none md:pb-0">
              {['ZLMRVyhKzRM', 'VZyfDEVEDTE', 'SLmryJ3Wl6I'].map((id, i) => (
                <div key={i} className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-800 min-w-[70vw] sm:min-w-[55vw] md:min-w-0 snap-center">
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
            <div className="text-center mt-8">
              <a href="https://www.youtube.com/@shaminder_sg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition">
                <Play size={16} className="mr-2" /> Watch more on YouTube
              </a>
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
