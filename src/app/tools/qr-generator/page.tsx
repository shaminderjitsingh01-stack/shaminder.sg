'use client'

import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function QRGenerator() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const [fgColor, setFgColor] = useState('#000000')
  const svgRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    if (!svgRef.current) return
    const svg = svgRef.current.querySelector('svg')
    if (!svg) return

    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const data = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    img.onload = () => {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, size, size)
      ctx.drawImage(img, 0, 0, size, size)
      const a = document.createElement('a')
      a.download = 'qr-code.png'
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(data)))
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'QR Generator' }]} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
          <p className="text-gray-600 mb-8">Generate custom QR codes for URLs, text, WhatsApp links, and more.</p>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none mb-4"
            />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value={128}>Small (128px)</option>
                  <option value={256}>Medium (256px)</option>
                  <option value={512}>Large (512px)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
              </div>
            </div>

            {text && (
              <div className="flex flex-col items-center">
                <div ref={svgRef} className="bg-white p-4 rounded-xl border border-gray-100 mb-4">
                  <QRCodeSVG value={text} size={Math.min(size, 256)} fgColor={fgColor} />
                </div>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  <Download className="mr-2" size={18} />
                  Download PNG
                </button>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
