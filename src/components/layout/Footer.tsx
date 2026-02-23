import Link from 'next/link'
import { Phone, Mail, Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-white mb-4 inline-flex items-center gap-2">
              <Zap size={24} className="text-indigo-400" fill="currentColor" />
              Shaminder
            </Link>
            <p className="text-gray-400 mb-4 mt-2">
              Your one-stop digital growth partner. Helping Singapore SMEs get more customers online.
            </p>
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="inline-flex items-center gap-2 bg-green-900/50 px-3 py-1.5 rounded-md">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                <span className="text-xs font-semibold text-green-400">SSL SECURE</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-red-900/50 px-3 py-1.5 rounded-md">
                <span className="text-sm">&#127480;&#127468;</span>
                <span className="text-xs font-semibold text-red-400">SINGAPORE BUSINESS</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#packages" className="hover:text-white transition">Website Design</Link></li>
              <li><Link href="/#packages" className="hover:text-white transition">SEO</Link></li>
              <li><Link href="/#packages" className="hover:text-white transition">Content Marketing</Link></li>
              <li><Link href="/#packages" className="hover:text-white transition">AI Automation</Link></li>
              <li><Link href="/#packages" className="text-indigo-400 hover:text-indigo-300 transition">View pricing →</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Phone size={14} className="mr-2 flex-shrink-0" />
                <a href="tel:+6598137066" className="hover:text-white transition">+65 9813 7066</a>
              </li>
              <li className="flex items-center">
                <Mail size={14} className="mr-2 flex-shrink-0" />
                <a href="mailto:hello@shaminder.sg" className="hover:text-white transition">hello@shaminder.sg</a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-semibold text-white mb-3 text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/tools" className="hover:text-white transition">Free Tools</Link></li>
                <li><Link href="/industries" className="hover:text-white transition">Industries</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition">Sitemap</Link>
          </div>
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Shaminder Technologies. Singapore. | UEN: 53517126J
          </p>
        </div>
      </div>
    </footer>
  )
}
