import { Container } from "@/components/container";

export default function ScheduleDemoPage() {
  return (
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
        
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 border border-neutral-200 dark:border-neutral-800">
          <div className="aspect-video w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Calendar scheduling embed will be placed here.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Configure your Calendly, Zoom, or scheduling tool embed URL in your environment variables.
              </p>
            </div>
            {/* 
              To add your scheduling tool:
              1. Add NEXT_PUBLIC_SCHEDULING_URL to your .env file
              2. Replace the placeholder above with:
              
              <iframe
                src={process.env.NEXT_PUBLIC_SCHEDULING_URL}
                className="w-full h-full rounded-lg"
                frameBorder="0"
              />
            */}
          </div>
        </div>
      </div>
    </Container>
  );
}
