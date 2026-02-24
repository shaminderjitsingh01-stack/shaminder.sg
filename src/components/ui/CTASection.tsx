import { Calendar, MessageCircle } from 'lucide-react'

interface CTASectionProps {
  title?: string
  subtitle?: string
}

export default function CTASection({
  title = 'Ready to Grow Your Business Online?',
  subtitle = "Let's have a quick chat. Tell us about your business, and we'll give you honest advice on what you actually need. No hard sell. No obligations.",
}: CTASectionProps) {
  return (
    <section className="py-16 md:py-24 bg-indigo-600 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h2>
        <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://calendly.com/shaminder_sg/letstalk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            <Calendar className="mr-2" size={20} />
            Book a Free Strategy Call
          </a>
          <a
            href="https://wa.me/6598137066"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            <MessageCircle className="mr-2" size={20} />
            WhatsApp Me Directly
          </a>
        </div>
      </div>
    </section>
  )
}
