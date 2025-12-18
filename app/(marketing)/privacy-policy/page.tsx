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
              Introduction
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Welcome to ACAI AI. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how ACAI AI ("we," "our," or "us") collects, uses, discloses, and safeguards your information when you use our AI receptionist service designed for plumbing and HVAC businesses.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              By using our service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              Information You Provide to Us
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li>Register for an account or schedule a demo</li>
              <li>Subscribe to our service</li>
              <li>Contact us for support or inquiries</li>
              <li>Participate in surveys or provide feedback</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              This information may include your name, email address, phone number, business name, business address, payment information, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              Information Collected Automatically
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              When you access our service, we may automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li>Call data and recordings (with consent) for quality assurance and service improvement</li>
              <li>Usage data, including how you interact with our service</li>
              <li>Device information, such as IP address, browser type, and operating system</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              Customer Data
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              As part of our AI receptionist service, we process call data and customer information on behalf of your business. This may include caller names, phone numbers, appointment details, and conversation transcripts. We process this data solely to provide our service to you and do not use it for any other purpose without your explicit consent.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li><strong>Service Delivery:</strong> To provide, operate, and maintain our AI receptionist service</li>
              <li><strong>Customer Support:</strong> To respond to your inquiries and provide technical support</li>
              <li><strong>Service Improvement:</strong> To understand usage patterns and improve our service features</li>
              <li><strong>Communication:</strong> To send you updates, newsletters, and marketing communications (with your consent)</li>
              <li><strong>Billing and Payments:</strong> To process transactions and manage your subscription</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
              <li><strong>Security:</strong> To detect, prevent, and address technical issues and security threats</li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Data Sharing and Disclosure
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We do not sell your personal information to third parties. We may share your information in the following circumstances:
            </p>
            
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              Service Providers
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data storage, hosting, and analytics. These providers are contractually obligated to protect your information and use it only for the purposes we specify.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              Business Transfers
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change and the choices you may have regarding your information.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6">
              Legal Requirements
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We may disclose your information if required to do so by law or in response to valid requests by public authorities, such as a court order or subpoena.
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Data Security
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection and privacy</li>
              <li>Secure data centers with physical and logical access controls</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Data Retention
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. When your information is no longer needed, we will securely delete or anonymize it. Specific retention periods include:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li>Account information: Retained for the duration of your active subscription plus 12 months</li>
              <li>Call recordings and transcripts: Retained as specified in your service agreement or as required by law</li>
              <li>Payment information: Retained as required for accounting and tax purposes</li>
              <li>Marketing communications: Retained until you unsubscribe</li>
            </ul>
          </section>

          {/* Your Rights and Choices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
              <li><strong>Objection:</strong> Object to processing of your information for certain purposes</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong>Withdrawal of Consent:</strong> Withdraw consent for data processing where we rely on consent</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              To exercise these rights, please contact us at the information provided in the "Contact Us" section below. We will respond to your request within a reasonable timeframe and in accordance with applicable law.
            </p>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We use cookies and similar tracking technologies to collect and track information about your use of our service. Cookies are small data files stored on your device. You can configure your browser to refuse cookies or alert you when cookies are being sent. However, some features of our service may not function properly without cookies.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              Types of cookies we use:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mt-3">
              <li><strong>Essential Cookies:</strong> Necessary for the operation of our service</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our service</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
            </ul>
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

          {/* California Privacy Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              California Privacy Rights
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA). This includes the right to know what personal information we collect, the right to request deletion of your information, and the right to opt-out of the sale of your personal information. We do not sell your personal information.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              To exercise your California privacy rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </section>

        </div>

        <HorizontalGradient className="top-20" />
        <HorizontalGradient className="bottom-20" />
      </div>
    </div>
  );
}
