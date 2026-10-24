import { createFileRoute } from "@tanstack/react-router";
import { SolutionSystemPage } from "@/components/solution-system-page";
import { contentMultiplier } from "@/lib/site-content";
export const Route = createFileRoute("/solutions/marketing/content")({
  head: () => ({
    meta: [
      { title: "Content Multiplier — One Conversation, Every Channel | OBOU" },
      { name: "description", content: contentMultiplier.page.hero.lede },
    ],
  }),
  component: () => <SolutionSystemPage solution={contentMultiplier} marketing />,
});
