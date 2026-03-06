import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: March 5, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
          <p className="text-gray-300 leading-relaxed mb-2"><strong className="text-white">Information you provide:</strong> Email address (when you create an account), payment information (processed securely by Polar API Inc. — we do not store your card details).</p>
          <p className="text-gray-300 leading-relaxed"><strong className="text-white">Information collected automatically:</strong> Game scores and play history, device type and browser information, anonymous usage data (play counts, session duration).</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-300 leading-relaxed">We use the information we collect to provide and improve the Service, process payments and manage subscriptions, send transactional emails (e.g., login links, receipts), analyze usage patterns to improve gameplay experience, and enforce our Terms of Service.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">3. Legal Basis for Processing (EEA and UK Users)</h2>
          <p className="text-gray-300 leading-relaxed">Our legal basis includes performance of a contract (to provide the Service), consent (where given), and legitimate interests (to improve the Service and ensure security).</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">4. Children's Privacy (COPPA)</h2>
          <p className="text-gray-300 leading-relaxed">The Service is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has submitted information to us, please contact us at support@mathnique.com.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">5. Third-Party Services</h2>
          <p className="text-gray-300 leading-relaxed">We use the following third-party services: Supabase (database and authentication), Polar API Inc. (payment processing as Merchant of Record), Google (OAuth login), Vercel (hosting), and Resend (transactional email). Each has its own Privacy Policy.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">6. International Data Transfers</h2>
          <p className="text-gray-300 leading-relaxed">Information we collect may be transferred to and processed in the United States or other countries where our third-party providers operate. By using the Service, you consent to such transfers.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">7. Data Sharing</h2>
          <p className="text-gray-300 leading-relaxed">We do not sell your personal information. We only share your data with third-party services as described above, or when required by law.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">8. Data Retention</h2>
          <p className="text-gray-300 leading-relaxed">We retain your data for as long as your account is active. If you delete your account, we will delete your personal data within a reasonable timeframe, except where retention is required by law.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">9. Your Rights</h2>
          <p className="text-gray-300 leading-relaxed">Depending on your location, you may have the right to access, correct, or delete your personal data, object to processing, request data portability, or lodge a complaint with a data protection authority. To exercise these rights, contact us at support@mathnique.com.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">10. Security</h2>
          <p className="text-gray-300 leading-relaxed">We implement reasonable technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">11. Cookies and Local Storage</h2>
          <p className="text-gray-300 leading-relaxed">We use browser local storage to remember anonymous user identifiers for play count tracking and store session preferences. We do not use advertising cookies or third-party tracking cookies.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">12. Changes to This Policy</h2>
          <p className="text-gray-300 leading-relaxed">We may update this Privacy Policy from time to time. We will notify users of significant changes by updating the "Last updated" date at the top of this page.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">13. Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">If you have any questions, please contact us at: <strong className="text-white">support@mathnique.com</strong></p>
        </section>

        <Link href="/" className="text-yellow-400 hover:text-yellow-300 transition">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}