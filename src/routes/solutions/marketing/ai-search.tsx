import { createFileRoute } from "@tanstack/react-router";
import { MarketingDetail } from "@/components/marketing";
export const Route = createFileRoute("/solutions/marketing/ai-search")({
  head: () => ({
    meta: [
      { title: "AI Search Visibility — AEO & GEO | OBOU" },
      {
        name: "description",
        content:
          "Improve how your business is discovered, understood, and referenced in AI search. Practical audits, content improvements, and visibility monitoring.",
      },
    ],
  }),
  component: () => <MarketingDetail kind="ai-search" />,
});
