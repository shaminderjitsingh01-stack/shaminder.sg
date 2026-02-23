'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Menu,
  X,
  ChevronDown,
  Zap,
} from 'lucide-react'

const tools = [
  { slug: 'gst-calculator', title: 'GST Calculator', desc: 'Singapore 9% GST' },
  { slug: 'pdf-merge-split', title: 'PDF Tools', desc: 'Merge & split PDFs' },
  { slug: 'qr-generator', title: 'QR Code Generator', desc: 'Custom QR with logo' },
  { slug: 'email-signature', title: 'Email Signature', desc: 'Professional signatures' },
  { slug: 'whatsapp-link-generator', title: 'WhatsApp Link', desc: 'Click-to-chat links' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Zap size={24} className="text-indigo-600" fill="currentColor" />
              Shaminder
            </Link>

            {/* Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/#packages" className="text-gray-600 hover:text-gray-900 transition text-sm font-medium">Pricing</Link>

              <Link href="/industries" className="text-gray-600 hover:text-gray-900 transition text-sm font-medium">Industries</Link>

              {/* Tools Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition text-sm font-medium">
                  Tools <ChevronDown size={14} />
                </button>
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-xl p-4 w-64">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                      <span className="text-sm font-semibold text-gray-900">Free Tools</span>
                      <Link href="/tools" className="text-xs text-indigo-600 hover:underline">View All →</Link>
                    </div>
                    <div className="space-y-1">
                      {tools.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/tools/${t.slug}`}
                          className="block p-2.5 rounded-lg hover:bg-gray-50 transition"
                        >
                          <p className="text-sm font-medium text-gray-900">{t.title}</p>
                          <p className="text-xs text-gray-500">{t.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition text-sm font-medium">Blog</Link>

              <a
                href="https://calendly.com/shaminder_sg/letstalk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                Book a Call
              </a>
            </div>

            {/* Mobile Toggle */}
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1 px-4">
              <Link href="/#packages" className="py-3 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Pricing</Link>

              <Link href="/industries" className="py-3 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Industries</Link>

              {/* Tools Accordion */}
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="flex items-center justify-between py-3 text-gray-700 font-medium"
              >
                Free Tools <ChevronDown size={16} className={`transition ${mobileToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileToolsOpen && (
                <div className="space-y-1 pb-3">
                  {tools.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className="block text-sm text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t.title}
                    </Link>
                  ))}
                  <Link
                    href="/tools"
                    className="block text-sm text-indigo-600 font-medium p-2 text-center bg-indigo-50 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    View All Tools
                  </Link>
                </div>
              )}

              <Link href="/blog" className="py-3 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Blog</Link>

              <a
                href="https://calendly.com/shaminder_sg/letstalk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-5 py-3 rounded-lg font-medium text-center mt-2"
              >
                Book a Call
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  )
}
