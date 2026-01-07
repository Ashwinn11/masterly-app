'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail } from 'lucide-react';
import { BlobBackground } from '@/components/ui/BlobBackground';
import Link from 'next/link';

export default function PrivacyPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen content-layer py-20 relative">
      <BlobBackground position="top" color="#ff7664" animate={true} />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="bg-white rounded-2xl shadow-elevated p-8 md:p-12">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Privacy Policy</h1>
          <p className="text-sm text-primary font-medium mb-8">Last Updated: January 7, 2026</p>
          
          <div className="prose prose-lg max-w-none text-gray-800/80 space-y-6">
            <p>
              At Masterly (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our learning application.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-primary mt-6 mb-3">Account Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address and name (from your authentication provider)</li>
              <li>Profile information you choose to provide</li>
              <li>Learning progress and statistics</li>
            </ul>

            <h3 className="text-lg font-medium text-primary mt-6 mb-3">Learning Content</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Materials you upload (PDFs, images, audio, text)</li>
              <li>Generated questions and flashcards</li>
              <li>Your answers and response times</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our learning services</li>
              <li>Track your progress using spaced repetition algorithms</li>
              <li>Generate personalized questions from your materials</li>
              <li>Send you important updates about your account</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Data Storage & Security</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All data is stored securely on Supabase servers</li>
              <li>We use industry-standard encryption</li>
              <li>Your learning materials are private and only accessible by you</li>
              <li>We do not sell your personal data to third parties</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Third-Party Services</h2>
            <p>To provide our services, we use the following trusted third-party services:</p>

            <h3 className="text-lg font-medium text-primary mt-6 mb-3">RevenueCat</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Manages subscriptions and payments</li>
              <li>Processes payment information securely</li>
              <li>Privacy: <Link href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.revenuecat.com/privacy</Link></li>
            </ul>

            <h3 className="text-lg font-medium text-primary mt-6 mb-3">OpenAI</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Generates questions from your learning materials</li>
              <li>Processes uploaded content (PDF, text, images)</li>
              <li>Privacy: <Link href="https://openai.com/policies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://openai.com/policies</Link></li>
            </ul>

            <h3 className="text-lg font-medium text-primary mt-6 mb-3">Google Services</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Cloud Vision API (image processing)</li>
              <li>Google Cloud Speech-to-Text (audio transcription)</li>
              <li>Google Document AI (PDF processing)</li>
              <li>Privacy: <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</Link></li>
            </ul>

            <h3 className="text-lg font-medium text-primary mt-6 mb-3">Sentry</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Error monitoring and crash reporting</li>
              <li>Helps us improve app stability</li>
              <li>Privacy: <Link href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://sentry.io/privacy/</Link></li>
            </ul>

            <h3 className="text-lg font-medium text-primary mt-6 mb-3">Supabase</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Backend database and authentication</li>
              <li>Real-time data synchronization</li>
              <li>Privacy: <Link href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://supabase.com/privacy</Link></li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Spaced Repetition Data</h2>
            <p>To optimize your learning experience, we track:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Question performance (correct/incorrect)</li>
              <li>Response times</li>
              <li>Review schedules</li>
              <li>Learning streaks and statistics</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and all associated data</li>
              <li>Opt-out of non-essential communications</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Children&apos;s Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect information from children under 13.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            
            <a 
              href="mailto:support@masterlyapp.in" 
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors"
            >
              <Mail className="w-4 h-4" />
              support@masterlyapp.in
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}