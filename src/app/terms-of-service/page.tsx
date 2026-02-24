import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for shaminder.sg — governing your use of our website and digital marketing services.',
  alternates: { canonical: 'https://shaminder.sg/terms-of-service' },
}

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: 18 January 2026</p>

          <div className="prose prose-sm md:prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600">
            <p>Welcome to shaminder.sg. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our website and services. By accessing our website or engaging our services, you agree to be bound by these Terms.</p>
            <p><strong>Business Information:</strong> Shaminder Technologies | UEN: 53517126J | Singapore</p>

            <h2 className="text-xl font-bold mt-8 mb-4">1. Services</h2>
            <p>Shaminder.sg provides digital marketing and web development services including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Website Design and Development</li>
              <li>AI Automation and Lead Generation</li>
              <li>Search Engine Optimization (SEO)</li>
              <li>Content Marketing and Social Media Management</li>
              <li>Email Marketing</li>
              <li>Dashboard and Analytics Setup</li>
              <li>Branding and Logo Design</li>
              <li>Copywriting Services</li>
              <li>CRM Setup and Integration</li>
              <li>Chatbot Development</li>
              <li>E-commerce Solutions</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">2. Engagement and Payment</h2>
            <p>All service engagements must be confirmed in writing before work commences. Payment terms: 50% deposit required before commencement, 50% balance due upon completion. Monthly retainer services are billed at the start of each month.</p>
            <p>All prices are in Singapore Dollars (SGD) and subject to prevailing GST where applicable. Payment can be made via bank transfer, PayNow, or other agreed methods.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Project Timeline and Delivery</h2>
            <p>Project timelines are estimates and may vary based on complexity and client responsiveness. Delays caused by late provision of materials may extend timelines. We strive to deliver websites within 48-72 hours for standard projects.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Client Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Providing accurate and complete information and materials</li>
              <li>Timely review and feedback on deliverables</li>
              <li>Ensuring rights to all content provided</li>
              <li>Maintaining backups of own data</li>
              <li>Compliance with applicable laws</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Intellectual Property</h2>
            <p>Upon full payment, clients receive full ownership of custom work. We retain the right to showcase completed projects in our portfolio unless otherwise agreed. Third-party assets remain subject to their respective licenses.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Revisions and Changes</h2>
            <p>Standard projects include reasonable revision rounds as specified in scope. Additional revisions or scope changes may incur additional charges. Major changes after approval may be treated as new projects.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">7. Hosting and Maintenance</h2>
            <p>First year of hosting is included with website projects as specified. Ongoing hosting and maintenance are available at additional cost. Clients are responsible for domain registration and renewal unless otherwise agreed.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>Services are provided &ldquo;as is&rdquo; without warranties. We are not liable for indirect, incidental, special, or consequential damages. Total liability shall not exceed the amount paid for the specific service.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">9. Confidentiality</h2>
            <p>We treat all client information as confidential and will not disclose to third parties without consent, except as required by law.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">10. Termination</h2>
            <p>Either party may terminate with written notice. Clients are responsible for payment for all completed work. Deposits are non-refundable once work has commenced unless otherwise agreed.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">11. Dispute Resolution</h2>
            <p>Disputes shall first be attempted through good faith negotiation. If negotiation fails, disputes shall be resolved through mediation in Singapore. These Terms are governed by the laws of Singapore.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">12. Modifications</h2>
            <p>We reserve the right to modify these Terms at any time. Changes are effective upon posting. Continued use constitutes acceptance.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">13. Contact</h2>
            <ul className="list-none pl-0 space-y-1">
              <li>Email: <a href="mailto:hello@shaminder.sg">hello@shaminder.sg</a></li>
              <li>WhatsApp: <a href="https://wa.me/6598137066">+65 9813 7066</a></li>
              <li>Website: <a href="https://shaminder.sg">shaminder.sg</a></li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
