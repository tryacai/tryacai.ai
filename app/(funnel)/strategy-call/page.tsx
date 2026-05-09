import { Suspense } from "react";
import { redirect } from "next/navigation";

import StrategyCallClient from "./strategy-call-client";

type StrategyCallPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readQueryValue(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function StrategyCallPage({
  searchParams,
}: StrategyCallPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const leadSignals = [
    readQueryValue(resolvedSearchParams.fbclid),
    readQueryValue(resolvedSearchParams.full_name),
    readQueryValue(resolvedSearchParams.name),
    readQueryValue(resolvedSearchParams.business_email),
    readQueryValue(resolvedSearchParams.email),
    readQueryValue(resolvedSearchParams.phone_number),
    readQueryValue(resolvedSearchParams.phone),
    readQueryValue(resolvedSearchParams.company_name),
    readQueryValue(resolvedSearchParams.company),
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
