import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
import { Features } from "@/components/features";
import { Companies } from "@/components/companies";
import { GridFeatures } from "@/components/grid-features";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>

      <Container className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <Companies />
        <Features />
        <GridFeatures />
        <Testimonials />
      </Container>

      <div className="relative">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Background />
        </div>
        <CTA />
      </div>

      {/* Get Connected Section */}
      <section className="relative py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Get Connected
          </h2>

          <div className="mt-6 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
            <p>
              <span className="font-medium">Adam</span> — (732) 895-7895
            </p>
            <p>
              <span className="font-medium">Cristian</span> — (732) 890-3121
            </p>
            <p>
              <span className="font-medium">Chris</span> — (848) 253-9552
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
