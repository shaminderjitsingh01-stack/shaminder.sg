import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, MessageCircle, CheckCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import FaqAccordion from '@/components/ui/FaqAccordion'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SchemaMarkup from '@/components/seo/SchemaMarkup'
import { industries, getIndustryBySlug } from '@/data/industries'

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = getIndustryBySlug(params.slug)
  if (!industry) return {}

  return {
    title: `${industry.title} — Singapore`,
    description: industry.description,
    alternates: { canonical: `https://shaminder.sg/industries/${industry.slug}` },
    openGraph: {
      title: `${industry.title} | Shaminder Singh`,
      description: industry.description,
      url: `https://shaminder.sg/industries/${industry.slug}`,
    },
  }
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug)
  if (!industry) notFound()

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: industry.title,
      description: industry.description,
      provider: { '@type': 'ProfessionalService', name: 'Shaminder Technologies', url: 'https://shaminder.sg' },
      areaServed: 'Singapore',
      url: `https://shaminder.sg/industries/${industry.slug}`,
    },
  ]

  return (
    <>
      <SchemaMarkup data={schema} />
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: industry.title.replace(' Websites', '') }]} />
            <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6">{industry.badge}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {industry.headline} <span className="text-yellow-300">{industry.headlineHighlight}</span>
            </h1>
            <p className="text-xl text-indigo-100 mb-8">{industry.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/6598137066" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">
                <MessageCircle className="mr-2" size={20} />
                WhatsApp Me
              </a>
              <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-400 transition">
                <Calendar className="mr-2" size={20} />
                Book a Free Call
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Your Business Needs a <span className="text-indigo-600">Modern Website</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {industry.features.map((f, i) => (
                <div key={i} className="bg-gray-50 p-3 sm:p-6 rounded-lg sm:rounded-xl border border-gray-100 hover:shadow-md transition">
                  <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">{f.emoji}</span>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24 bg-gray-50 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              What&apos;s <span className="text-indigo-600">Included</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {industry.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-lg">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-xl mx-auto">
            <div className="bg-white border-2 border-indigo-200 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{industry.title}</h2>
              <p className="text-4xl font-bold text-indigo-600 mb-2">{industry.price}</p>
              <p className="text-gray-500 text-sm mb-6">one-time</p>
              <p className="text-gray-600 text-sm mb-8">{industry.priceNote}</p>
              <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Get Started — Book a Free Call
              </a>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 md:py-24 bg-gray-50 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <FaqAccordion faqs={industry.faqs} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-indigo-600 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{industry.ctaTitle}</h2>
            <p className="text-xl text-indigo-100 mb-8">{industry.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/6598137066" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition">
                <MessageCircle className="mr-2" size={20} />
                WhatsApp Me
              </a>
              <a href="https://calendly.com/shaminder_sg/letstalk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-indigo-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-400 transition">
                <Calendar className="mr-2" size={20} />
                Book a Free Call
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <WhatsAppFloat />
    </>
  )
}
