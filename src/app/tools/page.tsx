import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, FileText, QrCode, Mail, MessageSquare, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Free Business Tools',
  description: 'Free tools for Singapore businesses — GST calculator, PDF merge/split, QR code generator, email signature builder, and WhatsApp link generator.',
  alternates: { canonical: 'https://shaminder.sg/tools' },
}

const tools = [
  { slug: 'gst-calculator', title: 'GST Calculator', desc: 'Calculate Singapore 9% GST instantly. Add or remove GST from any amount.', icon: Calculator, color: 'bg-green-50 border-green-100 text-green-600' },
  { slug: 'pdf-merge-split', title: 'PDF Merge & Split', desc: 'Merge multiple PDFs into one or split a PDF into separate pages. Free, private, no upload.', icon: FileText, color: 'bg-orange-50 border-orange-100 text-orange-600' },
  { slug: 'qr-generator', title: 'QR Code Generator', desc: 'Generate custom QR codes for URLs, WhatsApp, text, and more. Download as PNG.', icon: QrCode, color: 'bg-indigo-50 border-indigo-100 text-indigo-600' },
  { slug: 'email-signature', title: 'Email Signature Generator', desc: 'Create professional email signatures with your branding. Copy HTML or preview.', icon: Mail, color: 'bg-purple-50 border-purple-100 text-purple-600' },
  { slug: 'whatsapp-link-generator', title: 'WhatsApp Link Generator', desc: 'Create click-to-chat WhatsApp links with pre-filled messages. Perfect for websites and ads.', icon: MessageSquare, color: 'bg-green-50 border-green-100 text-green-600' },
]

export default function ToolsIndex() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Dark header */}
        <section className="bg-black py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0" style={{ opacity: 0.05, backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="max-w-4xl mx-auto relative">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Free Tools' }]} />
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Free Business Tools</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">Handy tools to help run your business. All free, no sign-up required.</p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

          <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className={`p-4 sm:p-6 rounded-xl border hover:shadow-lg transition group ${tool.color.split(' ').slice(0, 2).join(' ')}`}
              >
                <tool.icon size={32} className={`mb-4 ${tool.color.split(' ')[2]}`} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tool.desc}</p>
                <span className="inline-flex items-center text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                  Use Tool <ArrowRight size={14} className="ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
      <WhatsAppFloat />
    </>
  )
}
