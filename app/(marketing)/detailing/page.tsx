import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";

export default function DetailingPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40 max-w-4xl mx-auto text-center">
          <Heading as="h1">Detailing</Heading>
          <Subheading className="text-center">
            Placeholder overview for auto detailing workflows.
          </Subheading>
        </div>
      </Container>
    </div>
  );
}
