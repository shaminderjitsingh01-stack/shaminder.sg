'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function WhatsAppLinkGenerator() {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '').replace(/^\+/, '')
  const encodedMessage = encodeURIComponent(message)
  const link = cleanPhone
    ? `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`
    : ''

  const handleCopy = () => {
    if (!link) return
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'WhatsApp Link' }]} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WhatsApp Link Generator</h1>
          <p className="text-gray-600 mb-8">Create click-to-chat WhatsApp links with pre-filled messages. Perfect for websites, social media, and ads.</p>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (with country code)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="65 9813 7066"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Include country code without + (e.g., 65 for Singapore)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pre-filled Message (optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi! I'm interested in your services..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                />
              </div>
            </div>

            {link && (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your WhatsApp Link</label>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 break-all mb-4 font-mono">{link}</div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 inline-flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    {copied ? <><Check className="mr-2" size={18} /> Copied!</> : <><Copy className="mr-2" size={18} /> Copy Link</>}
                  </button>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
