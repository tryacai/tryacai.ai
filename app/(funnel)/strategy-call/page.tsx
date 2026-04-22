import { Suspense } from "react";

import StrategyCallClient from "./strategy-call-client";

export default function StrategyCallPage() {
  return (
    <Suspense fallback={<StrategyCallClientFallback />}>
      <StrategyCallClient />
    </Suspense>
  );
}

function StrategyCallClientFallback() {
  return <div className="min-h-[720px]" aria-hidden="true" />;
}
