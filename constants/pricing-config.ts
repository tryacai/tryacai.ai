export type TierKey = "basic" | "pro" | "enterprise";

export type TierConfig = {
  price: number;
  calls: number;
  minutesRange: string;
  overagePerMin: number;
  bullets: string[];
};

export type IndustryPricingConfig = {
  key: string;
  label: string;
  taglineNudges: Record<TierKey, string>;
  tiers: Record<TierKey, TierConfig>;
};

const defaultTaglineNudges: Record<TierKey, string> = {
  basic: "For solo operators tired of missing calls.",
  pro: "For growing teams ready to automate follow ups.",
  enterprise: "For owners scaling locations and revenue.",
};

export const tierMeta: Record<
  TierKey,
  { label: string; solutionHref: string; ladderAnchor: string; isPopular?: boolean }
> = {
  basic: {
    label: "Basic",
    solutionHref: "/solutions/ai-receptionist",
    ladderAnchor: "#receptionist",
  },
  pro: {
    label: "Pro",
    solutionHref: "/solutions/automation-system",
    ladderAnchor: "#automation",
    isPopular: true,
  },
  enterprise: {
    label: "Enterprise",
    solutionHref: "/solutions/full-infrastructure",
    ladderAnchor: "#infrastructure",
  },
};

export const tierOrder: TierKey[] = ["basic", "pro", "enterprise"];

export const pricingConfig: {
  defaultIndustryKey: string;
  industries: IndustryPricingConfig[];
} = {
  defaultIndustryKey: "barbers",
  industries: [
    {
      key: "barbers",
      label: "Barbers",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 75,
          calls: 25,
          minutesRange: "40 to 60 minutes",
          overagePerMin: 0.25,
          bullets: [
            "Never miss a booking while you’re mid-cut.",
            "Missed callers get a text back automatically.",
            "Clients get reminder texts so fewer no-shows.",
            "Keep your chair filled with less front-desk chaos.",
          ],
        },
        pro: {
          price: 249,
          calls: 120,
          minutesRange: "220 to 320 minutes",
          overagePerMin: 0.25,
          bullets: [
            "Never miss a booking while you’re mid-cut.",
            "Missed callers get a text back automatically.",
            "Clients get reminder texts so fewer no-shows.",
            "Keep your chair filled with less front-desk chaos.",
            "Win more rebooking without chasing clients.",
            "Wake up to fresh 5-star reviews automatically.",
          ],
        },
        enterprise: {
          price: 500,
          calls: 300,
          minutesRange: "600 to 900 minutes",
          overagePerMin: 0.25,
          bullets: [
            "Never miss a booking while you’re mid-cut.",
            "Missed callers get a text back automatically.",
            "Clients get reminder texts so fewer no-shows.",
            "Keep your chair filled with less front-desk chaos.",
            "Win more rebooking without chasing clients.",
            "Wake up to fresh 5-star reviews automatically.",
            "Route VIP callers to priority booking windows.",
            "Scale to multiple chairs with one consistent experience.",
          ],
        },
      },
    },
    {
      key: "plumbing-hvac",
      label: "Plumbing & HVAC",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 299,
          calls: 90,
          minutesRange: "240 to 360 minutes",
          overagePerMin: 0.35,
          bullets: [
            "Capture emergency calls before they go cold.",
            "Book jobs directly into your calendar.",
            "Recover missed calls with instant text-back.",
            "Route urgent jobs to the right tech faster.",
          ],
        },
        pro: {
          price: 599,
          calls: 220,
          minutesRange: "680 to 980 minutes",
          overagePerMin: 0.35,
          bullets: [
            "Capture emergency calls before they go cold.",
            "Book jobs directly into your calendar.",
            "Recover missed calls with instant text-back.",
            "Route urgent jobs to the right tech faster.",
            "Automate follow-ups until estimates convert.",
            "Collect more 5-star reviews after completed jobs.",
          ],
        },
        enterprise: {
          price: 1200,
          calls: 420,
          minutesRange: "1450 to 2000 minutes",
          overagePerMin: 0.35,
          bullets: [
            "Capture emergency calls before they go cold.",
            "Book jobs directly into your calendar.",
            "Recover missed calls with instant text-back.",
            "Route urgent jobs to the right tech faster.",
            "Automate follow-ups until estimates convert.",
            "Collect more 5-star reviews after completed jobs.",
            "Coordinate dispatch across multiple crews.",
            "Scale call handling during peak demand spikes.",
          ],
        },
      },
    },
    {
      key: "roofing",
      label: "Roofing",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 199,
          calls: 60,
          minutesRange: "200 to 320 minutes",
          overagePerMin: 0.35,
          bullets: [
            "Capture every estimate request, even after hours.",
            "Storm leads are answered fast before competitors.",
            "Book roof inspections on your calendar automatically.",
            "Missed callers get a fast text-back.",
          ],
        },
        pro: {
          price: 399,
          calls: 160,
          minutesRange: "600 to 900 minutes",
          overagePerMin: 0.35,
          bullets: [
            "Capture every estimate request, even after hours.",
            "Storm leads are answered fast before competitors.",
            "Book roof inspections on your calendar automatically.",
            "Missed callers get a fast text-back.",
            "Send follow-ups until estimate requests convert.",
            "Collect more 5-star reviews after completed jobs.",
          ],
        },
        enterprise: {
          price: 699,
          calls: 320,
          minutesRange: "1300 to 1800 minutes",
          overagePerMin: 0.35,
          bullets: [
            "Capture every estimate request, even after hours.",
            "Storm leads are answered fast before competitors.",
            "Book roof inspections on your calendar automatically.",
            "Missed callers get a fast text-back.",
            "Send follow-ups until estimate requests convert.",
            "Collect more 5-star reviews after completed jobs.",
            "Prioritize high-value jobs and urgent repairs instantly.",
            "Keep every crew calendar aligned across locations.",
          ],
        },
      },
    },
    {
      key: "mechanics",
      label: "Mechanics",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 199,
          calls: 80,
          minutesRange: "220 to 340 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book service appointments without interrupting repairs.",
            "Missed callers get an automatic text back.",
            "Capture vehicle and service details on first contact.",
            "Keep your front desk calmer during rush hours.",
          ],
        },
        pro: {
          price: 399,
          calls: 200,
          minutesRange: "650 to 900 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book service appointments without interrupting repairs.",
            "Missed callers get an automatic text back.",
            "Capture vehicle and service details on first contact.",
            "Keep your front desk calmer during rush hours.",
            "Send status update texts so customers call less.",
            "Ask happy customers for reviews automatically.",
          ],
        },
        enterprise: {
          price: 699,
          calls: 420,
          minutesRange: "1400 to 1900 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book service appointments without interrupting repairs.",
            "Missed callers get an automatic text back.",
            "Capture vehicle and service details on first contact.",
            "Keep your front desk calmer during rush hours.",
            "Send status update texts so customers call less.",
            "Ask happy customers for reviews automatically.",
            "Route urgent breakdown calls to the right bay fast.",
            "Keep multi-tech schedules full without overbooking.",
          ],
        },
      },
    },
    {
      key: "detailing",
      label: "Detailing",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 149,
          calls: 70,
          minutesRange: "180 to 260 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Capture every detailing booking request right away.",
            "Remind customers so appointments stay on track.",
            "Reduce missed calls during on-site jobs.",
            "Keep your calendar full with less admin.",
          ],
        },
        pro: {
          price: 299,
          calls: 180,
          minutesRange: "520 to 760 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Capture every detailing booking request right away.",
            "Remind customers so appointments stay on track.",
            "Reduce missed calls during on-site jobs.",
            "Keep your calendar full with less admin.",
            "Offer add-on packages during booking conversations.",
            "Collect more 5-star reviews after each detail.",
          ],
        },
        enterprise: {
          price: 499,
          calls: 380,
          minutesRange: "1150 to 1550 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Capture every detailing booking request right away.",
            "Remind customers so appointments stay on track.",
            "Reduce missed calls during on-site jobs.",
            "Keep your calendar full with less admin.",
            "Offer add-on packages during booking conversations.",
            "Collect more 5-star reviews after each detail.",
            "Prioritize high-ticket packages automatically.",
            "Coordinate teams and vehicles across busy days.",
          ],
        },
      },
    },
    {
      key: "cleaning",
      label: "Cleaning",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 149,
          calls: 70,
          minutesRange: "180 to 260 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Capture new quote requests day and night.",
            "Schedule recurring cleanings without back-and-forth.",
            "Recover missed callers with instant text-back.",
            "Keep cleaner calendars filled automatically.",
          ],
        },
        pro: {
          price: 299,
          calls: 180,
          minutesRange: "520 to 760 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Capture new quote requests day and night.",
            "Schedule recurring cleanings without back-and-forth.",
            "Recover missed callers with instant text-back.",
            "Keep cleaner calendars filled automatically.",
            "Follow up with undecided leads until they book.",
            "Trigger review requests after completed cleanings.",
          ],
        },
        enterprise: {
          price: 499,
          calls: 380,
          minutesRange: "1150 to 1550 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Capture new quote requests day and night.",
            "Schedule recurring cleanings without back-and-forth.",
            "Recover missed callers with instant text-back.",
            "Keep cleaner calendars filled automatically.",
            "Follow up with undecided leads until they book.",
            "Trigger review requests after completed cleanings.",
            "Balance recurring and one-time jobs across crews.",
            "Scale to multi-team operations with consistent intake.",
          ],
        },
      },
    },
    {
      key: "electricians",
      label: "Electricians",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 249,
          calls: 90,
          minutesRange: "220 to 340 minutes",
          overagePerMin: 0.35,
          bullets: [
            "Route emergency calls immediately so no hot leads are lost.",
            "Capture job type and urgency on the first call.",
            "Send dispatch-ready details to your team instantly.",
            "Never miss inbound calls while on-site.",
          ],
        },
        pro: {
          price: 499,
          calls: 220,
          minutesRange: "650 to 900 minutes",
          overagePerMin: 0.35,
          bullets: [
            "Route emergency calls immediately so no hot leads are lost.",
            "Capture job type and urgency on the first call.",
            "Send dispatch-ready details to your team instantly.",
            "Never miss inbound calls while on-site.",
            "Follow up automatically until pending quotes close.",
            "Keep technicians focused with cleaner job handoffs.",
          ],
        },
        enterprise: {
          price: 749,
          calls: 450,
          minutesRange: "1400 to 1900 minutes",
          overagePerMin: 0.35,
          bullets: [
            "Route emergency calls immediately so no hot leads are lost.",
            "Capture job type and urgency on the first call.",
            "Send dispatch-ready details to your team instantly.",
            "Never miss inbound calls while on-site.",
            "Follow up automatically until pending quotes close.",
            "Keep technicians focused with cleaner job handoffs.",
            "Prioritize high-value and emergency jobs across teams.",
            "Coordinate multi-crew scheduling without manual triage.",
          ],
        },
      },
    },
    {
      key: "landscaping",
      label: "Landscaping",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 149,
          calls: 70,
          minutesRange: "180 to 260 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Capture quote requests while crews are in the field.",
            "Schedule recurring maintenance without manual callbacks.",
            "Recover missed leads with instant text-back.",
            "Keep routes booked with less office work.",
          ],
        },
        pro: {
          price: 299,
          calls: 180,
          minutesRange: "520 to 760 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Capture quote requests while crews are in the field.",
            "Schedule recurring maintenance without manual callbacks.",
            "Recover missed leads with instant text-back.",
            "Keep routes booked with less office work.",
            "Run seasonal follow-ups before demand spikes.",
            "Turn one-time jobs into recurring contracts.",
          ],
        },
        enterprise: {
          price: 499,
          calls: 380,
          minutesRange: "1150 to 1550 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Capture quote requests while crews are in the field.",
            "Schedule recurring maintenance without manual callbacks.",
            "Recover missed leads with instant text-back.",
            "Keep routes booked with less office work.",
            "Run seasonal follow-ups before demand spikes.",
            "Turn one-time jobs into recurring contracts.",
            "Coordinate multiple crews and neighborhoods efficiently.",
            "Scale yearly retention with automated reactivation flows.",
          ],
        },
      },
    },
    {
      key: "pest-control",
      label: "Pest Control",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 149,
          calls: 70,
          minutesRange: "180 to 260 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book recurring treatments on the first call.",
            "Send reminders so service visits stay on schedule.",
            "Recover missed callers with automatic text-back.",
            "Keep technicians fully booked each week.",
          ],
        },
        pro: {
          price: 299,
          calls: 180,
          minutesRange: "520 to 760 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book recurring treatments on the first call.",
            "Send reminders so service visits stay on schedule.",
            "Recover missed callers with automatic text-back.",
            "Keep technicians fully booked each week.",
            "Follow up after service to lock in next visits.",
            "Turn happy customers into 5-star reviews automatically.",
          ],
        },
        enterprise: {
          price: 499,
          calls: 380,
          minutesRange: "1150 to 1550 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book recurring treatments on the first call.",
            "Send reminders so service visits stay on schedule.",
            "Recover missed callers with automatic text-back.",
            "Keep technicians fully booked each week.",
            "Follow up after service to lock in next visits.",
            "Turn happy customers into 5-star reviews automatically.",
            "Route urgent infestations to the next available technician.",
            "Manage recurring plans across larger service areas.",
          ],
        },
      },
    },
    {
      key: "med-spa",
      label: "Med Spa",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 199,
          calls: 70,
          minutesRange: "180 to 260 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book consultations even when your team is with clients.",
            "Send reminder texts to reduce no-shows.",
            "Recover missed callers with instant text-back.",
            "Keep providers’ calendars filled with qualified consults.",
          ],
        },
        pro: {
          price: 399,
          calls: 170,
          minutesRange: "520 to 760 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book consultations even when your team is with clients.",
            "Send reminder texts to reduce no-shows.",
            "Recover missed callers with instant text-back.",
            "Keep providers’ calendars filled with qualified consults.",
            "Rebook clients automatically after each visit.",
            "Collect more 5-star reviews without manual follow-up.",
          ],
        },
        enterprise: {
          price: 699,
          calls: 330,
          minutesRange: "1050 to 1450 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book consultations even when your team is with clients.",
            "Send reminder texts to reduce no-shows.",
            "Recover missed callers with instant text-back.",
            "Keep providers’ calendars filled with qualified consults.",
            "Rebook clients automatically after each visit.",
            "Collect more 5-star reviews without manual follow-up.",
            "Prioritize high-value treatments and package consultations.",
            "Scale consistent booking across multiple providers.",
          ],
        },
      },
    },
    {
      key: "chiropractor",
      label: "Chiropractor",
      taglineNudges: defaultTaglineNudges,
      tiers: {
        basic: {
          price: 199,
          calls: 70,
          minutesRange: "180 to 260 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book appointments while you stay focused on patient care.",
            "Send reminders that reduce no-shows.",
            "Recover missed callers with automatic text-back.",
            "Keep the schedule full without front-desk overload.",
          ],
        },
        pro: {
          price: 399,
          calls: 170,
          minutesRange: "520 to 760 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book appointments while you stay focused on patient care.",
            "Send reminders that reduce no-shows.",
            "Recover missed callers with automatic text-back.",
            "Keep the schedule full without front-desk overload.",
            "Send reactivation texts to bring back past patients.",
            "Generate more 5-star reviews after visits.",
          ],
        },
        enterprise: {
          price: 699,
          calls: 330,
          minutesRange: "1050 to 1450 minutes",
          overagePerMin: 0.3,
          bullets: [
            "Book appointments while you stay focused on patient care.",
            "Send reminders that reduce no-shows.",
            "Recover missed callers with automatic text-back.",
            "Keep the schedule full without front-desk overload.",
            "Send reactivation texts to bring back past patients.",
            "Generate more 5-star reviews after visits.",
            "Prioritize urgent and high-value appointments automatically.",
            "Coordinate schedules across multiple practitioners.",
          ],
        },
      },
    },
  ],
};

export const getIndustryPricing = (industryKey: string) => {
  const selected = pricingConfig.industries.find((industry) => industry.key === industryKey);
  if (selected) return selected;

  return (
    pricingConfig.industries.find(
      (industry) => industry.key === pricingConfig.defaultIndustryKey
    ) ?? pricingConfig.industries[0]
  );
};
