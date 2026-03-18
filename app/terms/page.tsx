import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: March 5, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">By accessing or using Mathnique ("the Service"), you agree to be bound by these Terms. If you do not agree, please do not use the Service. You must be at least 13 years old to use the Service.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
          <p className="text-gray-300 leading-relaxed">Mathnique is a web-based math challenge game that allows users to test their math skills in a 1-minute format. The Service includes free and paid ("Pro") tiers.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">3. User Accounts</h2>
          <p className="text-gray-300 leading-relaxed">You may use the Service without creating an account, but certain features require registration. You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and complete information when creating an account. We reserve the right to suspend or terminate accounts that violate these Terms.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">4. Free and Paid Plans</h2>
          <p className="text-gray-300 leading-relaxed mb-2"><strong className="text-white">Free Plan:</strong> 3 plays per day. Option to earn 2 additional plays per day by sharing your result on social media (once per day).</p>
          <p className="text-gray-300 leading-relaxed"><strong className="text-white">Pro Plan ($2.99/month):</strong> Unlimited plays, access to Practice Mode and Expert Mode, and progress tracking.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">5. Payments and Subscriptions</h2>
          <p className="text-gray-300 leading-relaxed">Pro subscriptions are billed monthly at $2.99 USD. All payments are processed by Polar API Inc. ("Polar"), which acts as the Merchant of Record for all transactions. Subscriptions automatically renew each month unless cancelled. You may cancel your subscription at any time through your account settings.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">6. Account Termination and Deletion</h2>
          <p className="text-gray-300 leading-relaxed">You may terminate your account at any time by contacting us at support@mathniqueplay.com. Upon termination, your right to use the Service will immediately cease.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">7. Prohibited Conduct</h2>
          <p className="text-gray-300 leading-relaxed">You agree not to use the Service for any unlawful purpose, attempt to exploit or hack the Service, create multiple accounts to circumvent play limits, use automated scripts or bots, or harass other users.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">8. Intellectual Property</h2>
          <p className="text-gray-300 leading-relaxed">All content, features, and functionality of the Service are owned by The Mathnique Team and are protected by applicable intellectual property laws.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">9. Disclaimer of Warranties</h2>
          <p className="text-gray-300 leading-relaxed">The Service is provided "as is" and "as available" without warranties of any kind. Game scores are for entertainment purposes only and do not represent any certified measurement of mathematical ability.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">10. Limitation of Liability</h2>
          <p className="text-gray-300 leading-relaxed">To the fullest extent permitted by law, The Mathnique Team shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">11. Changes to These Terms</h2>
          <p className="text-gray-300 leading-relaxed">We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">12. Governing Law</h2>
          <p className="text-gray-300 leading-relaxed">These Terms shall be governed by the laws of Japan. Any disputes shall be subject to the exclusive jurisdiction of the Tokyo District Court.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">13. Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">If you have any questions, please contact us at: <strong className="text-white">support@mathniqueplay.com</strong></p>
        </section>

        <Link href="/" className="text-yellow-400 hover:text-yellow-300 transition">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}