import { Background } from "@/components/background";
import { Metadata } from "next";
import { HorizontalGradient } from "@/components/horizontal-gradient";

export const metadata: Metadata = {
  title: "Privacy Policy - ACAI AI",
  description:
    "ACAI AI's Privacy Policy. Learn how we collect, use, and protect your data when you use our AI receptionist service for plumbing and HVAC businesses.",
  openGraph: {
    images: ["/finalwebsitepreviewimage.png"],
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
              Thank you for choosing ACAI AI. As an AI receptionist service built specifically for plumbing and HVAC professionals, we understand that your data represents more than just information—it represents your business reputation and customer trust.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              This Privacy Policy outlines how ACAI AI ("we," "our," or "us") collects, uses, and protects the information processed through our automated receptionist platform. By integrating our AI agents into your workflow, you agree to the practices described below.
            </p>
            <p className="text-xs italic text-neutral-500 dark:text-neutral-500 mt-4 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4">
              Note: This section will be finalized with legal review.
            </p>
          </section>

          {/* Data Collection Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Data Collection Overview
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              We categorize the data we collect into two distinct streams to ensure clarity and security.
            </p>
            
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              A. Business & Account Data
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Information necessary to establish your partnership with us:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li><strong>Identity Verification:</strong> Name, business entity name, and contact details</li>
              <li><strong>Operational Details:</strong> Service areas, business hours, and dispatch preferences</li>
              <li><strong>Billing Credentials:</strong> Securely tokenized payment methods (handled via third-party processors)</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              B. Service & Interaction Data
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Information processed by our AI during active usage:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li><strong>Conversation Logs:</strong> Transcripts and audio recordings of calls handled by the AI agent (stored for quality assurance and training)</li>
              <li><strong>Caller Metadata:</strong> Phone numbers, timestamps, and geolocation of incoming calls</li>
              <li><strong>Appointment Specifics:</strong> Job types, requested times, and customer addresses provided during calls</li>
              <li><strong>Digital Activity:</strong> Platform usage, login times, and feature interactions</li>
            </ul>
            <p className="text-xs italic text-neutral-500 dark:text-neutral-500 mt-6 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4">
              Note: Specific data collection practices and legal requirements will be finalized with legal review.
            </p>
          </section>

          {/* How We Use Data */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              How We Use Data
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We use the information we collect to deliver and improve our AI receptionist service for your plumbing or HVAC business:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li><strong>Service Operations:</strong> Answer calls, schedule appointments, and manage customer interactions on your behalf</li>
              <li><strong>Quality Assurance:</strong> Review call transcripts to ensure accurate scheduling and professional customer service</li>
              <li><strong>AI Training:</strong> Improve our AI models to better serve plumbing and HVAC industry needs</li>
              <li><strong>Account Management:</strong> Process billing, manage subscriptions, and provide customer support</li>
              <li><strong>Business Intelligence:</strong> Generate insights and reporting on call volume, appointment trends, and service performance</li>
              <li><strong>Security & Fraud Prevention:</strong> Detect and prevent unauthorized access or suspicious activity</li>
              <li><strong>Legal Obligations:</strong> Comply with applicable laws, regulations, and legal processes</li>
            </ul>
            <p className="text-xs italic text-neutral-500 dark:text-neutral-500 mt-6 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4">
              Note: Specific use cases and legal bases will be finalized with legal review.
            </p>
          </section>

          {/* Sharing & Disclosure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Sharing & Disclosure
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-semibold mb-4">
              We do not sell your data. Period.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We may share information only in the following limited circumstances:
            </p>
            
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              Trusted Service Partners
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We work with carefully vetted service providers to deliver our AI receptionist platform, including cloud infrastructure, payment processing, and analytics. These partners are bound by strict confidentiality agreements and may only process data as instructed by us.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              Legal & Regulatory Requirements
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We will disclose information when required by law, court order, subpoena, or to protect the rights, property, or safety of ACAI AI, our customers, or the public.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              Business Transitions
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              In the event of a merger, acquisition, or asset sale, your information may be transferred. We will provide notice and ensure continued protection of your data under this Privacy Policy.
            </p>
            <p className="text-xs italic text-neutral-500 dark:text-neutral-500 mt-6 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4">
              Note: Specific sharing practices and legal obligations will be finalized with legal review.
            </p>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Security
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Your business reputation depends on secure, reliable call handling. We take security seriously and implement enterprise-grade protections:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li><strong>End-to-End Encryption:</strong> All call data and transcripts are encrypted in transit and at rest</li>
              <li><strong>Secure Infrastructure:</strong> Hosted on industry-leading cloud platforms with SOC 2 compliance</li>
              <li><strong>Access Controls:</strong> Role-based permissions and multi-factor authentication</li>
              <li><strong>Regular Audits:</strong> Continuous monitoring and third-party security assessments</li>
              <li><strong>Data Backups:</strong> Automated, encrypted backups with disaster recovery protocols</li>
              <li><strong>Staff Training:</strong> All team members undergo security and privacy training</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              While we implement comprehensive security measures, no system is completely immune to threats. We continuously monitor and improve our security posture.
            </p>
            <p className="text-xs italic text-neutral-500 dark:text-neutral-500 mt-6 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4">
              Note: Specific security certifications and compliance details will be finalized with legal review.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Data Retention
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We retain data only as long as necessary to deliver our service and comply with legal obligations. When data is no longer needed, we securely delete or anonymize it.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              Typical retention periods:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li><strong>Account & Business Data:</strong> Duration of active service plus regulatory retention period</li>
              <li><strong>Call Recordings & Transcripts:</strong> As specified in your service agreement (typically 30-90 days for quality assurance)</li>
              <li><strong>Billing Records:</strong> Retained for accounting and tax compliance requirements</li>
              <li><strong>Marketing Data:</strong> Until you unsubscribe or withdraw consent</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              You may request deletion of your data at any time by contacting us. We will honor your request subject to legal and contractual obligations.
            </p>
            <p className="text-xs italic text-neutral-500 dark:text-neutral-500 mt-6 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4">
              Note: Specific retention periods will be finalized with legal review and may vary by jurisdiction.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Your Rights
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              You have control over your data. Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li><strong>Access Your Data:</strong> Request a copy of all personal information we hold about your business</li>
              <li><strong>Correct Inaccuracies:</strong> Update or correct any incorrect business or account information</li>
              <li><strong>Request Deletion:</strong> Ask us to delete your data (subject to legal retention requirements)</li>
              <li><strong>Data Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Restrict Processing:</strong> Limit how we use your data in certain situations</li>
              <li><strong>Opt-Out:</strong> Withdraw consent for marketing communications or optional data processing</li>
              <li><strong>Object to Processing:</strong> Challenge certain uses of your data</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              To exercise any of these rights, contact us using the information in the "Contact Us" section. We will respond within 30 days and verify your identity before processing requests.
            </p>
            <p className="text-xs italic text-neutral-500 dark:text-neutral-500 mt-6 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4">
              Note: Specific rights and procedures will be finalized with legal review and may vary by jurisdiction.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Cookies
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We use cookies and similar technologies to improve your experience on our platform. Cookies are small text files stored on your device that help us recognize you and remember your preferences.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              How we use cookies:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li><strong>Essential:</strong> Required for login, security, and core platform functionality</li>
              <li><strong>Analytics:</strong> Track usage patterns to improve our service (you can opt-out)</li>
              <li><strong>Preferences:</strong> Remember your dashboard settings and display preferences</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              You can control cookies through your browser settings. Note that disabling certain cookies may limit platform functionality.
            </p>
            <p className="text-xs italic text-neutral-500 dark:text-neutral-500 mt-6 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4">
              Note: Cookie policy details will be finalized with legal review.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Third-Party Links
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our service may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policy of every site you visit.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Children's Privacy
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Our service is not intended for use by children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will take steps to delete such information.
            </p>
          </section>

          {/* International Data Transfers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              International Data Transfers
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our service, you consent to the transfer of your information to the United States and other jurisdictions where we operate. We take appropriate safeguards to ensure your data is treated securely and in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Contact Us
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-4 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <strong>ACAI AI</strong><br />
                Email: <a href="mailto:privacy@tryacai.ai" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@tryacai.ai</a><br />
                Website: <a href="https://tryacai.ai" className="text-blue-600 dark:text-blue-400 hover:underline">https://tryacai.ai</a>
              </p>
            </div>
          </section>

          {/* California & Other State Privacy Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              California & Other State Privacy Rights
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              If you are a resident of California, Virginia, Colorado, or other states with specific privacy laws, you may have additional rights including:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li>Right to know what personal data we collect and how we use it</li>
              <li>Right to request deletion of your personal data</li>
              <li>Right to opt-out of data sales (Note: We do not sell personal data)</li>
              <li>Right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              To exercise your state privacy rights, contact us using the information in the "Contact Us" section below.
            </p>
            <p className="text-xs italic text-neutral-500 dark:text-neutral-500 mt-6 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4">
              Note: State-specific privacy rights and procedures will be finalized with legal review.
            </p>
          </section>

        </div>

        <HorizontalGradient className="top-20" />
        <HorizontalGradient className="bottom-20" />
      </div>
    </div>
  );
}
