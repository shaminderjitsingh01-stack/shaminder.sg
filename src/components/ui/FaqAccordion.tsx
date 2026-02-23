'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  faqs: FaqItem[]
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
          >
            <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
            {openIndex === i ? (
              <ChevronUp size={20} className="text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
            )}
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5">
              <p className="text-gray-600">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
