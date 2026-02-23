import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for shaminder.sg — PDPA compliant. Learn how we collect, use, and protect your personal data.',
  alternates: { canonical: 'https://shaminder.sg/privacy-policy' },
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: 18 January 2026</p>

          <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-indigo-600">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
              <p className="text-sm text-indigo-800 font-medium mb-2">PDPA Compliance Statement</p>
              <p className="text-sm text-indigo-700">This Privacy Policy is prepared in accordance with the Personal Data Protection Act 2012 (PDPA) of Singapore.</p>
              <p className="text-sm text-indigo-700 mt-2"><strong>Data Controller:</strong> Shaminder Technologies | UEN: 53517126J | Singapore</p>
              <p className="text-sm text-indigo-700"><strong>DPO Contact:</strong> hello@shaminder.sg | +65 9813 7066</p>
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>Shaminder Technologies (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website shaminder.sg. This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you visit our website or use our services, in compliance with the Personal Data Protection Act 2012 (PDPA) of Singapore.</p>
            <p>By using our website or services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your personal data as described herein.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">2. Personal Data We Collect</h2>
            <h3 className="text-lg font-semibold mt-6 mb-3">2.1 Information You Provide Directly</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
              <li><strong>Business Information:</strong> Industry, business requirements, project details</li>
              <li><strong>Communication Records:</strong> Messages sent via contact forms, chatbot, email, or WhatsApp</li>
              <li><strong>Payment Information:</strong> Billing details for service payments (processed through secure payment providers)</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns</li>
              <li><strong>Technical Data:</strong> IP address, referring URL, access times</li>
              <li><strong>Cookies:</strong> As described in Section 10 below</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Purposes for Collection, Use, and Disclosure</h2>
            <p>In accordance with the PDPA&apos;s Purpose Limitation Obligation, we collect, use, and disclose your personal data only for the following purposes: responding to enquiries, providing services, processing payments, sending service updates, sending marketing communications (with consent), improving our website, complying with legal obligations, and protecting our legal rights.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Consent</h2>
            <p>We obtain your consent before collecting, using, or disclosing your personal data, unless an exception under the PDPA applies. You may withdraw your consent at any time by contacting us.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Disclosure of Personal Data</h2>
            <p>We may disclose your personal data to service providers (hosting, email, payment, analytics), professional advisors, and legal/regulatory authorities when required. We do not sell your personal data to third parties.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Transfer of Personal Data Outside Singapore</h2>
            <p>Your personal data may be transferred to countries outside Singapore through cloud service providers. We ensure adequate protection through comparable standards, consent, or contractual arrangements.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">7. Retention of Personal Data</h2>
            <p>We retain personal data only as long as necessary. Client project data is kept for 7 years minimum. Marketing data is kept until consent is withdrawn. Analytics data is retained up to 26 months.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">8. Protection of Personal Data</h2>
            <p>We implement SSL/TLS encryption, secure hosting, access controls, regular security reviews, and secure data disposal.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">9. Your Rights Under the PDPA</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right of Access:</strong> Request access to your personal data (response within 30 days).</li>
              <li><strong>Right of Correction:</strong> Request correction of inaccurate data.</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time.</li>
              <li><strong>Right to Data Portability:</strong> Request data in a commonly used format.</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">10. Cookies and Tracking</h2>
            <p>We use essential cookies (website functionality), analytics cookies (Google Analytics), and preference cookies. You can control cookies through your browser settings.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">11. Do Not Call (DNC) Registry</h2>
            <p>We comply with Singapore&apos;s DNC Registry provisions. We will not send marketing messages to registered numbers without clear consent.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">12. Data Breach Notification</h2>
            <p>We have procedures to detect, investigate, and respond to data breaches. Notification to PDPC and affected individuals will be made within 3 calendar days where required.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">13. Contact Us</h2>
            <p>For questions or requests regarding this Privacy Policy:</p>
            <ul className="list-none pl-0 space-y-1">
              <li>Email: <a href="mailto:hello@shaminder.sg">hello@shaminder.sg</a></li>
              <li>WhatsApp: <a href="https://wa.me/6598137066">+65 9813 7066</a></li>
            </ul>
            <p className="mt-4">Complaints may be lodged with the <a href="https://www.pdpc.gov.sg" target="_blank" rel="noopener noreferrer">Personal Data Protection Commission (PDPC)</a> of Singapore.</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
