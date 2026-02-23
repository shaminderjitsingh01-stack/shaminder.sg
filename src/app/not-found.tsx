import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6">
        <div className="text-center">
          <p className="text-6xl font-bold text-indigo-600 mb-4">404</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              <Home className="mr-2" size={18} />
              Go Home
            </Link>
            <Link
              href="/#packages"
              className="inline-flex items-center justify-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              <ArrowLeft className="mr-2" size={18} />
              View Pricing
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
