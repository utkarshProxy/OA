import { createFileRoute } from "@tanstack/react-router";
import { MarketingHub } from "@/components/marketing";
export const Route = createFileRoute("/solutions/marketing/")({
  head: () => ({
    meta: [
      { title: "Marketing — Get found. Get chosen. Stay visible. | OBOU" },
      {
        name: "description",
        content:
          "AI Search Visibility, Conversion Optimisation, and Content Multiplier. Three practical marketing solutions built around your business.",
      },
    ],
  }),
  component: MarketingHub,
});
