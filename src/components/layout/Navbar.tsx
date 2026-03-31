'use client'

import { useState } from 'react'
// Using <a> tags instead of Next.js <Link> to force full page loads
// This ensures body.style.overflow resets properly from the homepage's scroll lock
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
      <nav className="fixed top-0 left-0 right-0 bg-black z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/' }} className="text-xl font-bold text-white flex items-center gap-2 cursor-pointer">
              <Zap size={24} className="text-indigo-600" fill="currentColor" />
              Shaminder
            </a>

            {/* Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="/industries" className="text-gray-300 hover:text-white transition text-sm font-medium">Industries</a>

              {/* Tools Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition text-sm font-medium">
                  Tools <ChevronDown size={14} />
                </button>
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/10 shadow-xl p-4 w-64">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                      <span className="text-sm font-semibold text-white">Free Tools</span>
                      <a href="/tools" className="text-xs text-indigo-600 hover:underline">View All →</a>
                    </div>
                    <div className="space-y-1">
                      {tools.map((t) => (
                        <a
                          key={t.slug}
                          href={`/tools/${t.slug}`}
                          className="block p-2.5 rounded-lg hover:bg-gray-50 transition"
                        >
                          <p className="text-sm font-medium text-white">{t.title}</p>
                          <p className="text-xs text-gray-500">{t.desc}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <a href="/blog" className="text-gray-300 hover:text-white transition text-sm font-medium">Blog</a>

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
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-white/10 py-4 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1 px-4">
              <a href="/industries" className="py-3 text-gray-300 font-medium" onClick={() => setMobileOpen(false)}>Industries</a>

              {/* Tools Accordion */}
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="flex items-center justify-between py-3 text-gray-300 font-medium"
              >
                Free Tools <ChevronDown size={16} className={`transition ${mobileToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileToolsOpen && (
                <div className="space-y-1 pb-3">
                  {tools.map((t) => (
                    <a
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className="block text-sm text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t.title}
                    </a>
                  ))}
                  <a
                    href="/tools"
                    className="block text-sm text-indigo-600 font-medium p-2 text-center bg-indigo-50 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    View All Tools
                  </a>
                </div>
              )}

              <a href="/blog" className="py-3 text-gray-300 font-medium" onClick={() => setMobileOpen(false)}>Blog</a>

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
