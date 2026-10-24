import { createFileRoute } from "@tanstack/react-router";
import { MarketingDetail } from "@/components/marketing";
export const Route = createFileRoute("/solutions/marketing/conversion")({
  head: () => ({
    meta: [
      { title: "Conversion Optimisation — Turn Visits into Enquiries | OBOU" },
      {
        name: "description",
        content:
          "Improve website messaging, landing pages, forms, and booking journeys. Conversion rate optimisation focused on qualified enquiries.",
      },
    ],
  }),
  component: () => <MarketingDetail kind="conversion" />,
});
