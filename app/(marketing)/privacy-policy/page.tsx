import { Background } from "@/components/background";
import { Metadata } from "next";
import { HorizontalGradient } from "@/components/horizontal-gradient";

export const metadata: Metadata = {
  title: "Privacy Policy | ACAI Marketing",
  description:
    "ACAI Marketing's Privacy Policy. Learn how we collect, use, and protect your data when you use our lead conversion and automation platform.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    images: ["https://micagrowth.com/nevermissaleadpreviewimage.png"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative overflow-hidden py-20 px-4 md:px-20 bg-white dark:bg-black">
      <Background />
      <div className="max-w-4xl mx-auto relative z-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Your Data, Your Control
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-4">
            Last Updated: December 18, 2024
          </p>
        </div>

        {/* Content Sections */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Our Commitment
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Thank you for choosing ACAI Marketing. ACAI Marketing is an AI-powered virtual receptionist and messaging automation platform built specifically for plumbing and HVAC professionals. We understand that your data represents your business reputation and customer trust.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              This Privacy Policy explains how ACAI Marketing, operated by ACAI Enterprises LLC ("we," "our," or "us"), collects, uses, and protects information processed through our platform.
            </p>
          </section>

          {/* Data Collection Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Data Collection Overview
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              We collect information necessary to operate and improve our services.
            </p>
            
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              A. Business & Account Data
            </h3>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li>Business name, owner name, and contact information</li>
              <li>Service areas, business hours, and dispatch preferences</li>
              <li>Billing information processed securely by third-party payment providers</li>
              <li>Account login activity and platform usage data</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              B. Service & Interaction Data
            </h3>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li>Call recordings and transcripts handled by the AI receptionist</li>
              <li>SMS messages sent and received through the platform</li>
              <li>Caller phone numbers, timestamps, and call metadata</li>
              <li>Appointment details such as job type, requested time, and service address</li>
            </ul>
          </section>

          {/* SMS Communications & Consent */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              SMS Communications & Consent
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our platform enables service-related SMS communications including appointment confirmations, scheduling updates, reminders, missed-call follow-ups, and limited post-service communications such as customer satisfaction or review requests.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              Message frequency may vary. Message and data rates may apply.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              Customers may opt out at any time by replying STOP. Customers may reply HELP for assistance.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              We do not sell or share personal information, including phone numbers, with third parties for marketing or promotional purposes.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              If promotional or re-engagement messaging is introduced in the future (such as service reminders, seasonal offers, or lead revival campaigns), customers will be required to provide separate, explicit opt-in consent before receiving those messages.
            </p>
          </section>

          {/* How We Use Data */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              How We Use Data
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We use collected information to:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li>Operate AI receptionist and messaging services</li>
              <li>Schedule appointments and manage customer interactions</li>
              <li>Improve AI performance and service accuracy</li>
              <li>Provide customer support and account management</li>
              <li>Detect fraud and ensure platform security</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </section>

          {/* Sharing & Disclosure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Sharing & Disclosure
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-semibold mb-4">
              We do not sell personal data.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Information may be shared only with:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li>Infrastructure, messaging, analytics, and payment providers required to deliver services</li>
              <li>Legal authorities when required by law</li>
              <li>A successor entity in the event of a merger, acquisition, or asset sale</li>
            </ul>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Security
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We implement industry-standard security safeguards including encryption in transit and at rest, secure cloud infrastructure, access controls, and continuous monitoring. While no system is completely immune to risk, we actively maintain and improve our security posture.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Data Retention
            </h2>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li>Call recordings and transcripts are retained for quality assurance, typically 30–90 days</li>
              <li>Account data is retained while services are active</li>
              <li>Billing records are retained for tax and accounting compliance</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              Data may be deleted or anonymized upon request, subject to legal requirements.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Your Rights
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Depending on your jurisdiction, you may request access, correction, deletion, or restriction of your data. Requests can be submitted using the contact information below.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Cookies
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We use cookies for essential functionality, analytics, and user preferences. You may control cookies through your browser settings.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Third-Party Links
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our website may contain links to third-party services. We are not responsible for the privacy practices of those third parties.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Children's Privacy
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our services are intended for business use only and are not directed toward individuals under 18 years of age.
            </p>
          </section>

          {/* International Data Transfers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              International Data Transfers
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Your information may be processed in the United States or other jurisdictions where we operate. Appropriate safeguards are applied to protect your data.
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We may update this Privacy Policy periodically. Updates will be reflected by the "Last Updated" date.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Contact Us
            </h2>
            <div className="mt-4 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <strong>ACAI Enterprises LLC</strong><br />
                Email: <a href="mailto:privacy@tryacai.ai" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@tryacai.ai</a><br />
                Website: <a href="https://micagrowth.com" className="text-blue-600 dark:text-blue-400 hover:underline">https://micagrowth.com</a>
              </p>
            </div>
          </section>

          {/* California & State Privacy Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              California & State Privacy Rights
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Residents of certain states may have additional privacy rights, including the right to request access or deletion of personal data. Requests can be submitted using the contact information above.
            </p>
          </section>

        </div>

        <HorizontalGradient className="top-20" />
        <HorizontalGradient className="bottom-20" />
      </div>
    </div>
  );
}
