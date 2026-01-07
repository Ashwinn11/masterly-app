'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, GraduationCap } from 'lucide-react';
import { BlobBackground } from '@/components/ui/BlobBackground';

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Terms of Service</h1>
          <p className="text-sm text-primary font-medium mb-8">Last Updated: January 7, 2026</p>
          
          <div className="prose prose-lg max-w-none text-gray-800/80 space-y-6">
            <p>
              Welcome to Masterly. By using our learning application, you agree to these Terms of Service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Masterly, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our application.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Description of Service</h2>
            <p>Masterly is a learning application that provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Spaced repetition learning tools</li>
              <li>Question generation from study materials</li>
              <li>Progress tracking and analytics</li>
              <li>Flashcard creation and review</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. User Responsibilities</h2>
            <p>As a user, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate account information</li>
              <li>Maintain the security of your account</li>
              <li>Not use the service for any illegal purpose</li>
              <li>Not upload content that violates intellectual property rights</li>
              <li>Not attempt to circumvent our security measures</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Content & Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You retain ownership of content you upload</li>
              <li>You grant us license to process your content for learning purposes</li>
              <li>The application&apos;s design and algorithms are our proprietary property</li>
              <li>You may not copy, modify, or distribute our technology</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Account Security</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for maintaining your account confidentiality</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>We are not liable for any loss due to compromised accounts</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Discontinuation of Service</h2>
            <p>We reserve the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or discontinue the service at any time</li>
              <li>Terminate accounts that violate these terms</li>
              <li>Suspend access for maintenance or updates</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Disclaimer of Warranties</h2>
            <p className="uppercase font-medium">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE UNINTERRUPTED OR ERROR-FREE OPERATION.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              Masterly shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. Privacy</h2>
            <p>
              Your use of our service is also governed by our Privacy Policy, which can be found in the app.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">10. Governing Law</h2>
            <p>
              These terms shall be governed by the laws of India. Any disputes shall be resolved in the competent courts of India.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">11. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">12. Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us at:</p>
            
            <a 
              href="mailto:support@masterlyapp.in" 
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors"
            >
              <Mail className="w-4 h-4" />
              support@masterlyapp.in
            </a>

            <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold text-gray-800">Thank you for using Masterly!</span>
              </div>
              <p className="text-gray-600">Happy learning! 🎓</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}