import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import CTASection from '@/components/ui/CTASection'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { industries } from '@/data/industries'

export const metadata: Metadata = {
  title: 'Industries We Serve — Websites for Every Business',
  description: 'Professional websites designed for 39+ industries in Singapore. From dental clinics to restaurants, we build industry-specific websites that convert.',
  alternates: { canonical: 'https://shaminder.sg/industries' },
}

export default function IndustriesIndex() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Industries' }]} />

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Websites for Every Industry</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We build industry-specific websites that speak your customers&apos; language. Find your industry below.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 p-4 rounded-xl transition group"
              >
                <p className="text-2xl mb-2">{industry.features[0]?.emoji || '🏢'}</p>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{industry.title.replace(' Websites', '')}</h3>
                <span className="inline-flex items-center text-xs text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition">
                  View <ArrowRight size={12} className="ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <CTASection />
        <Footer />
      </div>
      <WhatsAppFloat />
    </>
  )
}
