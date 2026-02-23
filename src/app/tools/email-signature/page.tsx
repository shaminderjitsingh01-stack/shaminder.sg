'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function EmailSignature() {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [color, setColor] = useState('#4f46e5')
  const [copied, setCopied] = useState(false)

  const signatureHtml = `
<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;color:#333;">
  <tr>
    <td style="padding-right:16px;border-right:3px solid ${color};">
      <div style="width:4px;"></div>
    </td>
    <td style="padding-left:16px;">
      <div style="font-size:18px;font-weight:bold;color:${color};">${name || 'Your Name'}</div>
      ${title ? `<div style="font-size:13px;color:#666;margin-top:2px;">${title}</div>` : ''}
      ${company ? `<div style="font-size:13px;font-weight:600;color:#333;margin-top:2px;">${company}</div>` : ''}
      <div style="margin-top:8px;font-size:12px;color:#666;">
        ${phone ? `<div>📱 ${phone}</div>` : ''}
        ${email ? `<div>✉️ <a href="mailto:${email}" style="color:${color};text-decoration:none;">${email}</a></div>` : ''}
        ${website ? `<div>🌐 <a href="${website.startsWith('http') ? website : 'https://' + website}" style="color:${color};text-decoration:none;">${website}</a></div>` : ''}
      </div>
    </td>
  </tr>
</table>`.trim()

  const handleCopy = () => {
    navigator.clipboard.writeText(signatureHtml)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Email Signature' }]} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Signature Generator</h1>
          <p className="text-gray-600 mb-8">Create a professional email signature. Copy the HTML and paste into Gmail, Outlook, or any email client.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Marketing Manager" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+65 9123 4567" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Website</label><input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="company.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Brand Color</label><input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-16 h-10 rounded-lg cursor-pointer" /></div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-4">
                <p className="text-sm font-medium text-gray-700 mb-4">Preview</p>
                <div dangerouslySetInnerHTML={{ __html: signatureHtml }} />
              </div>
              <button
                onClick={handleCopy}
                className="w-full inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                {copied ? <><Check className="mr-2" size={18} /> Copied!</> : <><Copy className="mr-2" size={18} /> Copy HTML</>}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
