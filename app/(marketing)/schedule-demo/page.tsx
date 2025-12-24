import { Container } from "@/components/container";

export default function ScheduleDemoPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Container className="py-20 lg:py-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
              Schedule a Demo
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-2">
              See how ACAI fits your business.
            </p>
            <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Book a live walkthrough with our team to explore how ACAI can help you capture more opportunities, streamline operations, and scale with confidence.
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <iframe
              src="https://calendly.com/team-tryacai/30min"
              className="w-full"
              style={{ minHeight: '700px' }}
              frameBorder="0"
              title="Schedule a Demo with ACAI"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
