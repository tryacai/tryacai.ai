import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { getIndustryPricing, tierOrder } from "@/constants/pricing-config";
import { Link } from "next-view-transitions";
import { CalendarCheck2, MessageSquareReply, PhoneCall, Star } from "lucide-react";

type IndustryPlaceholderPageProps = {
  industryName: string;
};

type IndustryContent = {
  hero: string;
  valueProp: string;
  problems: string[];
  setup: string[];
};

const industryContentMap: Record<string, IndustryContent> = {
  Plumbing: {
    hero: "AI Receptionist Built for Plumbing Companies",
    valueProp:
      "Capture emergency calls 24/7, qualify urgency in seconds, and dispatch faster without overloading your office staff. Mica Growth handles repetitive call volume and follow-ups so your techs stay on jobs, not phones.",
    problems: [
      "Emergency calls going unanswered after hours and on weekends.",
      "Technicians interrupted by inbound calls during active jobs.",
      "High-value estimates lost due to delayed follow-up.",
    ],
    setup: [
      "Map your emergency vs. standard call routing.",
      "Connect booking calendar and dispatch preferences.",
      "Train Mica Growth on service types and call qualification.",
      "Launch missed-call recovery and estimate follow-up flows.",
      "Go live with KPI tracking for calls, bookings, and response speed.",
    ],
  },
  HVAC: {
    hero: "AI Receptionist Built for HVAC Teams",
    valueProp:
      "Mica Growth handles seasonal call spikes, captures after-hours breakdown requests, and keeps your schedule full without adding front desk overhead. Your team gets qualified jobs and faster response cycles.",
    problems: [
      "Peak season call surges overwhelming your office line.",
      "Urgent no-heat/no-cool jobs missed overnight.",
      "Unconverted estimates with no consistent follow-up process.",
    ],
    setup: [
      "Define emergency triage for heating/cooling breakdowns.",
      "Connect your service calendar and territory routing.",
      "Configure scripts for repair, maintenance, and install calls.",
      "Enable estimate reminder and reactivation automations.",
      "Track live outcomes by booked service type.",
    ],
  },
  "Sewer & Drain": {
    hero: "AI Receptionist Built for Sewer & Drain Contractors",
    valueProp:
      "Mica Growth handles urgent backup calls fast, qualifies job urgency, and routes dispatch-ready details so your team can respond without delays.",
    problems: [
      "Emergency backup calls missed after hours.",
      "Slow intake causing delayed dispatch.",
      "Call notes not reaching the right crew fast enough.",
    ],
    setup: [
      "Map emergency backup escalation rules.",
      "Connect dispatch-ready handoff fields.",
      "Train intake prompts for sewer and drain scenarios.",
      "Enable missed-call recovery for urgent callers.",
      "Track booked jobs and response time improvements.",
    ],
  },
  Septic: {
    hero: "AI Receptionist Built for Septic Service Teams",
    valueProp:
      "Capture every septic service request, separate emergencies from routine jobs, and keep office and field teams aligned with cleaner intake.",
    problems: [
      "Urgent septic calls lost outside office hours.",
      "Manual triage slowing same-day scheduling.",
      "Inconsistent follow-up on open service requests.",
    ],
    setup: [
      "Define emergency and routine septic call paths.",
      "Connect booking windows to your service calendar.",
      "Train Mica Growth on septic service types and FAQs.",
      "Activate missed-call recovery and reminders.",
      "Track conversion lift from faster response.",
    ],
  },
  "Water Heater Services": {
    hero: "AI Receptionist Built for Water Heater Services",
    valueProp:
      "Handle no-hot-water emergencies instantly, qualify repair vs. replacement opportunities, and route details for faster booking.",
    problems: [
      "Emergency no-hot-water calls missed during high volume.",
      "Weak intake on repair vs. replacement jobs.",
      "Leads dropping when callbacks are delayed.",
    ],
    setup: [
      "Set triage logic for outage urgency.",
      "Connect dispatch and estimate handoff notes.",
      "Train qualification prompts for common issues.",
      "Enable follow-up automation for open estimates.",
      "Monitor booked jobs and close rates.",
    ],
  },
  "Residential Plumbing": {
    hero: "AI Receptionist Built for Residential Plumbing",
    valueProp:
      "Book more homeowner calls, recover missed leads quickly, and reduce front desk bottlenecks with 24/7 intake support.",
    problems: [
      "Missed homeowner calls during busy service windows.",
      "Office staff overloaded with repetitive intake.",
      "No consistent recovery for missed callers.",
    ],
    setup: [
      "Map household service categories and urgency.",
      "Connect schedule preferences and coverage zones.",
      "Train scripts for common residential requests.",
      "Turn on missed-call recovery automations.",
      "Track booked calls and response speed.",
    ],
  },
  "Commercial Plumbing": {
    hero: "AI Receptionist Built for Commercial Plumbing",
    valueProp:
      "Manage higher-volume facility calls with smarter routing, dispatch-ready intake, and consistent CRM logging across teams.",
    problems: [
      "High call volume creating intake bottlenecks.",
      "Emergency facility issues not escalated quickly.",
      "Service details lost between office and field teams.",
    ],
    setup: [
      "Map escalation rules for commercial emergencies.",
      "Connect dispatch and account-specific notes.",
      "Train qualification for common facility requests.",
      "Enable missed-call recovery at scale.",
      "Track response, bookings, and account retention.",
    ],
  },
  Barbers: {
    hero: "AI Receptionist Built for Barbershops",
    valueProp:
      "Never miss haircut bookings while your team is with clients. Mica Growth answers instantly, books appointments, and follows up with no-show prevention messaging automatically.",
    problems: [
      "Phone calls ringing while barbers are actively cutting.",
      "New clients dropping off when calls go unanswered.",
      "No-show and repeat-visit follow-up handled inconsistently.",
    ],
    setup: [
      "Connect your booking calendar and service menu.",
      "Set appointment rules for walk-ins vs. scheduled slots.",
      "Train Mica Growth on pricing, durations, and stylist availability.",
      "Enable reminders and missed-call text-back automation.",
      "Launch with reporting on filled chair time.",
    ],
  },
  Roofing: {
    hero: "AI Receptionist Built for Roofing Companies",
    valueProp:
      "Mica Growth captures storm-driven inbound demand instantly and qualifies leads before competitors respond. Keep your pipeline organized and your crews focused on inspections and installs.",
    problems: [
      "Lead surges during storms causing missed opportunities.",
      "Slow callback times reducing win rates on urgent jobs.",
      "Follow-up gaps after inspections and estimate delivery.",
    ],
    setup: [
      "Set storm and non-storm routing logic.",
      "Connect inspection scheduling workflows.",
      "Train qualification rules for residential vs. commercial leads.",
      "Automate estimate follow-up and review requests.",
      "Monitor close-rate impact from first response speed.",
    ],
  },
  Mechanics: {
    hero: "AI Receptionist Built for Auto Repair Shops",
    valueProp:
      "Mica Growth books diagnostics and service appointments while your advisors stay focused at the counter. Recover missed calls and keep bays full with better scheduling consistency.",
    problems: [
      "Dropped inbound calls during busy intake periods.",
      "Service advisors pulled away from in-shop customers.",
      "Declined work and open estimates lacking follow-up.",
    ],
    setup: [
      "Map service categories and appointment windows.",
      "Connect scheduling and intake preferences.",
      "Train Mica Growth on repair timelines and customer FAQs.",
      "Activate estimate/churn-prevention follow-up sequences.",
      "Track booked jobs and recovered missed calls.",
    ],
  },
  Detailing: {
    hero: "AI Receptionist Built for Auto Detailing Teams",
    valueProp:
      "Mica Growth handles inbound calls, books detail packages, and follows up on pending quotes automatically. Spend less time answering phones and more time delivering premium service.",
    problems: [
      "Prospects lost when calls come in during active jobs.",
      "Inconsistent quote follow-up on premium packages.",
      "Manual reminders causing no-shows and idle slots.",
    ],
    setup: [
      "Set package-specific booking paths.",
      "Connect availability and turnaround buffers.",
      "Train Mica Growth on add-ons and pricing questions.",
      "Launch reminder + missed-call recovery flows.",
      "Measure booking rates and repeat-customer growth.",
    ],
  },
  Electricians: {
    hero: "AI Receptionist Built for Electrical Contractors",
    valueProp:
      "Capture urgent electrical service calls any time, route by priority, and keep your office from becoming a bottleneck. Mica Growth helps convert inbound demand into scheduled jobs faster.",
    problems: [
      "Urgent outage/safety calls missed after hours.",
      "Dispatch delays from manual phone triage.",
      "High-intent leads cooling off before callback.",
    ],
    setup: [
      "Map emergency categories and escalation rules.",
      "Connect calendar and team territory routing.",
      "Train qualification scripts for common service types.",
      "Automate estimate and post-job follow-ups.",
      "Track response-time and booking improvements.",
    ],
  },
  Landscaping: {
    hero: "AI Receptionist Built for Landscaping Companies",
    valueProp:
      "Mica Growth answers every inquiry, pre-qualifies project scope, and keeps seasonal demand organized. Your team gets cleaner pipelines and fewer missed opportunities.",
    problems: [
      "Seasonal inbound volume creating callback bottlenecks.",
      "Quote requests slipping through without response.",
      "Maintenance renewals and reactivations managed inconsistently.",
    ],
    setup: [
      "Define project vs. recurring service call paths.",
      "Connect quoting and booking workflows.",
      "Train Mica Growth on service areas and package tiers.",
      "Enable estimate reminders and review automations.",
      "Launch KPI dashboard for booked work volume.",
    ],
  },
  "Pest Control": {
    hero: "AI Receptionist Built for Pest Control Teams",
    valueProp:
      "Respond instantly to urgent infestations and routine service calls with Mica Growth. Recover missed calls and automate customer follow-up to keep routes full.",
    problems: [
      "Urgent infestation calls lost after hours.",
      "Manual intake slowing same-day scheduling.",
      "Recurring service retention handled inconsistently.",
    ],
    setup: [
      "Map urgent vs. routine service triage.",
      "Connect route-friendly scheduling preferences.",
      "Train Mica Growth on common pest scenarios.",
      "Activate follow-up and recurrence reminders.",
      "Track booked treatments and retention lift.",
    ],
  },
  "Med Spa": {
    hero: "AI Receptionist Built for Med Spa Teams",
    valueProp:
      "Mica Growth books consultations around the clock, qualifies treatment inquiries, and automates follow-up so your staff can focus on client experience and outcomes.",
    problems: [
      "Consultation calls missed during peak in-clinic hours.",
      "High-value treatment leads not nurtured consistently.",
      "Rebooking and retention outreach handled manually.",
    ],
    setup: [
      "Connect consultation calendar and intake requirements.",
      "Configure treatment inquiry qualification workflows.",
      "Train Mica Growth on services, prep, and pricing ranges.",
      "Enable no-show prevention and rebooking automations.",
      "Launch with conversion and retention tracking.",
    ],
  },
  Chiropractor: {
    hero: "AI Receptionist Built for Chiropractic Clinics",
    valueProp:
      "Mica Growth answers new patient calls instantly, schedules appointments, and automates follow-up to reduce front-desk load. Keep your clinic focused on care while intake runs smoothly.",
    problems: [
      "New patient calls missed while staff handles in-office flow.",
      "Appointment follow-up and rescheduling done manually.",
      "Inactive patients not consistently re-engaged.",
    ],
    setup: [
      "Connect appointment scheduling and intake preferences.",
      "Define scripts for new patient vs. returning calls.",
      "Train Mica Growth on visit types and FAQs.",
      "Enable reminders, missed-call text-back, and retention messaging.",
      "Track booked appointments and reactivation outcomes.",
    ],
  },
};

const fallbackPricingTiers = [
  {
    name: "Basic",
    price: "$299",
    bestFor: "Best for smaller teams",
    features: ["24/7 call answering", "Missed-call text back", "Calendar booking"],
  },
  {
    name: "Growth",
    price: "$599",
    bestFor: "Best for growing operations",
    features: ["Everything in Basic", "Estimate follow-up automation", "Review request automation"],
  },
  {
    name: "Enterprise",
    price: "$1199",
    bestFor: "Best for high-volume teams",
    features: ["Everything in Pro", "Advanced routing logic", "Priority support + scaling"],
  },
];

function getIndustryKeyFromName(industryName: string): string | null {
  const normalized = industryName.toLowerCase();

  if (normalized === "plumbing") return "plumbing";
  if (normalized === "hvac") return "hvac";
  if (normalized === "sewer & drain") return "sewer-drain";
  if (normalized === "septic") return "septic";
  if (normalized === "water heater services") return "water-heater";
  if (normalized === "residential plumbing") return "residential-plumbing";
  if (normalized === "commercial plumbing") return "commercial-plumbing";

  return null;
}

const solutionCards = [
  {
    title: "24/7 Emergency Call Capture",
    description:
      "Answer every urgent inbound call instantly and route high-priority requests without waiting for office hours.",
    icon: PhoneCall,
  },
  {
    title: "Missed Call Recovery",
    description:
      "Automatically text and reconnect callers so no high-intent lead disappears after one missed ring.",
    icon: MessageSquareReply,
  },
  {
    title: "Estimate Follow-Up Automation",
    description:
      "Keep estimates moving with timed reminders and personalized follow-ups until the job gets booked.",
    icon: CalendarCheck2,
  },
  {
    title: "Review & Retention Automation",
    description:
      "Trigger post-service reviews and reactivation outreach to increase repeat business and referrals.",
    icon: Star,
  },
];

export function IndustryPlaceholderPage({ industryName }: IndustryPlaceholderPageProps) {
  const industryKey = getIndustryKeyFromName(industryName);
  const mappedPricing = industryKey ? getIndustryPricing(industryKey) : null;
  const pricingTiers = mappedPricing
    ? tierOrder.map((tierKey) => mappedPricing.tiers[tierKey])
    : fallbackPricingTiers;

  const content = industryContentMap[industryName] ?? {
    hero: `AI Receptionist Built for ${industryName} Teams`,
    valueProp:
      "Mica Growth answers every call, books more jobs, and automates follow-up so your team can focus on delivery instead of phone interruptions.",
    problems: [
      "Missed calls leading to lost revenue.",
      "Slow response times frustrating inbound leads.",
      "Inconsistent follow-up reducing conversions.",
    ],
    setup: [
      "Connect your calendar.",
      "Map your intake flow.",
      "Configure call logic.",
      "Enable automations.",
      "Launch with KPI tracking.",
    ],
  };

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center pb-20">
        <div className="relative z-20 mx-auto w-full max-w-4xl py-10 text-center md:pt-40">
          <Heading as="h1" className="text-center">
            {content.hero}
          </Heading>
          <Subheading className="mx-auto mt-4 max-w-2xl text-center">
            {content.valueProp}
          </Subheading>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as={Link} href="/contact" className="rounded-full">
              Get Started
            </Button>
            <Button as={Link} href="/pricing" variant="simple" className="rounded-full">
              See Pricing
            </Button>
          </div>
        </div>

        <section className="relative z-20 mx-auto mt-8 w-full max-w-4xl text-center">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
            The Real Problems {industryName} Face
          </h2>
          <ul className="mx-auto mt-6 max-w-3xl space-y-3 text-left text-sm text-neutral-300 md:text-base">
            {content.problems.map((problem) => (
              <li key={problem} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                • {problem}
              </li>
            ))}
          </ul>
        </section>

        <section className="relative z-20 mx-auto mt-14 w-full max-w-4xl text-center">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
            How Mica Growth Solves It
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {solutionCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-black/40 p-5 text-left">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-purple-300" />
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-neutral-300">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative z-20 mx-auto mt-14 w-full max-w-5xl text-center">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
            Tier Breakdown for {industryName} Teams
          </h2>
          {mappedPricing?.positioningText && (
            <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-300">
              {mappedPricing.positioningText}
            </p>
          )}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div key={tier.name} className="rounded-2xl border border-white/10 bg-black/40 p-5 text-left">
                <h3 className="text-lg font-semibold text-white">
                  {tier.name} <span className="text-neutral-300">({tier.price})</span>
                </h3>
                {"bestFor" in tier && tier.bestFor ? (
                  <p className="mt-2 text-sm font-medium text-neutral-300">{tier.bestFor}</p>
                ) : null}
                <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                  {tier.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
                <Button as={Link} href="/contact" className="mt-5 rounded-full text-xs">
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-20 mx-auto mt-14 w-full max-w-4xl text-center">
          <h2 className="bg-gradient-to-r from-[#ff003c] via-[#7b00ff] to-[#0066ff] bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
            Our Setup Process
          </h2>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
            <ol className="space-y-3 text-sm text-neutral-300 md:text-base">
              {content.setup.slice(0, 5).map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="relative z-20 mx-auto mt-16 w-full max-w-4xl text-center">
          <h2 className="text-2xl font-semibold text-white md:text-4xl">
            Stop Losing {industryName} Jobs to Missed Calls
          </h2>
          <div className="mt-6">
            <Button as={Link} href="/contact" className="rounded-full">
              Get Started
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
