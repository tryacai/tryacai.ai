import { Background } from "@/components/background";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Terms of Service | ACAI Marketing",
  description:
    "ACAI Marketing's Terms of Service for lead conversion and automation products, including service terms, payment policies, and user obligations.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    images: ["https://micagrowth.co/nevermissaleadpreviewimage.png"],
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
            Effective Date: April 23, 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          
          {/* Introduction */}
          <section>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Welcome to ACAI Marketing, a service operated by ACAI Enterprises LLC ("ACAI," "we," or "us"). These Terms of Service ("Terms") govern your use of our software-as-a-service platform and related services ("Services").
            </p>
          </section>

          {/* Agreement to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              By accessing or using ACAI, you agree to be bound by these Terms. If you do not agree, you may not use the Services.
            </p>
          </section>

          {/* Use of Services */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Use of Services
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              ACAI provides AI-powered receptionist and messaging automation tools designed for plumbing and HVAC service businesses.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 ml-2">
              <li>Use the Services only for lawful business purposes</li>
              <li>Obtain proper customer consent before initiating communications</li>
              <li>Comply with all applicable local, state, federal, and carrier regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              ACAI Enterprises LLC SMS Notifications Program
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              <strong>Program Name:</strong> ACAI Enterprises LLC SMS Notifications
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              <strong>Program Description:</strong> Service-related SMS messages including demo confirmations, scheduling updates, onboarding notifications, appointment reminders, missed-call follow-ups, and account support communications.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              <strong>How to Opt In:</strong> Consent is obtained through an optional SMS consent checkbox on our contact form at https://micagrowth.co/contact. Checking this box is completely optional and is not a condition of submitting the form or receiving any service.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              <strong>Message Frequency:</strong> Message frequency varies based on your interactions with us.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              <strong>Cost:</strong> Message and data rates may apply. Contact your wireless carrier for details.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              <strong>How to Opt Out:</strong> Reply <strong>STOP</strong> to any SMS message from us at any time to unsubscribe. You will receive a final confirmation message and no further messages will be sent.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              <strong>How to Get Help:</strong> Reply <strong>HELP</strong> to any SMS message for assistance, or contact us at privacy@micagrowth.co.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              <strong>Supported Carriers:</strong> AT&T, T-Mobile, Verizon Wireless, Sprint, Boost Mobile, U.S. Cellular, Metro PCS, Cricket, and most other U.S. carriers. Carriers are not liable for delayed or undelivered messages.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              <strong>Privacy:</strong> No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. See our Privacy Policy for full details.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              If promotional or marketing-related messaging is offered in the future, separate and explicit consent will be required prior to sending such messages.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mt-4">
              You agree to use ACAI only for lawful, consent-based communications and to comply with all applicable messaging regulations and carrier requirements.
            </p>
          </section>

          {/* SMS Messaging Terms */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              SMS Messaging Terms
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              The Services may include service-related SMS communications such as appointment confirmations, scheduling updates, reminders, and two-way customer messaging.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              Customers must provide explicit consent before receiving recurring SMS messages.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              Message frequency may vary. Message and data rates may apply.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              Customers may opt out at any time by replying <strong>STOP</strong>. Customers may reply <strong>HELP</strong> for assistance.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              You agree to use ACAI only for lawful, consent-based communications and to comply with all applicable messaging regulations and carrier requirements.
            </p>
          </section>

          {/* Account Responsibility */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Account Responsibility
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all activity conducted through your account.
            </p>
          </section>

          {/* Payment and Billing */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Payment and Billing
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              Subscription fees are billed according to your selected plan. Fees are non-refundable unless otherwise stated. Failed payments may result in service suspension.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Intellectual Property
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              All software, technology, and intellectual property associated with ACAI are owned by ACAI Enterprises LLC or its licensors. Unauthorized use is prohibited.
            </p>
          </section>

          {/* AI-Generated Content */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              AI-Generated Content
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              AI-generated responses are provided as operational assistance. You are responsible for reviewing and ensuring that outputs align with your business practices and legal obligations.
            </p>
          </section>

          {/* Prohibited Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Prohibited Conduct
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
              You may not:
            </p>
            <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 ml-2">
              <li>Engage in unlawful or abusive behavior</li>
              <li>Send spam or unauthorized messages</li>
              <li>Attempt unauthorized access to systems or data</li>
              <li>Reverse engineer or exploit the platform</li>
              <li>Sell or misuse customer data</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Termination
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We may suspend or terminate access to the Services for violations of these Terms, non-payment, or misuse of the platform.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Disclaimers
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              The Services are provided "as is" without warranties of any kind. We do not guarantee uninterrupted service or error-free operation.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              To the maximum extent permitted by law, ACAI Enterprises LLC shall not be liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid in the previous 12 months.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Governing Law
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              These Terms are governed by the laws of the State of Florida.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Changes to Terms
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              We may update these Terms periodically. Continued use of the Services constitutes acceptance of any updates.
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
                <p className="text-lg text-neutral-900 dark:text-neutral-100">ACAI Enterprises LLC</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">Email</p>
                <a href="mailto:privacy@micagrowth.co" className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
                  privacy@micagrowth.co
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">Phone</p>
                <a href="tel:8135354103" className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
                  (813) 535-4103
                </a>
              </div>
            </div>
          </section>

        </div>

        {/* Privacy Policy Button - Bottom */}
        <div className="flex justify-center mt-16">
          <Link href="/privacy-policy">
            <Button variant="outline">
              View Privacy Policy
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
