import { Background } from "@/components/background";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Service - ACAI AI",
  description:
    "ACAI AI's Terms of Service. Learn about our service terms, payment policies, and user obligations when using our AI receptionist platform.",
  openGraph: {
    images: ["/finalwebsitepreviewimage.png"],
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="relative overflow-hidden py-20 px-4 md:px-20 bg-white dark:bg-black">
      <Background />
      <div className="max-w-4xl mx-auto relative z-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Our Terms. Your Peace of Mind.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-4">
            Effective Date: January 1st, 2025
          </p>
        </div>

        {/* Privacy Policy Button */}
        <div className="flex justify-center mb-12">
          <Link href="/privacy-policy">
            <Button variant="outline" className="rounded-lg">
              View Privacy Policy
            </Button>
          </Link>
        </div>

        {/* Integration Logos */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 opacity-50">
          <span className="text-xs text-neutral-500 dark:text-neutral-500">Logo 1</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-500">Logo 2</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-500">Logo 3</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-500">Logo 4</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-500">Logo 5</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-500">Logo 6</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-500">Logo 7</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-500">Logo 8</span>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          
          {/* Introduction */}
          <section>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Welcome to ACAI. These Terms of Service ("Terms") govern your use of our software-as-a-service (SaaS) platform and services ("Services"). By using our Services, you agree to these Terms. We're committed to transparency and fairness in all our interactions.
            </p>
          </section>

          {/* Agreement to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              By accessing and using ACAI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to any part of these Terms, you may not use our platform. We reserve the right to update these Terms at any time, and your continued use of our Services constitutes your acceptance of any modifications.
            </p>
          </section>

          {/* Account Responsibility */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Account Responsibility
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You agree to:
            </p>
            <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 ml-2">
              <li>Provide accurate and complete information during registration</li>
              <li>Keep your password secure and not share it with others</li>
              <li>Immediately notify us of any unauthorized access to your account</li>
              <li>Be at least 18 years old and authorized to represent your business</li>
              <li>Accept full responsibility for all activities conducted under your account</li>
            </ul>
          </section>

          {/* Use of Services */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Use of Services
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              You agree to use ACAI only for lawful purposes and in accordance with these Terms. You must be 18+ and authorized to represent a business to use our platform. Our Services are designed specifically for plumbing and HVAC service professionals to automate customer interactions and streamline business operations.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Your use of ACAI must comply with all applicable laws and regulations. You are solely responsible for ensuring your use of the platform aligns with your business practices and industry standards.
            </p>
          </section>

          {/* Payment and Billing */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Payment and Billing
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              By subscribing to ACAI, you agree to pay the applicable fees as outlined in your subscription plan. You authorize us to charge your payment method for recurring subscription fees unless you cancel your account.
            </p>
            <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 ml-2 mb-4">
              <li>All fees are non-refundable unless explicitly stated otherwise</li>
              <li>Billing occurs automatically on your subscription renewal date</li>
              <li>You are responsible for providing accurate payment information</li>
              <li>We reserve the right to adjust pricing with 30 days' notice</li>
              <li>Failed payment attempts may result in service suspension</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Please contact us at <span className="font-semibold">team@tryacai.ai</span> for any billing inquiries or disputes.
            </p>
          </section>

          {/* Intellectual Property & AI Rights */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Intellectual Property and AI Content
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              All content, technology, software, and intellectual property developed by ACAI belongs to ACAI or its licensors. You may not use, reproduce, modify, or distribute any part of our platform without explicit permission.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              <span className="font-semibold">AI-Generated Content Responsibility:</span> You acknowledge that our AI receptionist generates responses based on trained models. You are responsible for reviewing AI outputs and ensuring they comply with your business practices, customer expectations, and applicable laws. ACAI is not liable for inaccurate, inappropriate, or unauthorized responses generated by the AI system.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              You agree not to use our AI system to plagiarize, fraudulently impersonate, or create content that violates third-party rights or applicable laws.
            </p>
          </section>

          {/* Prohibited Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Prohibited Conduct
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              You agree not to engage in any of the following activities while using ACAI:
            </p>
            <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 ml-2">
              <li><span className="font-semibold">Unlawful or Abusive Use:</span> Any illegal activity, harassment, or harmful conduct</li>
              <li><span className="font-semibold">Service Disruption:</span> Attempting to overload, damage, or disrupt the platform's functionality</li>
              <li><span className="font-semibold">Unauthorized Access:</span> Attempting to access restricted areas or other users' accounts</li>
              <li><span className="font-semibold">Bots and Scrapers:</span> Using automated tools, bots, or scrapers to extract data or manipulate the platform</li>
              <li><span className="font-semibold">Fraud and Deception:</span> Creating fake accounts, misrepresenting your identity, or engaging in fraudulent activity</li>
              <li><span className="font-semibold">Data Abuse:</span> Selling, trading, or misusing customer data obtained through ACAI</li>
              <li><span className="font-semibold">Reverse Engineering:</span> Attempting to reverse-engineer, decompile, or reproduce the AI system</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Termination
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              ACAI reserves the right to suspend or terminate your access to our Services at any time for the following reasons:
            </p>
            <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 ml-2 mb-4">
              <li>Violation of these Terms of Service</li>
              <li>Non-payment of subscription fees</li>
              <li>Engagement in prohibited conduct</li>
              <li>Unauthorized or illegal use of the platform</li>
              <li>Any other reason at our sole discretion, with or without notice</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Upon termination, your access to ACAI will be immediately revoked, and you will no longer be able to use our Services. Any data associated with your account may be deleted in accordance with our data retention policies.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Disclaimers
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              ACAI provides its Services on an "AS IS" and "AS AVAILABLE" basis. We do not make any warranties, expressed or implied, regarding:
            </p>
            <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 ml-2">
              <li>The accuracy, completeness, or reliability of the platform</li>
              <li>Uninterrupted or error-free operation</li>
              <li>The quality or suitability of the AI-generated responses</li>
              <li>That the Services will meet your specific business needs</li>
              <li>Freedom from viruses, malware, or harmful code</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              While we strive to maintain consistent uptime, we do not guarantee 100% availability. Scheduled maintenance and unforeseen technical issues may result in temporary service interruptions.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              To the maximum extent permitted by law, ACAI and its owners, operators, employees, and agents shall not be liable for:
            </p>
            <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 ml-2 mb-4">
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Lost profits, lost revenue, or lost business opportunities</li>
              <li>Damages arising from AI-generated content or responses</li>
              <li>Data loss or corruption</li>
              <li>Service interruptions or downtime</li>
              <li>Any damages resulting from your use of or inability to use the Services</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our total liability to you for any claims arising from these Terms or your use of ACAI shall not exceed the amount you have paid to us in the 12 months preceding the claim.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Governing Law
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              These Terms of Service are governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the state and federal courts located in Florida for any disputes arising from these Terms or your use of ACAI.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Changes to Terms
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              ACAI reserves the right to modify these Terms of Service at any time. We will provide notice of significant changes via email or by updating the "Effective Date" at the top of this page. Your continued use of ACAI following any changes constitutes your acceptance of the updated Terms. We encourage you to review this page periodically to stay informed of any updates.
            </p>
          </section>

          {/* Contact Us */}
          <section className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-8 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Contact Us
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">Company</p>
                <p className="text-lg text-neutral-900 dark:text-neutral-100">ACAI</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">Email</p>
                <a href="mailto:team@tryacai.ai" className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
                  team@tryacai.ai
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">Phone</p>
                <a href="tel:8482539552" className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
                  848-253-9552
                </a>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-6">
                <p>If you have questions about these Terms, please don't hesitate to reach out. We're here to help and committed to addressing your concerns promptly and transparently.</p>
              </div>
            </div>
          </section>

        </div>

        {/* Privacy Policy Button - Bottom */}
        <div className="flex justify-center mt-16">
          <Link href="/privacy-policy">
            <Button variant="outline" className="rounded-lg">
              View Privacy Policy
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
