'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/6598137066"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  )
}
