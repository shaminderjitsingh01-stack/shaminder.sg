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
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

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
    image: 'https://shaminder.sg/shaminder.png',
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
  useScrollAnimations()

  useEffect(() => {
    fetch('/api/youtube')
      .then(r => r.json())
      .then(d => { if (d.videos?.length) setVideoIds(d.videos) })
      .catch(() => {})
  }, [])

  return (
    <>
      <SchemaMarkup data={homeSchema} />
      <div className="bg-white">
        {/* Preloader — desktop only */}
        <div className="hidden md:block">
          <div data-preloader-track style={{ height: '600vh', background: '#000' }} />
          <div data-preloader className="fixed inset-0 bg-black flex items-center justify-center z-[100]">
            <video
              data-preloader-video
              src="/intro.mp4"
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              style={{ willChange: 'transform, filter' }}
            />
            <div
              data-preloader-flash
              className="absolute inset-0 bg-white opacity-0 pointer-events-none"
              style={{ willChange: 'opacity' }}
            />
            <div className="absolute bottom-10 left-[43%] -translate-x-1/2 text-white text-lg md:text-xl font-bold tracking-widest uppercase animate-bounce">
              Scroll to enter
            </div>
          </div>
        </div>

        <div data-navbar-wrapper className="opacity-100 md:opacity-0 fixed top-0 left-0 right-0 z-[60]" style={{ overflow: 'hidden', height: '64px' }}>
          <Navbar />
        </div>
        <div data-slides-container className="fixed inset-0 overflow-hidden z-40 pointer-events-none">

          {/* Slide 1: Hero — Dark Spotlight */}
          <div data-slide className="relative overflow-hidden bg-black">
            {/* Spotlight on photo area */}
            <div className="absolute top-0 right-0 sm:right-[15%] w-full sm:w-[500px] h-full" style={{
              background: 'conic-gradient(from 0deg at 50% -5%, transparent 35%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.06) 49%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 51%, rgba(255,255,255,0.02) 55%, transparent 65%)',
            }} />
            {/* Indigo ambient glow behind photo */}
            <div className="absolute top-[20%] right-0 sm:right-[10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px]" style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)',
            }} />
            {/* Subtle grid */}
            <div className="absolute inset-0" style={{ opacity: 0.04, backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            {/* Floating particles — hidden on mobile */}
            <div className="hidden sm:block">
              <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ opacity: 0.4, animation: 'float1 7s ease-in-out infinite' }} />
              <div className="absolute top-[40%] left-[8%] w-1 h-1 rounded-full bg-white" style={{ opacity: 0.3, animation: 'float2 9s ease-in-out infinite 1s' }} />
              <div className="absolute top-[70%] left-[30%] w-2 h-2 rounded-full bg-indigo-500" style={{ opacity: 0.25, animation: 'float3 8s ease-in-out infinite 2s' }} />
              <div className="absolute top-[25%] right-[35%] w-1 h-1 rounded-full bg-indigo-300" style={{ opacity: 0.35, animation: 'float1 10s ease-in-out infinite 3s' }} />
              <div className="absolute top-[80%] right-[25%] w-1.5 h-1.5 rounded-full bg-white" style={{ opacity: 0.2, animation: 'float2 6s ease-in-out infinite 4s' }} />
            </div>

            <div className="relative h-full overflow-y-auto scrollbar-hide px-4 sm:px-6 pt-16 pb-4 flex flex-col justify-center">
              <div className="max-w-6xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
                  <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                      We Help Singapore SMEs Get More{' '}
                      <span className="text-indigo-400" style={{ textShadow: '0 0 30px rgba(99,102,241,0.4)' }}>Customers Online</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4">
                      Website. Marketing. Leads. All handled — so you can focus on running your business.
                    </p>
                    <p className="text-gray-500 mb-4 text-sm">
                      Founded by Shaminder after seeing too many SMEs get burned by big agencies. We&apos;re a boutique consultancy — no inflated fees, no endless waiting, just results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
                      <a
                        href="https://calendly.com/shaminder_sg/letstalk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
                        style={{ boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
                      >
                        <Calendar className="mr-2" size={20} />
                        Book a Free Strategy Call
                      </a>
                      <a
                        href="https://wa.me/6598137066"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center border border-green-500/50 text-green-400 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-500/10 transition"
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
                      {/* Glow ring behind photo */}
                      <div className="absolute -inset-4 rounded-2xl" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', filter: 'blur(20px)' }} />
                      <div className="absolute top-4 left-4 w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl border-2 border-indigo-500/40 shadow-[0_0_40px_rgba(99,102,241,0.3)]"></div>
                      <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-[0_0_60px_rgba(99,102,241,0.4),0_20px_40px_rgba(0,0,0,0.4)]">
                        <img src="/shaminder.png" alt="Shaminderjit Singh" className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                        <p className="text-sm font-medium text-white">Shaminderjit Singh</p>
                        <p className="text-xs text-gray-400">Founder, shaminder.sg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2: Case Study — Susan Batik House */}
          <div data-slide className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #2d1810 30%, #1a1235 70%, #0f0a1e 100%)' }}>
            {/* Batik kawung pattern overlay */}
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='30' rx='12' ry='18' fill='none' stroke='%23d4a574' stroke-width='1'/%3E%3Cellipse cx='30' cy='30' rx='18' ry='12' fill='none' stroke='%23d4a574' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='4' fill='%23d4a574'/%3E%3Ccircle cx='30' cy='12' r='2' fill='%23d4a574'/%3E%3Ccircle cx='30' cy='48' r='2' fill='%23d4a574'/%3E%3Ccircle cx='12' cy='30' r='2' fill='%23d4a574'/%3E%3Ccircle cx='48' cy='30' r='2' fill='%23d4a574'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }} />
            {/* Gold corner ornaments — hidden on mobile */}
            <div className="hidden sm:block">
              <div className="absolute top-20 left-4 w-24 h-24 border-t-2 border-l-2 border-amber-600/30 rounded-tl-lg" />
              <div className="absolute top-20 right-4 w-24 h-24 border-t-2 border-r-2 border-amber-600/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-24 h-24 border-b-2 border-l-2 border-amber-600/30 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-24 h-24 border-b-2 border-r-2 border-amber-600/30 rounded-br-lg" />
            </div>

            {/* Fixed batik elements — full opacity, hidden on mobile */}
            <svg className="hidden sm:block absolute top-[15%] left-[6%] w-20 h-20" viewBox="0 0 60 60">
              <ellipse cx="30" cy="30" rx="12" ry="22" fill="none" stroke="#d4a574" strokeWidth="2"/>
              <ellipse cx="30" cy="30" rx="22" ry="12" fill="none" stroke="#d4a574" strokeWidth="2"/>
              <circle cx="30" cy="30" r="5" fill="#d4a574" fillOpacity="0.6"/>
            </svg>
            <svg className="hidden sm:block absolute bottom-[18%] right-[5%] w-24 h-24" viewBox="0 0 60 60">
              <ellipse cx="30" cy="30" rx="14" ry="24" fill="none" stroke="#c9956b" strokeWidth="1.5"/>
              <ellipse cx="30" cy="30" rx="24" ry="14" fill="none" stroke="#c9956b" strokeWidth="1.5"/>
              <circle cx="30" cy="30" r="6" fill="#c9956b" fillOpacity="0.5"/>
              <circle cx="30" cy="6" r="3" fill="#c9956b" fillOpacity="0.6"/>
              <circle cx="30" cy="54" r="3" fill="#c9956b" fillOpacity="0.6"/>
              <circle cx="6" cy="30" r="3" fill="#c9956b" fillOpacity="0.6"/>
              <circle cx="54" cy="30" r="3" fill="#c9956b" fillOpacity="0.6"/>
            </svg>
            <svg className="hidden sm:block absolute top-[28%] right-[10%] w-28 h-14" viewBox="0 0 120 40">
              <path d="M0,20 Q15,0 30,20 Q45,40 60,20 Q75,0 90,20 Q105,40 120,20" fill="none" stroke="#d4a574" strokeWidth="2.5"/>
              <path d="M0,28 Q15,8 30,28 Q45,48 60,28 Q75,8 90,28 Q105,48 120,28" fill="none" stroke="#d4a574" strokeWidth="1.5"/>
            </svg>
            <svg className="hidden md:block absolute top-[55%] left-[4%] w-32 h-24" viewBox="0 0 140 80">
              <path d="M10,60 Q10,20 40,20 Q50,5 70,15 Q85,0 105,15 Q130,10 130,40 Q135,60 110,60 Z" fill="none" stroke="#8b7355" strokeWidth="2.5"/>
              <path d="M20,55 Q20,28 45,28 Q53,15 70,22 Q82,10 100,22 Q120,18 120,42 Q124,55 105,55 Z" fill="none" stroke="#8b7355" strokeWidth="2"/>
              <path d="M30,50 Q30,35 50,35 Q56,25 70,30 Q80,22 95,30 Q110,27 110,44 Q112,50 100,50 Z" fill="#8b7355" fillOpacity="0.25"/>
            </svg>
            <svg className="hidden sm:block absolute bottom-[10%] left-[18%] w-14 h-14" viewBox="0 0 40 40">
              <ellipse cx="20" cy="20" rx="8" ry="15" fill="none" stroke="#d4a574" strokeWidth="1.5"/>
              <ellipse cx="20" cy="20" rx="15" ry="8" fill="none" stroke="#d4a574" strokeWidth="1.5"/>
              <circle cx="20" cy="20" r="3" fill="#d4a574" fillOpacity="0.7"/>
            </svg>
            <svg className="hidden sm:block absolute top-[72%] right-[15%] w-18 h-18" viewBox="0 0 60 60">
              <ellipse cx="30" cy="30" rx="10" ry="20" fill="none" stroke="#b8956a" strokeWidth="2"/>
              <ellipse cx="30" cy="30" rx="20" ry="10" fill="none" stroke="#b8956a" strokeWidth="2"/>
              <circle cx="30" cy="30" r="4" fill="#b8956a" fillOpacity="0.5"/>
            </svg>

            <div className="relative h-full overflow-y-auto scrollbar-hide px-4 sm:px-6 pt-16 pb-4 flex flex-col justify-center">
              <div className="max-w-6xl mx-auto w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-1">Don&apos;t Take Our Word For It</h2>
                <p className="text-amber-300/70 text-center mb-4 text-sm">See the before and after. Judge for yourself.</p>
                {/* Batik-inspired divider */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/50" />
                  <svg width="20" height="20" viewBox="0 0 20 20" className="text-amber-600/60">
                    <circle cx="10" cy="10" r="3" fill="currentColor" />
                    <ellipse cx="10" cy="10" rx="6" ry="9" fill="none" stroke="currentColor" strokeWidth="1" />
                    <ellipse cx="10" cy="10" rx="9" ry="6" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/50" />
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-amber-700/20">
                  <div className="grid md:grid-cols-2 gap-4 items-center">
                    <div>
                      <span className="inline-block bg-amber-900/40 text-amber-300 text-sm font-medium px-3 py-1 rounded-full mb-3 border border-amber-700/30">Case Study</span>
                      <h3 className="text-xl font-bold text-white mb-2"><a href="https://susanbatikhouse.sg" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">Susan Batik House</a></h3>
                      <p className="text-gray-300 mb-2 text-xs">A 35-year-old heritage batik business needed a modern online presence that honored their craftsmanship while attracting new customers.</p>
                      <div className="space-y-1 mb-3">
                        <p className="text-gray-300 text-xs"><strong className="text-amber-200">Before:</strong> Outdated website, no e-commerce, limited online reach</p>
                        <p className="text-gray-300 text-xs"><strong className="text-amber-200">After:</strong> Luxury e-commerce site, professional brand presence, online sales enabled</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="bg-amber-900/30 border border-amber-700/30 px-2 py-1 rounded-lg"><p className="text-lg font-bold text-amber-300">16+</p><p className="text-[10px] text-amber-200/60">Collections</p></div>
                        <div className="bg-amber-900/30 border border-amber-700/30 px-2 py-1 rounded-lg"><p className="text-lg font-bold text-amber-300">48hrs</p><p className="text-[10px] text-amber-200/60">Delivered</p></div>
                        <div className="bg-amber-900/30 border border-amber-700/30 px-2 py-1 rounded-lg"><p className="text-lg font-bold text-amber-300">100%</p><p className="text-[10px] text-amber-200/60">Custom Built</p></div>
                      </div>
                      <a href="https://susanbatikhouse.sg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-amber-400 font-medium hover:text-amber-300 text-sm">
                        Visit Live Site <ExternalLink className="ml-2" size={14} />
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
                <p className="text-center text-amber-200/40 mt-3 text-xs">More case studies coming soon. Every project is treated with the same dedication.</p>
                <div className="text-center mt-4">
                  <a href="https://wa.me/6598137066?text=Hi%20Shaminder,%20I%20saw%20the%20Susan%20Batik%20House%20case%20study.%20I%27d%20like%20something%20similar%20for%20my%20business" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600/30 transition">
                    <MessageCircle size={16} /> Want something like this? Let&apos;s talk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: Videos */}
          <div data-slide className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a0f1a 0%, #0d1b2a 40%, #1a1a2e 70%, #0a0f1a 100%)' }}>
            {/* Singapore map outline */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.14 }}>
              <path d="M300,400 Q320,350 380,340 Q420,330 460,350 Q500,330 540,340 Q580,350 620,340 Q660,330 700,350 Q740,370 780,360 Q820,350 860,370 Q900,390 880,420 Q860,450 820,460 Q780,470 740,460 Q700,450 660,460 Q620,470 580,460 Q540,450 500,460 Q460,470 420,460 Q380,450 340,440 Q310,430 300,400 Z" fill="none" stroke="#4f8fdf" strokeWidth="2"/>
              <circle cx="500" cy="390" r="3" fill="#4f8fdf"/>
              <circle cx="600" cy="370" r="3" fill="#4f8fdf"/>
              <circle cx="700" cy="380" r="3" fill="#4f8fdf"/>
              <circle cx="450" cy="410" r="3" fill="#4f8fdf"/>
              <circle cx="550" cy="400" r="3" fill="#4f8fdf"/>
              <circle cx="650" cy="390" r="3" fill="#4f8fdf"/>
              <circle cx="750" cy="400" r="3" fill="#4f8fdf"/>
            </svg>
            {/* Grid overlay */}
            <div className="absolute inset-0" style={{ opacity: 0.11, backgroundImage: 'linear-gradient(rgba(79,143,223,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(79,143,223,0.4) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

            {/* Floating map pins */}
            <svg className="absolute top-[18%] left-[10%] w-12 h-16" style={{ opacity: 0.7, animation: 'float1 8s ease-in-out infinite' }} viewBox="0 0 24 32">
              <path d="M12,0 C5.4,0 0,5.4 0,12 C0,21 12,32 12,32 S24,21 24,12 C24,5.4 18.6,0 12,0 Z" fill="#ef4444"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>
            <svg className="absolute top-[60%] left-[18%] w-10 h-14" style={{ opacity: 0.56, animation: 'float2 10s ease-in-out infinite 1s' }} viewBox="0 0 24 32">
              <path d="M12,0 C5.4,0 0,5.4 0,12 C0,21 12,32 12,32 S24,21 24,12 C24,5.4 18.6,0 12,0 Z" fill="#f59e0b"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>
            <svg className="absolute top-[25%] right-[8%] w-11 h-14" style={{ opacity: 0.63, animation: 'float3 9s ease-in-out infinite 2s' }} viewBox="0 0 24 32">
              <path d="M12,0 C5.4,0 0,5.4 0,12 C0,21 12,32 12,32 S24,21 24,12 C24,5.4 18.6,0 12,0 Z" fill="#22c55e"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>
            <svg className="absolute bottom-[40%] right-[20%] w-9 h-12" style={{ opacity: 0.49, animation: 'float1 11s ease-in-out infinite 3s' }} viewBox="0 0 24 32">
              <path d="M12,0 C5.4,0 0,5.4 0,12 C0,21 12,32 12,32 S24,21 24,12 C24,5.4 18.6,0 12,0 Z" fill="#6366f1"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>

            {/* Floating film frames */}
            <svg className="absolute top-[10%] right-[12%] w-28 h-22" style={{ opacity: 0.35, animation: 'float2 14s ease-in-out infinite' }} viewBox="0 0 100 80">
              <rect x="5" y="5" width="90" height="70" rx="4" fill="none" stroke="#c4b5fd" strokeWidth="2.5"/>
              <rect x="5" y="5" width="90" height="12" fill="#c4b5fd" fillOpacity="0.25"/>
              <rect x="5" y="63" width="90" height="12" fill="#c4b5fd" fillOpacity="0.25"/>
              <rect x="10" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="22" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="34" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="46" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="58" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="70" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="82" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
            </svg>
            <svg className="absolute bottom-[12%] left-[5%] w-24 h-20" style={{ opacity: 0.28, animation: 'float1 16s ease-in-out infinite 3s' }} viewBox="0 0 100 80">
              <rect x="5" y="5" width="90" height="70" rx="4" fill="none" stroke="#c4b5fd" strokeWidth="2.5"/>
              <rect x="5" y="5" width="90" height="12" fill="#c4b5fd" fillOpacity="0.25"/>
              <rect x="5" y="63" width="90" height="12" fill="#c4b5fd" fillOpacity="0.25"/>
              <rect x="10" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="22" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="34" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="46" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
            </svg>
            <svg className="absolute bottom-[28%] right-[4%] w-20 h-16" style={{ opacity: 0.25, animation: 'float3 12s ease-in-out infinite 5s' }} viewBox="0 0 100 80">
              <rect x="5" y="5" width="90" height="70" rx="4" fill="none" stroke="#c4b5fd" strokeWidth="2.5"/>
              <rect x="5" y="5" width="90" height="12" fill="#c4b5fd" fillOpacity="0.25"/>
              <rect x="5" y="63" width="90" height="12" fill="#c4b5fd" fillOpacity="0.25"/>
              <rect x="10" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="22" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
              <rect x="34" y="7" width="8" height="8" rx="1" fill="#c4b5fd" fillOpacity="0.5"/>
            </svg>

            {/* Floating clapperboard */}
            <svg className="absolute top-[42%] left-[3%] w-16 h-16" style={{ opacity: 0.42, animation: 'float2 11s ease-in-out infinite 4s' }} viewBox="0 0 48 48">
              <rect x="4" y="16" width="40" height="28" rx="3" fill="#e879f9" fillOpacity="0.15" stroke="#e879f9" strokeWidth="2"/>
              <path d="M4,16 L12,4 L20,16" fill="#e879f9" fillOpacity="0.1" stroke="#e879f9" strokeWidth="2"/>
              <path d="M16,16 L24,4 L32,16" fill="#e879f9" fillOpacity="0.1" stroke="#e879f9" strokeWidth="2"/>
              <path d="M28,16 L36,4 L44,16" fill="#e879f9" fillOpacity="0.1" stroke="#e879f9" strokeWidth="2"/>
            </svg>
            {/* Second clapperboard — top right area */}
            <svg className="absolute top-[55%] right-[10%] w-14 h-14" style={{ opacity: 0.31, animation: 'float3 13s ease-in-out infinite 6s' }} viewBox="0 0 48 48">
              <rect x="4" y="16" width="40" height="28" rx="3" fill="#e879f9" fillOpacity="0.1" stroke="#e879f9" strokeWidth="2"/>
              <path d="M4,16 L12,4 L20,16" fill="#e879f9" fillOpacity="0.08" stroke="#e879f9" strokeWidth="1.5"/>
              <path d="M16,16 L24,4 L32,16" fill="#e879f9" fillOpacity="0.08" stroke="#e879f9" strokeWidth="1.5"/>
              <path d="M28,16 L36,4 L44,16" fill="#e879f9" fillOpacity="0.08" stroke="#e879f9" strokeWidth="1.5"/>
            </svg>

            {/* Connecting lines between pins */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="12" y1="20" x2="50" y2="35" stroke="#4f8fdf" strokeWidth="0.3" strokeDasharray="2,2"/>
              <line x1="50" y1="35" x2="88" y2="28" stroke="#4f8fdf" strokeWidth="0.3" strokeDasharray="2,2"/>
              <line x1="20" y1="62" x2="50" y2="35" stroke="#4f8fdf" strokeWidth="0.3" strokeDasharray="2,2"/>
            </svg>

            <div className="relative h-full overflow-y-auto scrollbar-hide px-4 sm:px-6 pt-16 pb-4 flex flex-col justify-center">
              <div className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-4 max-w-2xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">We Spin. We Build. We Film.</h2>
                  <p className="text-gray-400">
                    We spin a random area and a random business type in Singapore. Then we find a real business without a website, build one for free, and film the entire process. Watch the latest builds.
                  </p>
                </div>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                  {videoIds.map((id, i) => (
                    <div key={i} className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-800 min-w-[55vw] sm:min-w-[40vw] md:min-w-[220px] flex-shrink-0 snap-center">
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
                <div className="text-center mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://www.youtube.com/@shaminder_sg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-gray-400 font-medium hover:text-indigo-400 transition text-sm">
                    <Play size={16} className="mr-2" /> Watch More Builds
                  </a>
                  <a href="https://wa.me/6598137066?text=Hi%20Shaminder,%20I%20saw%20your%20build%20videos.%20Can%20you%20build%20one%20for%20my%20business%3F" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600/30 transition">
                    <MessageCircle size={16} /> Chat with us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4: Submit Form — SHOWSTOPPER */}
          <div data-slide className="relative overflow-hidden bg-black">
            {/* Spotlight beam from above */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full sm:w-[600px] h-full" style={{
              background: 'conic-gradient(from 0deg at 50% -5%, transparent 35%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.08) 49%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 51%, rgba(255,255,255,0.03) 55%, transparent 65%)',
            }} />
            {/* Secondary wider ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full sm:w-[900px] h-full" style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.08) 0%, transparent 60%)',
            }} />
            {/* Floor glow — where spotlight hits */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full sm:w-[500px] h-32" style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.06) 0%, transparent 70%)',
            }} />

            {/* Giant "FREE" watermark behind everything */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
              <span className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[18rem] font-black tracking-widest" style={{
                color: 'transparent',
                WebkitTextStroke: '2px rgba(99,102,241,0.08)',
                lineHeight: 1,
              }}>FREE?</span>
            </div>

            {/* Floating sparkle particles — hidden on mobile */}
            <div className="hidden sm:block">
              <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-white" style={{ opacity: 0.3, animation: 'float1 6s ease-in-out infinite' }} />
              <div className="absolute top-[35%] right-[20%] w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ opacity: 0.4, animation: 'float2 8s ease-in-out infinite 1s' }} />
              <div className="absolute top-[60%] left-[25%] w-1 h-1 rounded-full bg-white" style={{ opacity: 0.25, animation: 'float3 7s ease-in-out infinite 2s' }} />
              <div className="absolute top-[15%] right-[30%] w-1.5 h-1.5 rounded-full bg-indigo-300" style={{ opacity: 0.35, animation: 'float1 9s ease-in-out infinite 3s' }} />
              <div className="absolute top-[70%] right-[15%] w-2 h-2 rounded-full bg-white" style={{ opacity: 0.2, animation: 'float2 5s ease-in-out infinite 4s' }} />
              <div className="absolute top-[45%] left-[8%] w-1 h-1 rounded-full bg-indigo-400" style={{ opacity: 0.3, animation: 'float3 10s ease-in-out infinite 0.5s' }} />
              <div className="absolute top-[80%] left-[40%] w-1.5 h-1.5 rounded-full bg-white" style={{ opacity: 0.15, animation: 'float1 7s ease-in-out infinite 5s' }} />
              <div className="absolute top-[25%] left-[50%] w-1 h-1 rounded-full bg-indigo-300" style={{ opacity: 0.2, animation: 'float2 6s ease-in-out infinite 2.5s' }} />
            </div>

            <div className="relative h-full overflow-y-auto scrollbar-hide px-4 sm:px-6 pt-16 pb-4 flex flex-col justify-center">
              <div className="max-w-xl mx-auto w-full">
                <div className="text-center mb-6">
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-indigo-400 mb-2" style={{ textShadow: '0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.3)' }}>FREE?</p>
                  <p className="text-base sm:text-lg md:text-2xl text-white font-bold mb-3">We&apos;ll build it. We&apos;ll film it. You keep everything.</p>
                  <p className="text-gray-400 max-w-md mx-auto text-sm">
                    Submit your business details and we&apos;ll create a free prototype of your website, film the entire process, and send you the video and showcase the prototype. No cost, no obligations.
                  </p>
                </div>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const btn = form.querySelector('button') as HTMLButtonElement
                    const fd = new FormData(form)
                    btn.disabled = true
                    btn.textContent = 'Submitting...'
                    try {
                      const res = await fetch('/api/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: fd.get('name'),
                          phone: fd.get('phone'),
                          email: fd.get('email'),
                          business: fd.get('business'),
                          industry: fd.get('industry'),
                        }),
                      })
                      if (res.ok) {
                        form.reset()
                        btn.innerHTML = '<span style="color:white;font-weight:bold">Submitted!</span> <span style="color:white">We will get back to you shortly!</span>'
                        btn.className = btn.className.replace('bg-indigo-600', 'bg-green-600').replace('hover:bg-indigo-500', 'hover:bg-green-500')
                        setTimeout(() => {
                          btn.textContent = 'Submit Your Business'
                          btn.className = btn.className.replace('bg-green-600', 'bg-indigo-600').replace('hover:bg-green-500', 'hover:bg-indigo-500')
                          btn.disabled = false
                        }, 6000)
                      } else {
                        btn.textContent = 'Something went wrong — try again'
                        btn.disabled = false
                        setTimeout(() => { btn.textContent = 'Submit Your Business' }, 3000)
                      }
                    } catch {
                      btn.textContent = 'Something went wrong — try again'
                      btn.disabled = false
                      setTimeout(() => { btn.textContent = 'Submit Your Business' }, 3000)
                    }
                  }}
                  className="space-y-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input name="name" required placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
                    <input name="phone" required placeholder="Phone Number" type="tel" className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
                  </div>
                  <input name="email" required placeholder="Email" type="email" className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input name="business" required placeholder="Business Name" className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
                    <input name="industry" required placeholder="Industry (e.g. F&B, Retail)" className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white px-6 py-3.5 rounded-lg font-bold hover:bg-indigo-500 transition text-lg disabled:opacity-50" style={{ boxShadow: '0 0 30px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.2)' }}>
                    Submit Your Business
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Slide 5: Pricing */}
          <div data-slide className="bg-black">
            <div className="h-full overflow-y-auto scrollbar-hide pt-20 pb-4">
              <div className="w-full">
                <PricingTabs />
              </div>
            </div>
          </div>

          {/* Slide 6: FAQ + Footer */}
          <div data-slide className="bg-gray-950">
            <div className="h-full overflow-y-auto scrollbar-hide px-4 sm:px-6 pt-20 pb-0">
              <div className="max-w-3xl mx-auto w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">Everything You Need to Know</h2>
                <FaqAccordion faqs={faqs} />
                <div className="text-center mt-6">
                  <p className="text-gray-500 text-sm mb-3">Still have questions?</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href="https://wa.me/6598137066?text=Hi%20Shaminder,%20I%20have%20a%20question%20about%20your%20services" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-500 transition">
                      <MessageCircle size={16} /> WhatsApp Us
                    </a>
                    <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-500 transition">
                      <Calendar size={16} /> Book a Free Call
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Footer />
              </div>
            </div>
          </div>

        </div>
      </div>
      <WhatsAppFloat />
    </>
  )
}
