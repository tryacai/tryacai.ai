import { Suspense } from "react";
import { redirect } from "next/navigation";

import StrategyCallClient from "./strategy-call-client";

type StrategyCallPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function readQueryValue(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default function StrategyCallPage({ searchParams }: StrategyCallPageProps) {
  const leadSignals = [
    readQueryValue(searchParams?.fbclid),
    readQueryValue(searchParams?.full_name),
    readQueryValue(searchParams?.name),
    readQueryValue(searchParams?.business_email),
    readQueryValue(searchParams?.email),
    readQueryValue(searchParams?.phone_number),
    readQueryValue(searchParams?.phone),
    readQueryValue(searchParams?.company_name),
    readQueryValue(searchParams?.company),
  ];

  const hasLeadContext = leadSignals.some((value) => value.trim().length > 0);
  if (!hasLeadContext) {
    redirect("/?qualify=true");
  }

  return (
    <Suspense fallback={<StrategyCallClientFallback />}>
      <StrategyCallClient />
    </Suspense>
  );
}

function StrategyCallClientFallback() {
  return <div className="min-h-[720px]" aria-hidden="true" />;
}
